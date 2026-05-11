import { useState } from 'react'
import Calendar from 'react-calendar'

export default function CalendarView({ reservas, onClose }) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null)

  const fechasConReservas = reservas.map(r => r.fecha)

  const tileClassName = ({ date }) => {
    const fechaStr = date.toLocaleDateString('en-CA')
    if (fechasConReservas.includes(fechaStr)) return 'tiene-reserva'
    return null
  }

  const tileContent = ({ date }) => {
    const fechaStr = date.toLocaleDateString('en-CA')
    const count = reservas.filter(r => r.fecha === fechaStr).length
    if (count > 0) {
      return (
        <div className="flex justify-center mt-0.5">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full block" />
        </div>
      )
    }
    return null
  }

  const handleDayClick = (date) => {
    const fechaStr = date.toLocaleDateString('en-CA')
    setFechaSeleccionada(fechaStr)
  }

  const reservasDelDia = fechaSeleccionada
    ? reservas.filter(r => r.fecha === fechaSeleccionada)
    : []

  const estadoStyles = {
    Pendiente: 'bg-yellow-100 text-yellow-700',
    Confirmada: 'bg-green-100 text-green-700',
    Cancelada: 'bg-red-100 text-red-600',
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md space-y-4 max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between">
          <h3 className="text-slate-800 font-semibold text-lg">Calendario de citas</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl font-light"
          >
            ✕
          </button>
        </div>

        <Calendar
          tileClassName={tileClassName}
          tileContent={tileContent}
          onClickDay={handleDayClick}
          locale="es-PE"
        />

        {/* Leyenda */}
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span className="w-2.5 h-2.5 bg-blue-500 rounded-full block" />
          Día con reservas agendadas
        </div>

        {/* Reservas del día seleccionado */}
        {fechaSeleccionada && (
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <p className="text-sm font-semibold text-slate-600">
              {reservasDelDia.length > 0
                ? `${reservasDelDia.length} cita${reservasDelDia.length > 1 ? 's' : ''} el ${fechaSeleccionada}`
                : `Sin citas el ${fechaSeleccionada}`
              }
            </p>

            {reservasDelDia.length === 0 && (
              <p className="text-slate-400 text-sm text-center py-4">📭 No hay citas este día</p>
            )}

            {reservasDelDia.map(r => (
              <div
                key={r.id}
                className="bg-slate-50 rounded-xl p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-700">{r.nombre}</p>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${estadoStyles[r.estado || 'Pendiente']}`}>
                    {r.estado || 'Pendiente'}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>🕐 {r.hora}</span>
                  <span>·</span>
                  <span>🦷 {r.servicio}</span>
                </div>
                <div className="text-xs text-slate-400 space-y-0.5">
                  <p>✉️ {r.email}</p>
                  <p>📞 {r.telefono}</p>
                </div>
                {r.mensaje && (
                  <p className="text-xs text-slate-400 italic">"{r.mensaje}"</p>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}