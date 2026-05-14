import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-blue-200 flex items-center pt-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        <div className="space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white/70 text-sm font-medium tracking-widest uppercase"
          >
            Clínica Dental de Confianza
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-5xl md:text-6xl font-bold text-white leading-tight"
          >
            Tu sonrisa,
            <br />
            <span className="text-blue-100">nuestra pasión</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-white/80 text-lg leading-relaxed max-w-md"
          >
            Tratamientos dentales modernos con la más alta tecnología.
            Agenda tu cita hoy y descubre una atención personalizada.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex items-center gap-4 pt-2"
          >
            <a href="#reservas" className="bg-white text-blue-600 px-8 py-3.5 rounded-full font-medium hover:bg-blue-50 transition-colors">
              Agendar cita
            </a>
            <a href="#servicios" className="text-white px-8 py-3.5 rounded-full font-medium border border-white/40 hover:border-white hover:bg-white/10 transition-colors">
              Ver servicios
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex gap-8 pt-4"
          >
            {/* Stats igual que antes */}
          </motion.div>
        </div>

        {/* Tarjeta derecha */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative hidden md:flex justify-center items-center"
        >
          <div className="w-80 h-80 bg-white/20 rounded-full absolute" />
          <div className="relative bg-white rounded-3xl shadow-xl p-8 space-y-4 w-72">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl">
              🦷
            </div>
            <p className="text-slate-800 font-semibold text-lg">Primera consulta</p>
            <p className="text-slate-400 text-sm">Evaluación completa sin costo adicional para nuevos pacientes.</p>

            <a href="#reservas"
              className="block bg-blue-600 text-white text-center py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Reservar ahora
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}