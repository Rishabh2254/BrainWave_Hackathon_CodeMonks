import './App.css'
import Navbar from './components/Navbar'
import Hero, { ProblemSection, SolutionSection, FeaturesSection, ImpactSection } from './components/Hero.tsx'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <ImpactSection />
    </div>
  )
}

export default App
