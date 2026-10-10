// Fase 3: puente entre el panel admin y el worker BullMQ (worker/).
// No envía emails directamente — reenvía al worker con el secreto compartido,
// que nunca debe vivir en el cliente.
//
// Deploy: supabase functions deploy notificar-reserva
// Requiere los secrets:
//   supabase secrets set WORKER_URL=https://tu-worker.up.railway.app
//   supabase secrets set WORKER_API_SECRET=mismo_valor_que_WORKER_API_SECRET_en_railway

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
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
    const res = await fetch(`${workerUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-worker-secret': workerSecret },
      body: accion === 'cancelar' ? undefined : JSON.stringify(reserva),
    })

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
