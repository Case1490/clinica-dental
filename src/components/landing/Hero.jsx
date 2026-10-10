import FadeIn from '../FadeIn'

export default function Hero() {
  return (
    <section id="inicio" className="relative w-full py-space-xl overflow-hidden bg-gradient-to-b from-surface via-surface-container-low/40 to-surface">
      <div className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none -z-10"></div>
      <div className="max-w-[1200px] mx-auto px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">

          <div className="lg:col-span-7">
          <FadeIn>
            <div className="flex flex-col gap-space-md z-10">
              <div className="inline-flex items-center gap-space-xs self-start px-space-sm py-1.5 rounded-full bg-surface-container-high/70 shadow-sm backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim animate-pulse inline-block"></span>
                <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-wider text-on-surface-variant font-bold">
                  Clínica Dental Acreditada • San Isidro, Lima
                </span>
              </div>

              <h1 className="font-headline-2xl text-headline-2xl text-on-surface tracking-tight leading-tight">
                Tu sonrisa en manos de <span className="text-primary-container">especialistas certificados</span> y tecnología 3D
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                Odontología digital mínimamente invasiva, diagnóstico por tomografía computarizada y un trato humano, cálido y transparente en el corazón médico de San Isidro.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs pt-space-xs">
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest shadow-sm">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
                  <span className="font-label-md text-label-md text-on-surface">Evaluación 3D inicial</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest shadow-sm">
                  <span className="material-symbols-outlined text-primary text-[18px]">credit_card</span>
                  <span className="font-label-md text-label-md text-on-surface">0% interés hasta 12 cuotas</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-lowest shadow-sm">
                  <span className="material-symbols-outlined text-secondary text-[18px]">shield</span>
                  <span className="font-label-md text-label-md text-on-surface">Garantía clínica escrita</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
                <a className="inline-flex items-center justify-center gap-space-xs px-space-lg py-3.5 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg shadow-[0_8px_20px_rgba(13,82,232,0.32)] hover:bg-primary transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] group" href="#reserva-cita">
                  <span>Agendar primera cita prioritaria</span>
                  <span className="material-symbols-outlined text-[19px] transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                </a>
                <a className="inline-flex items-center justify-center gap-space-xs px-space-lg py-3.5 rounded-full bg-surface-container text-primary font-label-lg text-label-lg hover:bg-surface-container-high transition-colors" href="#tratamientos">
                  <span>Explorar tratamientos y precios</span>
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </a>
              </div>

              <div className="flex items-center gap-space-md pt-space-xs">
                <div className="flex -space-x-2">
                  <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-md text-label-md shadow-sm">MR</div>
                  <div className="w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-md text-label-md shadow-sm">CB</div>
                  <div className="w-9 h-9 rounded-full bg-tertiary-container text-on-primary flex items-center justify-center font-label-md text-label-md shadow-sm">LM</div>
                  <div className="w-9 h-9 rounded-full bg-surface-container-highest text-primary flex items-center justify-center font-label-md text-label-md shadow-sm">+4k</div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-headline-sm text-headline-sm text-on-surface">4.9</span>
                    <div className="flex text-[#F59E0B]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">+450 opiniones de pacientes verificados en Google</span>
                </div>
              </div>
            </div>
          </FadeIn>
          </div>

          <div className="lg:col-span-5">
          <FadeIn delay={0.15} direction="right">
            <div className="relative flex justify-center mt-space-lg lg:mt-0">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-surface-container-high/30">
                <img alt="Clínica Dental Prime San Isidro - Atención Odontológica" className="w-full h-[470px] object-cover" src="/tooth.svg" />
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/40 via-transparent to-transparent pointer-events-none"></div>
              </div>
              <div className="absolute -top-5 -right-4 sm:right-2 bg-surface-container-lowest/95 backdrop-blur-md p-space-sm rounded-xl shadow-xl flex items-center gap-space-sm max-w-[260px] z-20">
                <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface leading-tight font-bold">Escáner Intraoral 3D</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px] leading-snug">Precisión milimétrica sin moldes molestos</p>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-4 sm:left-2 bg-surface-container-lowest/95 backdrop-blur-md p-space-sm rounded-xl shadow-xl flex items-center gap-space-sm max-w-[270px] z-20">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-container shrink-0">
                  <span className="material-symbols-outlined text-[20px]">recommend</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface leading-tight font-bold">99.2% Satisfacción</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant text-[12px] leading-snug">Encuestas clínicas auditadas en 2024</p>
                </div>
              </div>
            </div>
          </FadeIn>
          </div>

        </div>
      </div>
    </section>
  )
}
