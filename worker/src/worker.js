import { Worker } from 'bullmq'
import { connection } from './queue.js'
import { sendConfirmationEmail, sendReminderEmail } from './email.js'

export const notificationsWorker = new Worker('notifications', async (job) => {
  const { type, data } = job.data
  if (type === 'confirmacion') return sendConfirmationEmail(data)
  if (type === 'recordatorio') return sendReminderEmail(data)
  throw new Error(`Tipo de job desconocido: ${type}`)
}, { connection, concurrency: 5 })

notificationsWorker.on('completed', (job) => {
  console.log(`Job ${job.id} (${job.data.type}) completado`)
})

notificationsWorker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} falló:`, err.message)
})
