import FadeIn from '../FadeIn'

const pillars = [
  {
    icon: 'scanner',
    iconBg: 'bg-[#ECFDF5] text-[#059669]',
    title: 'Escaneo 3D en Tiempo Real',
    description: 'Olvidamos las pastas de impresión que provocan náuseas. Tomamos un duplicado digital exacto de tus dientes en 3 minutos con cámaras ópticas HD.',
    highlight: 'Sin siliconas ni moldes',
    highlightColor: 'text-tertiary-container',
  },
  {
    icon: 'health_and_safety',
    iconBg: 'bg-[#F0F9FF] text-[#0284C7]',
    title: 'Anestesia Computarizada',
    description: 'Flujo micrométrico y controlado por sensores de presión tisular. Adormecimiento exacto de la pieza sin entumecer tu cara, labios ni lengua por horas.',
    highlight: 'Cero dolor por punción',
    highlightColor: 'text-secondary',
  },
  {
    icon: 'payments',
    iconBg: 'bg-primary-fixed text-primary',
    title: 'Financiamiento & EPS',
    description: 'Planes de tratamiento escalables con facilidades de crédito directo, hasta 12 cuotas sin intereses y reembolso coordinado con aseguradoras (Pacífico, Rímac, Mapfre).',
    highlight: 'Cuotas a tu medida',
    highlightColor: 'text-primary',
  },
]

export default function TechPillars() {
  return (
    <section className="w-full py-space-xl bg-surface" id="tecnologia-y-garantia">
      <div className="max-w-[1200px] mx-auto px-margin flex flex-col gap-space-lg">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-wider text-secondary font-bold mb-1">
            Innovación al Servicio del Paciente
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface">¿Por qué elegir Dental Prime?</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Transformamos la experiencia odontológica eliminando la incomodidad, los tiempos muertos y el temor clínico.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {pillars.map(p => (
            <FadeIn key={p.title}>
              <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-space-sm h-full">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${p.iconBg}`}>
                  <span className="material-symbols-outlined text-[28px]">{p.icon}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">{p.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{p.description}</p>
                <div className={`pt-space-xs flex items-center gap-2 font-label-md text-label-md font-semibold ${p.highlightColor}`}>
                  <span className="material-symbols-outlined text-[18px]">check_circle</span> {p.highlight}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
