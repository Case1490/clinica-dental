import { Resend } from 'resend'
import { confirmationTemplate, reminderTemplate } from './templates.js'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.EMAIL_FROM || 'DentalPrime <onboarding@resend.dev>'

export async function sendConfirmationEmail(data) {
  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: 'Tu turno fue confirmado - DentalPrime',
    html: confirmationTemplate(data),
  })
}

export async function sendReminderEmail(data) {
  const subject = data.horasAntes === 24
    ? 'Recordatorio: tu turno es mañana - DentalPrime'
    : 'Recordatorio: tu turno es en 2 horas - DentalPrime'

  await resend.emails.send({
    from: FROM,
    to: data.email,
    subject,
    html: reminderTemplate(data),
  })
}
