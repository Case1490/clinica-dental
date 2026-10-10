const ESCAPE_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const esc = (value = '') => String(value).replace(/[&<>"']/g, (c) => ESCAPE_MAP[c])

function layout(title, bodyHtml) {
  return `<!doctype html>
<html>
  <body style="font-family: Arial, sans-serif; color: #1f2937; max-width: 480px; margin: 0 auto; padding: 24px;">
    <h2 style="color: #0f766e;">${esc(title)}</h2>
    ${bodyHtml}
    <p style="margin-top: 32px; font-size: 12px; color: #6b7280;">DentalPrime - Este es un mensaje automático, por favor no respondas a este correo.</p>
  </body>
</html>`
}

export function confirmationTemplate({ nombre, servicio, doctorNombre, fecha, hora }) {
  return layout('Tu turno fue confirmado', `
    <p>Hola ${esc(nombre)},</p>
    <p>Tu turno quedó <strong>confirmado</strong> con los siguientes datos:</p>
    <ul>
      <li><strong>Servicio:</strong> ${esc(servicio)}</li>
      <li><strong>Profesional:</strong> ${esc(doctorNombre || 'A confirmar')}</li>
      <li><strong>Fecha:</strong> ${esc(fecha)}</li>
      <li><strong>Hora:</strong> ${esc(hora)}</li>
    </ul>
    <p>Te esperamos. Si necesitas reprogramar, contactanos respondiendo a este mismo medio.</p>
  `)
}

export function reminderTemplate({ nombre, servicio, doctorNombre, fecha, hora, horasAntes }) {
  const cuando = horasAntes === 24 ? 'mañana' : 'en 2 horas'
  return layout(`Recordatorio: tu turno es ${cuando}`, `
    <p>Hola ${esc(nombre)},</p>
    <p>Te recordamos tu turno:</p>
    <ul>
      <li><strong>Servicio:</strong> ${esc(servicio)}</li>
      <li><strong>Profesional:</strong> ${esc(doctorNombre || 'A confirmar')}</li>
      <li><strong>Fecha:</strong> ${esc(fecha)}</li>
      <li><strong>Hora:</strong> ${esc(hora)}</li>
    </ul>
  `)
}
