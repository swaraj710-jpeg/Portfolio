import Contact from './components/Contact';
import Education from './components/Education';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';
import portfolioData from './data/portfolioData';

export default function App() {
  return (
    <div className="site-shell min-h-screen overflow-x-clip bg-ink font-sans text-paper antialiased">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="ambient-grid" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar profile={portfolioData.profile} />
      <main id="main-content">
        <Hero profile={portfolioData.profile} metrics={portfolioData.metrics} />
        <div className="section-divider" />
        <Projects projects={portfolioData.projects} />
        <div className="section-divider" />
        <Experience experiences={portfolioData.experiences} />
        <div className="section-divider" />
        <Skills categories={portfolioData.skillCategories} />
        <div className="section-divider" />
        <Education education={portfolioData.education} credentials={portfolioData.credentials} profile={portfolioData.profile} />
        <div className="section-divider" />
        <Contact profile={portfolioData.profile} />
      </main>
      <Footer profile={portfolioData.profile} />
    </div>
  );
}
