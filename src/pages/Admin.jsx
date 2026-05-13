import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import CalendarView from '../components/CalendarView'

const PASSWORD = import.meta.env.VITE_ADMIN_PASS
const ESTADOS = ['Pendiente', 'Confirmada', 'Cancelada']

const estadoStyles = {
  Pendiente: 'bg-yellow-100 text-yellow-700',
  Confirmada: 'bg-green-100 text-green-700',
  Cancelada: 'bg-red-100 text-red-600',
}

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(false)
  const [filtro, setFiltro] = useState('Todos')
  const [filtroFecha, setFiltroFecha] = useState('Todas')
  const [showCalendar, setShowCalendar] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === PASSWORD) {
      setAuthed(true)
    } else {
      setError('Contraseña incorrecta')
    }
  }

  const fetchReservas = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('reservas')
      .select('*')
      .order('fecha', { ascending: true })
      .order('hora', { ascending: true })
    setReservas(data || [])
    setLoading(false)
  }

  const updateEstado = async (id, estado) => {
    await supabase.from('reservas').update({ estado }).eq('id', id)
    setReservas(reservas.map(r => r.id === id ? { ...r, estado } : r))

    // Enviar email solo cuando se confirma
    if (estado === 'Confirmada') {
      const reserva = reservas.find(r => r.id === id)
      await supabase.functions.invoke('send-confirmation', {
        body: {
          nombre: reserva.nombre,
          email: reserva.email,
          servicio: reserva.servicio,
          fecha: reserva.fecha,
          hora: reserva.hora,
        },
      })
    }
  }

  const deleteReserva = async (id) => {
    if (!confirm('¿Eliminar esta reserva?')) return
    await supabase.from('reservas').delete().eq('id', id)
    setReservas(reservas.filter(r => r.id !== id))
  }

  useEffect(() => {
    if (authed) fetchReservas()
  }, [authed])

  const hoy = new Date().toLocaleDateString('en-CA')
  const manana = new Date(Date.now() + 86400000).toLocaleDateString('en-CA')
  const pasado = new Date(Date.now() + 172800000).toLocaleDateString('en-CA')

  const filtradas = reservas
    .filter(r => filtro === 'Todos' ? true : (r.estado || 'Pendiente') === filtro)
    .filter(r => {
      if (filtroFecha === 'Todas') return true
      if (filtroFecha === 'Hoy') return r.fecha === hoy
      if (filtroFecha === 'Mañana') return r.fecha === manana
      if (filtroFecha === 'Pasado') return r.fecha === pasado
      return r.fecha === filtroFecha // fecha específica del input
    })

  const stats = [
    {
      label: 'Total reservas',
      value: reservas.length,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      icon: '📋',
    },
    {
      label: 'Pendientes',
      value: reservas.filter(r => (r.estado || 'Pendiente') === 'Pendiente').length,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      icon: '⏳',
    },
    {
      label: 'Confirmadas',
      value: reservas.filter(r => r.estado === 'Confirmada').length,
      color: 'text-green-600',
      bg: 'bg-green-50',
      icon: '✅',
    },
    {
      label: 'Canceladas',
      value: reservas.filter(r => r.estado === 'Cancelada').length,
      color: 'text-red-500',
      bg: 'bg-red-50',
      icon: '❌',
    },
  ]

  const servicioTop = reservas.length > 0
    ? Object.entries(
      reservas.reduce((acc, r) => {
        acc[r.servicio] = (acc[r.servicio] || 0) + 1
        return acc
      }, {})
    ).sort((a, b) => b[1] - a[1])[0][0]
    : '—'

  const reservasHoy = reservas.filter(r => r.fecha === hoy).length

  // — Login —
  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-blue-200 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 w-full max-w-sm space-y-6">
          <div className="text-center space-y-1">
            <p className="text-2xl font-bold text-slate-800">
              <span className="text-blue-600">Dental</span>Prime
            </p>
            <p className="text-slate-400 text-sm">Panel de administración</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm text-slate-600 font-medium">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
              />
              {error && <p className="text-red-400 text-xs">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    )
  }

  // — Panel —
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-400 to-blue-200">

      {/* Header */}
      <header className="bg-slate-900 border-slate-800 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3 justify-between">
          <p className="text-lg font-bold text-white">
            <span className="text-blue-400">Dental</span>Prime
            <span className="hidden sm:inline text-slate-600 font-light mx-3">|</span>
            <span className="hidden sm:inline text-slate-400 font-normal text-base">Panel de reservas</span>
          </p>

          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <button
              onClick={() => setShowCalendar(true)}
              className="text-sm bg-white/10 text-white hover:bg-white/20 transition-colors px-3 sm:px-4 py-1.5 rounded-full flex items-center gap-2"
            >
              📅 <span className="hidden sm:inline">Calendario</span>
            </button>
            <span className="text-sm bg-white/10 text-white px-3 sm:px-4 py-1.5 rounded-full hover:bg-white/20 hidden sm:inline">{reservas.length} reservas totales</span>
            <button
              onClick={() => setAuthed(false)}
              className="text-sm bg-slate-800 text-red-400 hover:bg-slate-700 transition-colors px-3 sm:px-4 py-1.5 rounded-full"
            >
              <span className="hidden sm:inline">Cerrar sesión</span>
              <span className="sm:hidden">✕</span>
            </button>
          </div>
        </div>
      </header>


      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => (
            <div
              key={s.label}
              className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 p-6 flex items-center gap-4 shadow-sm"
            >
              <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center text-2xl shrink-0`}>
                {s.icon}
              </div>
              <div>
                <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-slate-400 text-xs mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Info extra */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl shrink-0">
              📅
            </div>
            <div>
              <p className="text-blue-100 text-sm">Reservas hoy</p>
              <p className="text-4xl font-bold text-white">{reservasHoy}</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl shrink-0">
              🏆
            </div>
            <div>
              <p className="text-slate-400 text-sm">Servicio más solicitado</p>
              <p className="text-xl font-bold text-white">{servicioTop}</p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="space-y-3">

          {/* Filtro por estado */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-white/70 mr-1">Estado:</span>
            {['Todos', ...ESTADOS].map(f => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filtro === f
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white/80 text-slate-500 border border-white/50 hover:bg-white'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Filtro por fecha */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-white/70 mr-1">Fecha:</span>
            {['Todas', 'Hoy', 'Mañana', 'Pasado'].map(f => (
              <button
                key={f}
                onClick={() => setFiltroFecha(f === filtroFecha ? 'Todas' : f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filtroFecha === f
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'bg-white/80 text-slate-500 border border-white/50 hover:bg-white'
                  }`}
              >
                {f}
              </button>
            ))}
            <input
              type="date"
              value={filtroFecha.includes('-') ? filtroFecha : ''}
              onChange={e => setFiltroFecha(e.target.value || 'Todas')}
              className="px-4 py-1.5 rounded-full text-sm text-slate-500 bg-white/80 border border-white/50 focus:outline-none focus:bg-white cursor-pointer"
            />
          </div>

        </div>

        {/* Tabla */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-400">
            Cargando reservas...
          </div>
        ) : filtradas.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center space-y-2">
            <p className="text-4xl">📭</p>
            <p className="text-slate-400">No hay reservas en esta categoría.</p>
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-left">
                  <th className="px-6 py-4 font-medium">Paciente</th>
                  <th className="px-6 py-4 font-medium">Servicio</th>
                  <th className="px-6 py-4 font-medium">Fecha</th>
                  <th className="px-6 py-4 font-medium">Hora</th>
                  <th className="px-6 py-4 font-medium">Estado</th>
                  <th className="px-6 py-4 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtradas.map((r, i) => (
                  <tr
                    key={r.id}
                    className={`hover:bg-slate-50 transition-colors ${i !== filtradas.length - 1 ? 'border-b border-slate-50' : ''
                      }`}
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-700">{r.nombre}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{r.email}</p>
                      <p className="text-slate-400 text-xs">{r.telefono}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                        {r.servicio}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{r.fecha}</td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1 rounded-full">
                        {r.hora}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={r.estado || 'Pendiente'}
                        onChange={e => updateEstado(r.id, e.target.value)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full border-0 cursor-pointer focus:outline-none ${estadoStyles[r.estado || 'Pendiente']
                          }`}
                      >
                        {ESTADOS.map(e => (
                          <option key={e} value={e}>{e}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteReserva(r.id)}
                        className="text-xs text-white bg-red-600 px-3 py-1.5 rounded-full transition-colors"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
      {showCalendar && (
        <CalendarView
          reservas={reservas}
          onClose={() => setShowCalendar(false)}
        />
      )}
    </div>
  )
}