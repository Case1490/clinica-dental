import FadeIn from '../FadeIn'
import { testimonials } from '../../data/landingContent'

function Stars({ size = 16 }) {
  return (
    <div className="flex text-[#F59E0B]">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="material-symbols-outlined" style={{ fontSize: size, fontVariationSettings: "'FILL' 1" }}>star</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="w-full py-space-xl bg-surface-container-low/40" id="testimonios">
      <div className="max-w-[1200px] mx-auto px-margin flex flex-col gap-space-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div>
            <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-wider text-primary font-bold mb-1">
              Testimonios Reales
            </span>
            <h2 className="font-headline-xl text-headline-xl text-on-surface">La Experiencia Dental Prime</h2>
          </div>
          <div className="flex items-center gap-2">
            <Stars size={20} />
            <span className="font-label-lg text-label-lg font-bold text-on-surface">4.9 de 5.0 en Google</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {testimonials.map(t => (
            <FadeIn key={t.author}>
              <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between gap-space-md h-full">
                <div className="flex flex-col gap-space-xs">
                  <Stars />
                  <p className="font-body-md text-body-md text-on-surface-variant italic leading-relaxed">"{t.text}"</p>
                </div>
                <div className="pt-space-xs flex items-center justify-between border-t border-outline-variant/20">
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface">{t.author}</span>
                    <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase font-bold">{t.service}</span>
                  </div>
                  <span className="material-symbols-outlined text-tertiary-container text-[20px]">verified</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
