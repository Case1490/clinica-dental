import { useState } from 'react'
import { supabase } from '../lib/supabase'
import FadeIn from './FadeIn'

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
  nombre: '',
  email: '',
  telefono: '',
  servicio: '',
  fecha: '',
  hora: '',
  mensaje: '',
}

const initialErrors = {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors = { ...initialErrors }
    let valid = true

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
    setLoading(true)
    setError(null)

    const { error } = await supabase.from('reservas').insert([form])

    if (error) {
      setError('Hubo un problema al enviar tu reserva. Intenta de nuevo.')
    } else {
      setSuccess(true)
      setForm(initialForm)
    }

    setLoading(false)
  }

  return (
    <section id="reservas" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">

        {/* Header */}
        <FadeIn>
          <div className="text-center space-y-4 mb-12">
            <span className="text-blue-600 text-sm font-medium tracking-widest uppercase">
              Agenda tu cita
            </span>
            <h2 className="text-4xl font-bold text-slate-800">
              Reserva en minutos
            </h2>
            <p className="text-slate-400">
              Completa el formulario y nos pondremos en contacto para confirmar tu cita.
            </p>
          </div>
        </FadeIn>


        {/* Éxito */}
        {success && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 rounded-2xl p-6 text-center mb-8 space-y-2">
            <p className="text-2xl">🎉</p>
            <p className="font-semibold">¡Reserva enviada con éxito!</p>
            <p className="text-sm text-blue-500">Te contactaremos pronto para confirmar tu cita.</p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-2 text-sm underline text-blue-600 hover:text-blue-800"
            >
              Hacer otra reserva
            </button>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-4 text-center mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Formulario */}
        {!success && (
          <FadeIn delay={0.15}>
<form onSubmit={handleSubmit} className="space-y-5">

            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm text-slate-600 font-medium">Nombre completo</label>
                <input
                  type="text"
                  name="nombre"

                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Juan Pérez"
                  className={`w-full px-4 py-3 rounded-xl border text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 transition
      ${errors.nombre
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                      : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
                    }`}
                />
                {errors.nombre && (
                  <p className="text-red-400 text-xs">{errors.nombre}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-slate-600 font-medium">Correo electrónico</label>
                <input
                  type="email"
                  name="email"

                  value={form.email}
                  onChange={handleChange}
                  placeholder="juan@email.com"
                  className={`w-full px-4 py-3 rounded-xl border text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 transition
      ${errors.email
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                      : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
                    }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm text-slate-600 font-medium">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"

                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="+51 999 999 999"
                  className={`w-full px-4 py-3 rounded-xl border text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 transition
      ${errors.telefono
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                      : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
                    }`}
                />
                {errors.telefono && (
                  <p className="text-red-400 text-xs">{errors.telefono}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-slate-600 font-medium">Servicio</label>
                <select
                  name="servicio"

                  value={form.servicio}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 transition
      ${errors.servicio
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                      : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
                    }`}
                >
                  <option value="">Selecciona un servicio</option>
                  {servicios.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.servicio && (
                  <p className="text-red-400 text-xs">{errors.servicio}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm text-slate-600 font-medium">Fecha</label>
                <input
                  type="date"
                  name="fecha"

                  value={form.fecha}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 rounded-xl border text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 transition
      ${errors.fecha
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                      : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
                    }`}
                />
                {errors.fecha && (
                  <p className="text-red-400 text-xs">{errors.fecha}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm text-slate-600 font-medium">Hora</label>
                <select
                  name="hora"

                  value={form.hora}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 transition
      ${errors.hora
                      ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                      : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
                    }`}
                >
                  <option value="">Selecciona una hora</option>
                  {horas.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                {errors.hora && (
                  <p className="text-red-400 text-xs">{errors.hora}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm text-slate-600 font-medium">Mensaje adicional <span className="text-slate-300">(opcional)</span></label>
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                rows={3}
                placeholder="Cuéntanos algo más sobre tu consulta..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando reserva...' : 'Confirmar reserva'}
            </button>

          </form>
          </FadeIn>
          
        )}

      </div>
    </section>
  )
}