import { useState } from 'react'
import { faqs } from '../../data/landingContent'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="w-full py-space-xl bg-surface-container-low/30" id="preguntas-frecuentes">
      <div className="max-w-[860px] mx-auto px-margin flex flex-col gap-space-lg">
        <div className="text-center">
          <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-wider text-primary font-bold mb-1">
            Resolvemos tus Inquietudes
          </span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface">Preguntas Frecuentes</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Transparencia médica antes de cualquier intervención clínica.</p>
        </div>

        <div className="flex flex-col gap-space-xs">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={item.question} className="rounded-2xl bg-surface-container-lowest shadow-sm overflow-hidden transition-all duration-300">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full px-space-lg py-space-md flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">{item.question}</span>
                  <span
                    className="material-symbols-outlined text-primary text-[24px] transition-transform duration-300"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    expand_more
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? '400px' : '0px' }}
                >
                  <div className="px-space-lg pb-space-md pt-0 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
