const treatments = [
  'Implantología & Cirugía Guiada',
  'Ortodoncia Invisible Digital',
  'Diseño de Sonrisa & Carillas',
  'Rehabilitación Oral Integral',
  'Endodoncia Microscópica',
  'Periodoncia Láser',
]

const navigation = [
  'Cuadro Médico y Especialistas',
  'Protocolos de Bioseguridad',
  'Convenios & Coberturas EPS',
  'Portal de Diagnóstico Digital',
  'Garantía de Tratamientos',
  'Preguntas Frecuentes',
]

const legalLinks = ['Política de Privacidad Médica', 'Términos del Servicio', 'Libro de Reclamaciones', 'Consentimiento Informado']

export default function FooterM3() {
  return (
    <footer className="w-full bg-inverse-surface text-inverse-on-surface">
      <div className="max-w-[1200px] mx-auto px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-space-xl">
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center gap-space-xs">
              <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-[20px]">dentistry</span>
              </div>
              <span className="font-headline-sm text-headline-sm tracking-tight text-surface-bright">Dental Prime</span>
            </div>
            <p className="font-body-sm text-body-sm text-outline-variant">
              Centro odontológico de alta precisión certificado en San Isidro. Excelencia biomédica, tecnología 3D y calidez en atención especializada.
            </p>
            <div className="flex flex-col gap-space-xs pt-space-xs">
              <div className="inline-flex items-center gap-space-xs text-outline-variant font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-secondary-container text-[18px]">location_on</span>
                Av. Javier Prado Este 2450, San Isidro
              </div>
              <div className="inline-flex items-center gap-space-xs text-outline-variant font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-secondary-container text-[18px]">schedule</span>
                Lun - Sáb: 8:00 am - 8:00 pm
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-space-sm">
            <span className="font-label-lg text-label-lg text-surface-bright uppercase tracking-wider">Tratamientos Avanzados</span>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-outline-variant">
              {treatments.map(t => <li key={t} className="hover:text-surface-bright transition-colors cursor-pointer">{t}</li>)}
            </ul>
          </div>

          <div className="flex flex-col gap-space-sm">
            <span className="font-label-lg text-label-lg text-surface-bright uppercase tracking-wider">Navegación & Pacientes</span>
            <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-outline-variant">
              {navigation.map(t => <li key={t} className="hover:text-surface-bright transition-colors cursor-pointer">{t}</li>)}
            </ul>
          </div>

          <div className="flex flex-col gap-space-md">
            <span className="font-label-lg text-label-lg text-surface-bright uppercase tracking-wider">Acreditaciones & Calidad</span>
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center gap-space-xs p-space-sm rounded-xl bg-surface-container-low/10 backdrop-blur-sm">
                <span className="material-symbols-outlined text-tertiary-fixed">verified</span>
                <div>
                  <div className="font-label-md text-label-md text-surface-bright">ISO 9001:2015</div>
                  <div className="font-label-eyebrow text-label-eyebrow text-outline-variant">Gestión de Calidad Sanitaria</div>
                </div>
              </div>
              <div className="flex items-center gap-space-xs p-space-sm rounded-xl bg-surface-container-low/10 backdrop-blur-sm">
                <span className="material-symbols-outlined text-secondary-container">health_and_safety</span>
                <div>
                  <div className="font-label-md text-label-md text-surface-bright">Colegio Odontológico del Perú</div>
                  <div className="font-label-eyebrow text-label-eyebrow text-outline-variant">Registro Institucional Vigente COP</div>
                </div>
              </div>
            </div>
            <div className="pt-space-xs">
              <span className="font-label-eyebrow text-label-eyebrow uppercase text-outline-variant block mb-1">Central de Emergencias 24h</span>
              <span className="font-headline-sm text-headline-sm text-secondary-container">+51 (01) 480-0909</span>
            </div>
          </div>
        </div>

        <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md">
          <span className="font-body-sm text-body-sm text-outline-variant">© 2026 Dental Prime San Isidro. Todos los derechos reservados.</span>
          <div className="flex items-center gap-space-md font-body-sm text-body-sm text-outline-variant">
            {legalLinks.map(l => <a key={l} className="hover:text-surface-bright transition-colors" href="#">{l}</a>)}
          </div>
        </div>
      </div>
    </footer>
  )
}
