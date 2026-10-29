import { useRef } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { CustomCursor } from './components/layout/CustomCursor';
import { Hero } from './components/hero/Hero';
import { About } from './components/about/About';
import { Skills } from './components/skills/Skills';
import { Projects } from './components/projects/Projects';
import { Education } from './components/education/Education';
import { Certifications } from './components/certifications/Certifications';
import { Contact } from './components/contact/Contact';
import { Footer } from './components/footer/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  const mainRef = useRef<HTMLElement>(null);
  useScrollReveal(mainRef);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <CustomCursor />
      <Navbar />

      <main id="main-content" ref={mainRef}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
