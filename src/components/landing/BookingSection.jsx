import FadeIn from '../FadeIn'
import Booking from '../Booking'

export default function BookingSection() {
  return (
    <section className="w-full py-space-xl bg-surface relative" id="reserva-cita">
      <div className="max-w-[1200px] mx-auto px-margin">
        <FadeIn>
          <div className="bg-surface-container-lowest rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">

            <div className="lg:col-span-5 bg-gradient-to-br from-primary via-primary-container to-[#083cb3] text-on-primary p-space-lg lg:p-space-xl flex flex-col justify-between">
              <div className="flex flex-col gap-space-md">
                <div className="inline-flex items-center gap-2 px-space-sm py-1 rounded-full bg-surface-container-lowest/15 backdrop-blur-md self-start">
                  <span className="w-2 h-2 rounded-full bg-tertiary-fixed animate-pulse"></span>
                  <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-wider text-surface-bright font-bold">
                    Reserva Prioritaria en 1 Minuto
                  </span>
                </div>
                <h2 className="font-headline-xl text-headline-xl text-white">
                  Comienza hoy tu diagnóstico de precisión
                </h2>
                <p className="font-body-md text-body-md text-on-primary-container leading-relaxed">
                  Sin esperas innecesarias. Al registrar tu cita un coordinador clínico te contactará de inmediato para confirmar tu turno e informarte sobre tu evaluación.
                </p>
                <div className="flex flex-col gap-space-sm pt-space-xs">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-lowest/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px] text-white">flash_on</span>
                    </div>
                    <span className="font-label-lg text-label-lg text-white">Respuesta y confirmación en menos de 10 min</span>
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-lowest/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px] text-white">stethoscope</span>
                    </div>
                    <span className="font-label-lg text-label-lg text-white">Consulta inicial con especialista titular</span>
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-lowest/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px] text-white">local_parking</span>
                    </div>
                    <span className="font-label-lg text-label-lg text-white">Estacionamiento privado gratuito para pacientes</span>
                  </div>
                </div>
              </div>
              <div className="pt-space-lg flex flex-col gap-1 border-t border-white/20">
                <span className="font-label-eyebrow text-label-eyebrow uppercase text-on-primary-container tracking-wider">¿Prefieres atención telefónica directa?</span>
                <a className="font-headline-md text-headline-md text-white hover:text-secondary-fixed transition-colors flex items-center gap-2" href="tel:+51014800900">
                  <span className="material-symbols-outlined text-[22px]">phone_in_talk</span> +51 (01) 480-0900
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 p-space-lg lg:p-space-xl flex flex-col justify-center">
              <Booking />
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  )
}
