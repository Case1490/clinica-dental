import FadeIn from './FadeIn'

const services = [
  {
    icon: '🦷',
    title: 'Limpieza Dental',
    description: 'Eliminamos sarro y manchas para mantener tus dientes sanos y brillantes.',
    price: 'Desde S/ 80',
  },
  {
    icon: '✨',
    title: 'Blanqueamiento',
    description: 'Recupera el blanco natural de tu sonrisa con tecnología LED de última generación.',
    price: 'Desde S/ 250',
  },
  {
    icon: '🔧',
    title: 'Ortodoncia',
    description: 'Brackets tradicionales o invisibles para alinear tu dentadura perfectamente.',
    price: 'Desde S/ 1500',
  },
  {
    icon: '🛡️',
    title: 'Endodoncia',
    description: 'Tratamiento de conductos para salvar tu diente y eliminar el dolor.',
    price: 'Desde S/ 300',
  },
  {
    icon: '💎',
    title: 'Carillas',
    description: 'Láminas de porcelana que transforman completamente tu sonrisa.',
    price: 'Desde S/ 600',
  },
  {
    icon: '🦴',
    title: 'Implantes',
    description: 'Reemplaza dientes perdidos con implantes de titanio de alta durabilidad.',
    price: 'Desde S/ 2000',
  },
]

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <FadeIn>
          <div className="text-center space-y-4 mb-16">
            <span className="text-blue-600 text-sm font-medium tracking-widest uppercase">
              Lo que ofrecemos
            </span>
            <h2 className="text-4xl font-bold text-slate-800">
              Nuestros tratamientos
            </h2>
            <p className="text-slate-400 max-w-md mx-auto">
              Contamos con todos los servicios que necesitas para cuidar
              tu salud dental en un solo lugar.
            </p>
          </div>
        </FadeIn>


        {/* Grid de tarjetas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <FadeIn key={service.title}>
              <div
                key={service.title}
                className="group p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-blue-100 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-slate-800 font-semibold text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="text-blue-600 text-sm font-medium">
                  {service.price}
                </span>
              </div>
            </FadeIn>

          ))}
        </div>

      </div>
    </section>
  )
}