import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Booking from './components/Booking'
import Footer from './components/Footer'

function App() {
  return (
    <main className="font-sans">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Booking />
      <Footer />
    </main>
  )
}

export default App