import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const PASSWORD = 'admin1234'

const ESTADOS = ['Pendiente', 'Confirmada', 'Cancelada']

const estadoStyles = {
  Pendiente:  'bg-yellow-100 text-yellow-700',
  Confirmada: 'bg-green-100 text-green-700',
  Cancelada:  'bg-red-100 text-red-600',
}

export default function Admin() {
  const [authed, setAuthed]     = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [reservas, setReservas] = useState([])
  const [loading, setLoading]   = useState(false)
  const [filtro, setFiltro]     = useState('Todos')

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
    setReservas(data || [])
    setLoading(false)
  }

  const updateEstado = async (id, estado) => {
    await supabase.from('reservas').update({ estado }).eq('id', id)
    setReservas(reservas.map(r => r.id === id ? { ...r, estado } : r))
  }

  const deleteReserva = async (id) => {
    if (!confirm('¿Eliminar esta reserva?')) return
    await supabase.from('reservas').delete().eq('id', id)
    setReservas(reservas.filter(r => r.id !== id))
  }

  useEffect(() => {
    if (authed) fetchReservas()
  }, [authed])

  const filtradas = filtro === 'Todos'
    ? reservas
    : reservas.filter(r => (r.estado || 'Pendiente') === filtro)

  // — Login —
  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
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
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-xl font-bold text-slate-800">
            <span className="text-blue-600">Dental</span>Prime — Reservas
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">{reservas.length} reservas totales</span>
            <button
              onClick={() => setAuthed(false)}
              className="text-sm text-slate-400 hover:text-red-400 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">

        {/* Filtros */}
        <div className="flex items-center gap-2">
          {['Todos', ...ESTADOS].map(f => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filtro === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-500 border border-slate-200 hover:border-blue-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Tabla */}
        {loading ? (
          <p className="text-slate-400 text-center py-12">Cargando reservas...</p>
        ) : filtradas.length === 0 ? (
          <p className="text-slate-400 text-center py-12">No hay reservas.</p>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-left">
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
                    className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${
                      i === filtradas.length - 1 ? 'border-none' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-700">{r.nombre}</p>
                      <p className="text-slate-400 text-xs">{r.email}</p>
                      <p className="text-slate-400 text-xs">{r.telefono}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{r.servicio}</td>
                    <td className="px-6 py-4 text-slate-600">{r.fecha}</td>
                    <td className="px-6 py-4 text-slate-600">{r.hora}</td>
                    <td className="px-6 py-4">
                      <select
                        value={r.estado || 'Pendiente'}
                        onChange={e => updateEstado(r.id, e.target.value)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full border-0 cursor-pointer focus:outline-none ${
                          estadoStyles[r.estado || 'Pendiente']
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
                        className="text-slate-300 hover:text-red-400 transition-colors text-xs"
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
    </div>
  )
}