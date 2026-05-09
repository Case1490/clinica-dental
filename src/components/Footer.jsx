export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-12 mb-12">

          {/* Marca */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-blue-400">Dental</span>
              <span className="text-2xl font-light text-white">Prime</span>
            </div>
            <p className="text-sm leading-relaxed">
              Cuidamos tu salud dental con tecnología moderna y un trato humano y cercano.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#servicios" className="hover:text-blue-400 transition-colors">Servicios</a></li>
              <li><a href="#nosotros" className="hover:text-blue-400 transition-colors">Nosotros</a></li>
              <li><a href="#reservas" className="hover:text-blue-400 transition-colors">Reservar cita</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>📍 Av. Javier Prado 1234, San Isidro</li>
              <li>📞 +51 999 999 999</li>
              <li>✉️ contacto@dentalprime.pe</li>
              <li>🕐 Lun – Sáb: 9am – 6pm</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} DentalPrime. Todos los derechos reservados.</p>
        </div>

      </div>
    </footer>
  )
}