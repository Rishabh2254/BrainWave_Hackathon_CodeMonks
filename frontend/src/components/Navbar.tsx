import { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Navbar height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleAuth = () => {
    // Navigate to user selection page
    window.location.href = '/select-user';
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="group/navbar relative backdrop-blur-xl bg-card/60 border border-border/50 rounded-2xl shadow-2xl shadow-black/10 hover:bg-card/80 hover:border-primary-500/30 hover:shadow-primary-500/20 transition-all duration-500">
          {/* Glow effect on hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/0 via-primary-500/0 to-secondary-500/0 group-hover/navbar:from-primary-500/20 group-hover/navbar:via-primary-500/10 group-hover/navbar:to-secondary-500/20 rounded-2xl opacity-0 group-hover/navbar:opacity-100 blur-xl transition-all duration-500" />
          
          <div className="relative z-10 px-8 py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer group/logo" onClick={() => scrollToSection('hero')}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover/logo:shadow-primary-500/50 group-hover/logo:scale-110 transition-all duration-300">
                <Brain className="w-6 h-6 text-white group-hover/logo:rotate-12 transition-transform duration-300" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent group-hover/logo:from-primary-300 group-hover/logo:to-secondary-300 transition-all duration-300">
                EchoMind
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1 bg-background/40 rounded-xl p-1 border border-border/30 group-hover/navbar:bg-background/60 group-hover/navbar:border-primary-500/20 transition-all duration-300">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'problem', label: 'Problem' },
                { id: 'solution', label: 'Solution' },
                { id: 'features', label: 'Features' },
                { id: 'impact', label: 'Impact' }
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="relative px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-primary-500/10 transition-all duration-300 overflow-hidden group/link"
                >
                  <span className="relative z-10">{section.label}</span>
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-500/20 to-transparent translate-x-[-100%] group-hover/link:translate-x-[100%] transition-transform duration-700" />
                </button>
              ))}
            </div>

            {/* Sign In/Sign Up Button */}
            <button
              onClick={handleAuth}
              className="group relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10">Sign In / Sign Up</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
