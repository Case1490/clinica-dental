import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import TurnstileWidget from './TurnstileWidget'

const servicios = [
  'Limpieza Dental',
  'Blanqueamiento',
  'Ortodoncia',
  'Endodoncia',
  'Carillas',
  'Implantes',
]

const horas = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '15:00', '15:30', '16:00', '16:30', '17:00',
]

const initialForm = {
  doctor_id: '',
  nombre: '',
  email: '',
  telefono: '',
  servicio: '',
  fecha: '',
  hora: '',
  mensaje: '',
}

const initialErrors = {
  doctor_id: '',
  nombre: '',
  email: '',
  telefono: '',
  servicio: '',
  fecha: '',
  hora: '',
}

export default function Booking() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [errors, setErrors] = useState(initialErrors)
  const [doctores, setDoctores] = useState([])
  const [horasOcupadas, setHorasOcupadas] = useState([])
  const [turnstileToken, setTurnstileToken] = useState(null)
  const [captchaKey, setCaptchaKey] = useState(0)

  const handleCaptchaVerify = useCallback((token) => setTurnstileToken(token), [])
  const handleCaptchaExpire = useCallback(() => setTurnstileToken(null), [])
  const resetCaptcha = () => {
    setTurnstileToken(null)
    setCaptchaKey((k) => k + 1)
  }

  useEffect(() => {
    supabase
      .from('doctores')
      .select('id, nombre, especialidad')
      .eq('activo', true)
      .order('nombre')
      .then(({ data }) => setDoctores(data || []))
  }, [])

  const fetchHorasOcupadas = async (doctorId, fecha) => {
    if (!doctorId || !fecha) {
      setHorasOcupadas([])
      return
    }
    const { data } = await supabase
      .from('reservas')
      .select('hora')
      .eq('doctor_id', doctorId)
      .eq('fecha', fecha)
      .in('estado', ['Pendiente', 'Confirmada'])

    setHorasOcupadas(data?.map(r => r.hora) || [])
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const nextForm = { ...form, [name]: value, ...(name === 'fecha' || name === 'doctor_id' ? { hora: '' } : {}) }
    setForm(nextForm)

    if (name === 'fecha' || name === 'doctor_id') {
      fetchHorasOcupadas(nextForm.doctor_id, nextForm.fecha)
    }
  }

  const validate = () => {
    const newErrors = { ...initialErrors }
    let valid = true

    if (!form.doctor_id) {
      newErrors.doctor_id = 'Selecciona un especialista'
      valid = false
    }

    if (form.nombre.trim().length < 3) {
      newErrors.nombre = 'Ingresa tu nombre completo'
      valid = false
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Ingresa un correo válido'
      valid = false
    }

    if (!/^\+?\d{7,15}$/.test(form.telefono.replace(/\s/g, ''))) {
      newErrors.telefono = 'Ingresa un teléfono válido'
      valid = false
    }

    if (!form.servicio) {
      newErrors.servicio = 'Selecciona un servicio'
      valid = false
    }

    if (!form.fecha) {
      newErrors.fecha = 'Selecciona una fecha'
      valid = false
    }

    if (!form.hora) {
      newErrors.hora = 'Selecciona una hora'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    if (!turnstileToken) {
      setError('Completa la verificación anti-spam antes de continuar.')
      return
    }

    setLoading(true)
    setError(null)

    const { data, error } = await supabase.functions.invoke('crear-reserva', {
      body: {
        doctor_id: form.doctor_id,
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono,
        servicio: form.servicio,
        fecha: form.fecha,
        hora: form.hora,
        mensaje: form.mensaje || null,
        turnstileToken,
      },
    })

    resetCaptcha()

    if (error || data?.error) {
      const isConflict = error?.context?.status === 409
      setError(data?.error || 'Hubo un problema al enviar tu reserva. Intenta de nuevo.')
      if (isConflict) fetchHorasOcupadas(form.doctor_id, form.fecha)
      setLoading(false)
      return
    }

    setSuccess(true)
    setForm(initialForm)
    setErrors(initialErrors)
    setLoading(false)
  }

  const inputClass = (hasError) => `h-12 px-3.5 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline-variant font-body-md text-body-md focus:outline-none focus:ring-2 transition-all w-full ${hasError ? 'ring-2 ring-error' : 'focus:ring-primary-container'
    }`

  return (
    <>
      {/* Éxito */}
      {success && (
        <div className="bg-tertiary-fixed text-on-tertiary-fixed rounded-2xl p-6 text-center mb-6 space-y-2">
          <p className="text-2xl">🎉</p>
          <p className="font-semibold">¡Reserva enviada con éxito!</p>
          <p className="font-body-sm text-body-sm">Te contactaremos pronto para confirmar tu cita.</p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-2 font-label-md text-label-md underline"
          >
            Hacer otra reserva
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-error-container text-on-error-container rounded-2xl p-4 text-center mb-6 font-body-sm text-body-sm">
          {error}
        </div>
      )}

      {/* Formulario */}
      {!success && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">

          <div className="flex flex-col gap-1.5">
            <label className="font-label-lg text-label-lg text-on-surface">Especialista</label>
            <select
              name="doctor_id"
              value={form.doctor_id}
              onChange={handleChange}
              className={inputClass(errors.doctor_id)}
            >
              <option value="">Selecciona un especialista</option>
              {doctores.map((d) => (
                <option key={d.id} value={d.id}>{d.nombre}{d.especialidad ? ` — ${d.especialidad}` : ''}</option>
              ))}
            </select>
            {errors.doctor_id && <p className="font-body-sm text-body-sm text-error">{errors.doctor_id}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-lg text-label-lg text-on-surface">Nombre completo</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Juan Pérez"
                className={inputClass(errors.nombre)}
              />
              {errors.nombre && <p className="font-body-sm text-body-sm text-error">{errors.nombre}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-lg text-label-lg text-on-surface">Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="juan@email.com"
                className={inputClass(errors.email)}
              />
              {errors.email && <p className="font-body-sm text-body-sm text-error">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-lg text-label-lg text-on-surface">Teléfono / WhatsApp</label>
              <input
                type="tel"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="+51 999 999 999"
                className={inputClass(errors.telefono)}
              />
              {errors.telefono && <p className="font-body-sm text-body-sm text-error">{errors.telefono}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-lg text-label-lg text-on-surface">Servicio</label>
              <select
                name="servicio"
                value={form.servicio}
                onChange={handleChange}
                className={inputClass(errors.servicio)}
              >
                <option value="">Selecciona un servicio</option>
                {servicios.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.servicio && <p className="font-body-sm text-body-sm text-error">{errors.servicio}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-lg text-label-lg text-on-surface">Fecha</label>
              <input
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className={inputClass(errors.fecha)}
              />
              {errors.fecha && <p className="font-body-sm text-body-sm text-error">{errors.fecha}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-lg text-label-lg text-on-surface">Hora</label>
              <select
                name="hora"
                value={form.hora}
                onChange={handleChange}
                disabled={!form.doctor_id || !form.fecha}
                className={`${inputClass(errors.hora)} disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                <option value="">Selecciona una hora</option>
                {horas.map((h) => {
                  const ocupada = horasOcupadas.includes(h)
                  return (
                    <option key={h} value={h} disabled={ocupada}>
                      {h} {ocupada ? '— No disponible' : ''}
                    </option>
                  )
                })}
              </select>
              {errors.hora && <p className="font-body-sm text-body-sm text-error">{errors.hora}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-lg text-label-lg text-on-surface">Mensaje adicional <span className="text-on-surface-variant">(opcional)</span></label>
            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              rows={3}
              placeholder="Cuéntanos algo más sobre tu consulta..."
              className="px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline-variant font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary-container transition-all resize-none w-full"
            />
          </div>

          <TurnstileWidget key={captchaKey} onVerify={handleCaptchaVerify} onExpire={handleCaptchaExpire} />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-full bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-[0_6px_20px_rgba(13,82,232,0.35)] flex items-center justify-center gap-space-xs transition-all duration-300 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            {loading ? 'Enviando reserva...' : 'Confirmar pre-reserva'}
          </button>

        </form>
      )}
    </>
  )
}