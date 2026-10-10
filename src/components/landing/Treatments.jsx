import { useState } from 'react'
import FadeIn from '../FadeIn'
import { treatments, treatmentFilters } from '../../data/landingContent'

export default function Treatments() {
  const [filter, setFilter] = useState('all')

  const visible = filter === 'all' ? treatments : treatments.filter(t => t.category === filter)

  return (
    <section className="w-full py-space-xl bg-surface" id="tratamientos">
      <div className="max-w-[1200px] mx-auto px-margin flex flex-col gap-space-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-space-xs py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-label-eyebrow text-label-eyebrow uppercase tracking-wider mb-2">
              Catálogo Odontológico de Precisión
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface">Tratamientos Clínicos Avanzados</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Precios transparentes, técnicas mínimamente invasivas y planificación digital previa sin compromisos.</p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-surface-container shadow-inner">
            {treatmentFilters.map(f => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`px-space-sm py-1.5 rounded-lg font-label-md text-label-md transition-all duration-200 ${filter === f.key
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {visible.map(t => (
            <FadeIn key={t.id}>
              <div className="flex flex-col justify-between p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full">
                <div className="flex flex-col gap-space-sm">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${t.iconBg}`}>
                      <span className="material-symbols-outlined text-[24px]">dentistry</span>
                    </div>
                    <span className="font-label-eyebrow text-label-eyebrow px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed uppercase font-semibold">{t.badge}</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">{t.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{t.description}</p>
                </div>
                <div className="pt-space-md flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant uppercase">{t.priceLabel}</span>
                    <span className="font-headline-md text-headline-md text-primary font-bold">{t.price}</span>
                  </div>
                  <a className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:text-primary-container font-semibold transition-colors" href="#reserva-cita">
                    <span>Reservar</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
