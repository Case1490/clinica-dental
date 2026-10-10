import FadeIn from '../FadeIn'

const stats = [
  { value: '+2,000', label: 'Pacientes Atendidos', sub: 'Casos resueltos en San Isidro y Miraflores', color: 'text-primary', iconBg: 'bg-primary-fixed text-primary', icon: 'groups' },
  { value: '15', label: 'Años de Trayectoria', sub: 'Práctica odontológica continua y ética', color: 'text-secondary', iconBg: 'bg-secondary-fixed text-secondary', icon: 'verified_user' },
  { value: '8', label: 'Especialistas C.O.P.', sub: 'Posgrados UNMSM, Cayetano y Europa', color: 'text-tertiary-container', iconBg: 'bg-secondary-fixed text-tertiary-container', icon: 'school' },
  { value: '100%', label: 'Bioseguridad Grado A', sub: 'Esterilización hospitalaria y sellado', color: 'text-primary', iconBg: 'bg-primary-fixed text-primary', icon: 'sanitizer' },
]

export default function Stats() {
  return (
    <section className="w-full py-space-lg bg-surface-container-lowest shadow-sm">
      <div className="max-w-[1200px] mx-auto px-margin">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {stats.map((s) => (
            <FadeIn key={s.label}>
              <div className="p-space-md rounded-xl bg-surface hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className={`font-headline-2xl text-headline-2xl font-bold tracking-tight ${s.color}`}>{s.value}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${s.iconBg}`}>
                    <span className="material-symbols-outlined text-[18px]">{s.icon}</span>
                  </div>
                </div>
                <span className="font-headline-sm text-headline-sm text-on-surface">{s.label}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">{s.sub}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
