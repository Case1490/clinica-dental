import express from 'express'
import { notificationsQueue } from './queue.js'
import './worker.js'

const app = express()
app.use(express.json())

function checkSecret(req, res, next) {
  const secret = req.header('x-worker-secret')
  if (!secret || secret !== process.env.WORKER_API_SECRET) {
    return res.status(401).json({ error: 'unauthorized' })
  }
  next()
}

app.get('/health', (req, res) => res.json({ ok: true }))

// Encola confirmación inmediata + 2 recordatorios (24h y 2h antes de fechaInicio).
// Si un recordatorio ya pasó (reserva confirmada tarde), se omite directamente.
app.post('/enqueue', checkSecret, async (req, res) => {
  const { reservaId, nombre, email, servicio, doctorNombre, fecha, hora, fechaInicio } = req.body

  if (!reservaId || !email || !fechaInicio) {
    return res.status(400).json({ error: 'faltan campos requeridos (reservaId, email, fechaInicio)' })
  }

  const inicioMs = new Date(fechaInicio).getTime()
  const payload = { nombre, email, servicio, doctorNombre, fecha, hora }

  await notificationsQueue.add('confirmacion', { type: 'confirmacion', data: payload }, {
    jobId: `conf-${reservaId}`,
  })

  const ms24h = inicioMs - 24 * 60 * 60 * 1000 - Date.now()
  const ms2h = inicioMs - 2 * 60 * 60 * 1000 - Date.now()

  if (ms24h > 0) {
    await notificationsQueue.add('recordatorio', { type: 'recordatorio', data: { ...payload, horasAntes: 24 } }, {
      jobId: `rec24-${reservaId}`,
      delay: ms24h,
    })
  }
  if (ms2h > 0) {
    await notificationsQueue.add('recordatorio', { type: 'recordatorio', data: { ...payload, horasAntes: 2 } }, {
      jobId: `rec2-${reservaId}`,
      delay: ms2h,
    })
  }

  res.json({ ok: true })
})

// Cancela los recordatorios pendientes de una reserva (no afecta la confirmación ya enviada).
app.post('/cancel/:reservaId', checkSecret, async (req, res) => {
  const { reservaId } = req.params

  for (const jobId of [`rec24-${reservaId}`, `rec2-${reservaId}`]) {
    const job = await notificationsQueue.getJob(jobId)
    if (job) await job.remove()
  }

  res.json({ ok: true })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Worker de notificaciones escuchando en puerto ${port}`))
