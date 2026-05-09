import { useState, useEffect } from 'react'

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
      ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm'
      : 'bg-transparent'
      }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <span className={`text-2xl font-bold transition-colors ${scrolled ? 'text-blue-600' : 'text-white'}`}>
            Dental
          </span>
          <span className={`text-2xl font-bold transition-colors ${scrolled ? 'text-black' : 'text-white'}`}>
            Prime
          </span>
        </div>

        <ul className={`hidden md:flex items-center gap-8 text-sm transition-colors ${scrolled ? 'text-slate-600' : 'text-white'
          }`}>
          <li><a href="#servicios" className="hover:text-blue-600 transition-colors">Servicios</a></li>
          <li><a href="#nosotros" className="hover:text-blue-600 transition-colors">Nosotros</a></li>
          <li><a href="#reservas" className="hover:text-blue-600 transition-colors">Reservas</a></li>
        </ul>


        <a href="#reservas"
          className="bg-blue-600 text-white text-sm px-5 py-2.5 rounded-full hover:bg-blue-700 transition-colors"
        >
          Reservar cita
        </a>

      </div>
    </nav >
  )
}