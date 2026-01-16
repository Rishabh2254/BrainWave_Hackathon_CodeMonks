import { Users, Baby, Brain, Lock, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SelectUser = () => {
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleParentLogin = () => {
    // Show password modal for parent login
    setShowPasswordModal(true);
    setPassword('');
    setError('');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '12345') {
      // Correct password - navigate to parent dashboard
      navigate('/parent');
    } else {
      // Wrong password
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleChildLogin = () => {
    // Direct login for child without password
    navigate('/child');
  };

  const closeModal = () => {
    setShowPasswordModal(false);
    setPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary-950/10" />
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-secondary-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                EchoMind
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-3">
              Select User Type
            </h1>
            
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              Choose how you want to access EchoMind
            </p>
          </div>

          {/* User Type Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Parent Card */}
            <div 
              onClick={handleParentLogin}
              className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/20 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer overflow-hidden"
            >
              {/* Animated gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-600/0 group-hover:from-primary-500/10 group-hover:to-primary-600/5 transition-all duration-500 rounded-2xl" />
              
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
              
              <div className="relative z-10 text-center">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary-500/50">
                  <Users className="w-8 h-8 text-primary-400 group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <h2 className="text-2xl font-bold mb-3 group-hover:text-primary-400 transition-colors duration-300">
                  Parent Dashboard
                </h2>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  Access care management tools and AI insights
                </p>

                <div className="space-y-2 text-left mb-4">
                  <div className="flex items-center gap-2 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-400 group-hover/item:scale-125 transition-transform" />
                    <span className="text-xs text-muted-foreground">Real-time analytics</span>
                  </div>
                  <div className="flex items-center gap-2 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-400 group-hover/item:scale-125 transition-transform" />
                    <span className="text-xs text-muted-foreground">Activity monitoring</span>
                  </div>
                  <div className="flex items-center gap-2 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-400 group-hover/item:scale-125 transition-transform" />
                    <span className="text-xs text-muted-foreground">AI recommendations</span>
                  </div>
                </div>

                <div className="px-4 py-2 rounded-lg bg-primary-500/10 border border-primary-500/20 group-hover:bg-primary-500/20 group-hover:border-primary-500/40 transition-all duration-300">
                  <span className="text-xs font-semibold text-primary-400">Continue as Parent →</span>
                </div>
              </div>
            </div>

            {/* Child Card */}
            <div 
              onClick={handleChildLogin}
              className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-secondary-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary-500/20 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer overflow-hidden"
            >
              {/* Animated gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/0 to-secondary-600/0 group-hover:from-secondary-500/10 group-hover:to-secondary-600/5 transition-all duration-500 rounded-2xl" />
              
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
              
              <div className="relative z-10 text-center">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-secondary-500/20 to-secondary-600/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-secondary-500/50">
                  <Baby className="w-8 h-8 text-secondary-400 group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <h2 className="text-2xl font-bold mb-3 group-hover:text-secondary-400 transition-colors duration-300">
                  Child Interface
                </h2>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  Secure environment with interactive activities
                </p>

                <div className="space-y-2 text-left mb-4">
                  <div className="flex items-center gap-2 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary-400 group-hover/item:scale-125 transition-transform" />
                    <span className="text-xs text-muted-foreground">Child-lock secure mode</span>
                  </div>
                  <div className="flex items-center gap-2 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary-400 group-hover/item:scale-125 transition-transform" />
                    <span className="text-xs text-muted-foreground">Interactive learning games</span>
                  </div>
                  <div className="flex items-center gap-2 group/item">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary-400 group-hover/item:scale-125 transition-transform" />
                    <span className="text-xs text-muted-foreground">Adaptive difficulty levels</span>
                  </div>
                </div>

                <div className="px-4 py-2 rounded-lg bg-secondary-500/10 border border-secondary-500/20 group-hover:bg-secondary-500/20 group-hover:border-secondary-500/40 transition-all duration-300">
                  <span className="text-xs font-semibold text-secondary-400">Continue as Child →</span>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md mx-4 p-8 rounded-2xl bg-card border border-border shadow-2xl shadow-primary-500/20">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background/60 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal content */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-primary-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Parent Access</h2>
              <p className="text-sm text-muted-foreground">
                Enter password to continue
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 text-black placeholder:text-muted-foreground"
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-sm text-destructive">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:scale-105"
              >
                Continue
              </button>
            </form>

            <p className="mt-4 text-xs text-center text-muted-foreground">
              This ensures secure access to parent dashboard
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectUser;
