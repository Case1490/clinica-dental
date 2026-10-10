import { Queue } from 'bullmq'
import IORedis from 'ioredis'

const redisUrl = process.env.REDIS_URL
// Upstash siempre requiere TLS: si la URL quedó como "redis://" en vez de
// "rediss://" (typo común al copiar desde el dashboard), la conexión se queda
// colgada reintentando para siempre (maxRetriesPerRequest: null, requerido por
// BullMQ) en vez de fallar rápido. Se fuerza TLS igual cuando el host es Upstash.
const needsTls = redisUrl?.startsWith('rediss://') || redisUrl?.includes('upstash.io')

const connection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
  tls: needsTls ? {} : undefined,
})

export const notificationsQueue = new Queue('notifications', {
  connection,
  defaultJobOptions: {
    attempts: 5,
    backoff: { type: 'exponential', delay: 5000 },
    removeOnComplete: true,
    removeOnFail: false,
  },
})

export { connection }
