import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import Navbar from './components/Navbar'
import Hero, { ProblemSection, SolutionSection, FeaturesSection, ImpactSection } from './components/Hero.tsx'
import SelectUser from './pages/SelectUser'
import ChildInterface from './pages/ChildInterface'
import ParentDashboard from './pages/ParentDashboard'

// Landing Page Component
const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <ImpactSection />
    </>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="echomind-theme">
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/select-user" element={<SelectUser />} />
            <Route path="/child" element={<ChildInterface />} />
            <Route path="/parent" element={<ParentDashboard />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
