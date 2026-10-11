import { Resend } from 'resend'
import { confirmationTemplate, reminderTemplate } from './templates.js'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.EMAIL_FROM || 'DentalPrime <onboarding@resend.dev>'

// El SDK de Resend no lanza excepción en errores de la API (dominio sin
// verificar, destinatario no permitido en modo test, etc.) — devuelve
// { data: null, error }. Sin este chequeo, BullMQ marca el job como
// "completado" aunque el email nunca se haya enviado.
function assertSent({ data, error }) {
  if (error) {
    throw new Error(`Resend rechazó el envío: ${error.message || JSON.stringify(error)}`)
  }
  return data
}

export async function sendConfirmationEmail(data) {
  const result = await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: 'Tu turno fue confirmado - DentalPrime',
    html: confirmationTemplate(data),
  })
  assertSent(result)
}

export async function sendReminderEmail(data) {
  const subject = data.horasAntes === 24
    ? 'Recordatorio: tu turno es mañana - DentalPrime'
    : 'Recordatorio: tu turno es en 2 horas - DentalPrime'

  const result = await resend.emails.send({
    from: FROM,
    to: data.email,
    subject,
    html: reminderTemplate(data),
  })
  assertSent(result)
}
