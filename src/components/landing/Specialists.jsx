import FadeIn from '../FadeIn'
import { specialists } from '../../data/landingContent'

export default function Specialists() {
  const chief = specialists.find(s => s.chief)
  const rest = specialists.filter(s => !s.chief)

  return (
    <section className="w-full py-space-xl bg-surface-container-low/50" id="especialistas">
      <div className="max-w-[1200px] mx-auto px-margin flex flex-col gap-space-lg">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-wider text-primary font-bold mb-1">
            Cuerpo Médico y Especialistas
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface">Dirigido por Cirujanos Certificados</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Formación académica de posgrado de excelencia, membresías en sociedades científicas internacionales y continuo compromiso ético.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          {chief && (
            <div className="lg:col-span-7">
            <FadeIn>
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col md:flex-row gap-space-lg items-center h-full">
                <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-2xl overflow-hidden shadow-md bg-surface-container-high">
                  <img alt={chief.name} className="w-full h-full object-cover" src="/tooth.svg" />
                </div>
                <div className="flex flex-col justify-between gap-space-sm h-full">
                  <div>
                    <div className="flex items-center gap-space-xs mb-1">
                      <span className="font-label-eyebrow text-label-eyebrow px-2 py-0.5 rounded-full bg-primary-fixed text-primary uppercase font-bold">Director Clínico</span>
                      <span className="font-label-md text-label-md text-tertiary flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-[16px]">verified</span> {chief.license}
                      </span>
                    </div>
                    <h3 className="font-headline-lg text-headline-lg text-on-surface">{chief.name}</h3>
                    <p className="font-label-lg text-label-lg text-secondary font-semibold">{chief.role}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">{chief.bio}</p>
                  </div>
                  <div className="pt-space-xs flex flex-wrap gap-space-xs">
                    {chief.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg bg-surface-container font-label-md text-label-md text-on-surface-variant">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
            </div>
          )}

          <div className="lg:col-span-5 flex flex-col gap-space-md justify-between">
            {rest.map(s => (
              <FadeIn key={s.name}>
                <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex items-center gap-space-md">
                  <div className="w-16 h-16 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined text-[32px]">dentistry</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline-sm text-headline-sm text-on-surface">{s.name}</span>
                      <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">{s.license}</span>
                    </div>
                    <span className="font-label-md text-label-md text-primary font-semibold">{s.role}</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-[13px] mt-0.5">{s.bio}</p>
                  </div>
                </div>
              </FadeIn>
            ))}

            <div className="bg-surface-container-highest/60 rounded-xl p-space-sm flex items-center justify-around gap-2 text-center">
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                <span className="font-label-md text-label-md font-semibold">Colegio Odontológico del Perú</span>
              </div>
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-secondary text-[18px]">workspace_premium</span>
                <span className="font-label-md text-label-md font-semibold">Sociedad Peruana de Prótesis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
