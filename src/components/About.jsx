import FadeIn from './FadeIn'

const stats = [
  { number: '+2000', label: 'Pacientes atendidos' },
  { number: '15', label: 'Años de experiencia' },
  { number: '8', label: 'Especialistas' },
  { number: '98%', label: 'Satisfacción' },
]

const features = [
  { icon: '🏥', text: 'Equipos de última generación' },
  { icon: '👨‍⚕️', text: 'Especialistas certificados' },
  { icon: '🕐', text: 'Atención de lunes a sábado' },
  { icon: '💳', text: 'Facilidades de pago' },
]

export default function About() {
  return (
    <section id="nosotros" className="py-24 bg-slate-300">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Izquierda — texto */}
        <FadeIn direction='right'>
          <div className="space-y-6">
            <span className="text-blue-600 text-sm font-medium tracking-widest uppercase">
              Quiénes somos
            </span>
            <h2 className="text-4xl font-bold text-slate-800 leading-tight">
              Más de 15 años <br />cuidando tu sonrisa
            </h2>
            <p className="text-slate-400 leading-relaxed">
              En DentalPrime combinamos tecnología de vanguardia con un trato
              humano y cercano. Nuestro equipo de especialistas está comprometido
              con brindarte la mejor experiencia dental, desde tu primera visita.
            </p>

            {/* Features */}
            <ul className="space-y-3 pt-2">
              {features.map((f) => (
                <li key={f.text} className="flex items-center gap-3 text-slate-600">
                  <span className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-base shrink-0">
                    {f.icon}
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>


        {/* Derecha — stats */}
        <FadeIn direction='left' delay={0.2}>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center space-y-1"
              >
                <p className="text-4xl font-bold text-blue-600">{stat.number}</p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>


      </div>
    </section>
  )
}