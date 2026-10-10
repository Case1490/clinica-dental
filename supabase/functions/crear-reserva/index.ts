// Fase 2.3: valida el token de Cloudflare Turnstile server-side (el secret key
// nunca debe vivir en el cliente) y, si es válido, invoca el RPC crear_reserva_segura.
//
// Deploy: supabase functions deploy crear-reserva
// Requiere el secret TURNSTILE_SECRET_KEY:
//   supabase secrets set TURNSTILE_SECRET_KEY=tu_secret_key_de_cloudflare
// SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY ya están disponibles automáticamente
// en el entorno de toda Edge Function de Supabase.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function verifyTurnstile(token: string, remoteIp: string | null) {
  const secret = Deno.env.get('TURNSTILE_SECRET_KEY')
  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY no configurado')
    return false
  }

  const body = new URLSearchParams({ secret, response: token })
  if (remoteIp) body.set('remoteip', remoteIp)

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  })
  const result = await res.json()
  return result.success === true
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const payload = await req.json()
    const { turnstileToken, ...reserva } = payload

    if (!turnstileToken) {
      return new Response(JSON.stringify({ error: 'Falta el token de verificación anti-spam.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const remoteIp = req.headers.get('x-forwarded-for')
    const captchaOk = await verifyTurnstile(turnstileToken, remoteIp)
    if (!captchaOk) {
      return new Response(JSON.stringify({ error: 'Verificación anti-spam fallida. Intenta de nuevo.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const { data, error } = await supabase.rpc('crear_reserva_segura', {
      p_doctor_id: reserva.doctor_id,
      p_nombre: reserva.nombre,
      p_email: reserva.email,
      p_telefono: reserva.telefono,
      p_servicio: reserva.servicio,
      p_fecha: reserva.fecha,
      p_hora: reserva.hora,
      p_mensaje: reserva.mensaje ?? null,
    })

    if (error) {
      const isConflict = error.code === '23P01'
      return new Response(JSON.stringify({ error: isConflict ? 'Ese horario ya fue reservado con este especialista.' : error.message }), {
        status: isConflict ? 409 : 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ reserva: data }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Solicitud inválida.' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
