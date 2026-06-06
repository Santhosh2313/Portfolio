import { GlobalEffects } from './components/GlobalEffects'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Certifications } from './components/Certifications'
import { Contact } from './components/Contact'

function App() {
  return (
    <>
      <GlobalEffects />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '2rem 0', textAlign: 'center', backgroundColor: '#020817' }}>
        <p className="text-secondary">© 2026 Santhosh B. Built with passion and code.</p>
      </footer>
    </>
  )
}

export default App
