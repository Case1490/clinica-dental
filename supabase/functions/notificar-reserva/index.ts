// Fase 3: puente entre el panel admin y el worker BullMQ (worker/).
// No envía emails directamente — reenvía al worker con el secreto compartido,
// que nunca debe vivir en el cliente.
// Solo admins pueden invocar esto: sin este chequeo, cualquiera con la anon key
// (pública en el bundle) podría usar la función como relay de emails arbitrarios
// o cancelar recordatorios de reservas ajenas (IDOR).
//
// Deploy: supabase functions deploy notificar-reserva
// Requiere los secrets:
//   supabase secrets set WORKER_URL=https://tu-worker.up.railway.app
//   supabase secrets set WORKER_API_SECRET=mismo_valor_que_WORKER_API_SECRET_en_railway

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No autorizado.' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseUser = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    )

    const { data: isAdmin, error: adminError } = await supabaseUser.rpc('is_admin')
    if (adminError || !isAdmin) {
      return new Response(JSON.stringify({ error: 'No autorizado.' }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const payload = await req.json()
    const { accion, ...reserva } = payload // accion: 'confirmar' | 'cancelar'

    const workerUrl = Deno.env.get('WORKER_URL')
    const workerSecret = Deno.env.get('WORKER_API_SECRET')
    if (!workerUrl || !workerSecret) {
      console.error('WORKER_URL o WORKER_API_SECRET no configurados')
      return new Response(JSON.stringify({ error: 'Notificaciones no configuradas.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const path = accion === 'cancelar' ? `/cancel/${reserva.reservaId}` : '/enqueue'

    // El worker (Render free tier) puede tardar en despertar de cold-start; se limita
    // la espera a 20s en vez de dejar que la función cuelgue hasta el idle timeout (150s).
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 20000)

    let res: Response
    try {
      res = await fetch(`${workerUrl}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-worker-secret': workerSecret },
        body: accion === 'cancelar' ? undefined : JSON.stringify(reserva),
        signal: controller.signal,
      })
    } catch (fetchErr) {
      console.error('Error contactando al worker:', fetchErr)
      return new Response(JSON.stringify({ error: 'El servicio de notificaciones no respondió a tiempo.' }), {
        status: 504,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    } finally {
      clearTimeout(timeoutId)
    }

    const data = await res.json().catch(() => ({}))
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Solicitud inválida.' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
