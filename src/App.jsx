import NavbarM3 from './components/landing/NavbarM3'
import Hero from './components/landing/Hero'
import Stats from './components/landing/Stats'
import Treatments from './components/landing/Treatments'
import Specialists from './components/landing/Specialists'
import TechPillars from './components/landing/TechPillars'
import Testimonials from './components/landing/Testimonials'
import BookingSection from './components/landing/BookingSection'
import FAQ from './components/landing/FAQ'
import FooterM3 from './components/landing/FooterM3'

function App() {
  return (
    <>
      <NavbarM3 />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full">
          <Hero />
          <Stats />
          <Treatments />
          <Specialists />
          <TechPillars />
          <Testimonials />
          <BookingSection />
          <FAQ />
        </div>
      </main>
      <FooterM3 />
    </>
  )
}

export default App
