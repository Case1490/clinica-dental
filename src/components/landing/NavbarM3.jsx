import { Link } from 'react-router-dom'
import { navLinks } from '../../data/landingContent'

export default function NavbarM3() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1200px] mx-auto px-margin flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-sm shrink-0">
          <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shadow-[0_4px_12px_rgba(13,82,232,0.08)] shrink-0">
            <span className="material-symbols-outlined">dentistry</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-md text-headline-md tracking-tight text-on-surface whitespace-nowrap">Dental Prime</span>
              <span className="font-label-eyebrow text-label-eyebrow px-space-xs py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed uppercase tracking-wider hidden lg:inline-block">San Isidro</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant hidden xl:block whitespace-nowrap">Clínica Odontológica Especializada</span>
          </div>
        </div>

        <nav className="hidden xl:flex items-center gap-1 p-1">
          {navLinks.map((link, i) => (
            <a
              key={link.path}
              aria-current={i === 0 ? 'page' : undefined}
              className={`font-label-lg text-label-lg px-space-sm py-1.5 rounded-lg transition-colors whitespace-nowrap ${i === 0
                ? 'bg-surface-container text-primary'
                : 'text-on-surface-variant hover:text-on-surface'
                }`}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-space-xs shrink-0">
          <div className="hidden 2xl:flex items-center gap-1 px-space-sm py-1 rounded-full bg-error-container text-on-error-container shrink-0">
            <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
            <span className="font-label-eyebrow text-label-eyebrow uppercase whitespace-nowrap">24/7 Urgencias</span>
          </div>
          <a className="hidden 2xl:flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors shrink-0" href="tel:+51014800900">
            <span className="material-symbols-outlined text-secondary text-[18px]">call</span>
            <span className="font-label-md text-label-md whitespace-nowrap">+51 (01) 480-0900</span>
          </a>
          <Link
            className="hidden md:inline-flex items-center gap-1.5 px-space-sm py-2 rounded-full border border-outline-variant/20 bg-surface-container-low/50 hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all active:scale-[0.98] shrink-0"
            to="/admin"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">account_circle</span>
            <span className="whitespace-nowrap">Acceder a panel</span>
          </Link>
          <a
            className="inline-flex items-center justify-center px-space-md py-2.5 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg shadow-[0_4px_14px_0_rgba(13,82,232,0.35)] hover:bg-primary transition-all active:scale-[0.98] shrink-0 whitespace-nowrap"
            href="#reserva-cita"
          >
            <span className="sm:hidden">Agendar</span>
            <span className="hidden sm:inline">Agendar Cita</span>
          </a>
        </div>
      </div>
    </header>
  )
}
