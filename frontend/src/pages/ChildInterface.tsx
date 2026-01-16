import { useState } from 'react';
import { LogOut, Lock, X, Baby, Sparkles, Gamepad2, Volume2, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChildInterface = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setPassword('');
    setError('');
  };

  const handleLogoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '12345') {
      // Correct password - logout and return to select user page
      navigate('/select-user');
    } else {
      // Wrong password
      setError('Incorrect password. Ask a parent for help.');
      setPassword('');
    }
  };

  const closeModal = () => {
    setShowLogoutModal(false);
    setPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-950 via-background to-secondary-950/50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/5 to-accent-500/5" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-3xl" />

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-border/50 backdrop-blur-sm bg-card/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center shadow-lg shadow-secondary-500/30">
              <Baby className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Child Mode</h1>
              <p className="text-xs text-muted-foreground">Safe Learning Space</p>
            </div>
          </div>

          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive hover:bg-destructive/20 hover:border-destructive/40 transition-all duration-300"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Exit</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/10 border border-secondary-500/20 mb-4">
              <Sparkles className="w-4 h-4 text-secondary-400" />
              <span className="text-sm text-secondary-400 font-medium">Let's Learn & Play!</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Welcome Back! 🎉
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose an activity to get started
            </p>
          </div>

          {/* Activity Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Game Activity */}
            <div className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-secondary-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary-500/20 hover:-translate-y-2 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/0 to-secondary-600/0 group-hover:from-secondary-500/10 group-hover:to-secondary-600/5 transition-all duration-500 rounded-2xl" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary-500/20 to-secondary-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Gamepad2 className="w-8 h-8 text-secondary-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Fun Games</h3>
                <p className="text-sm text-muted-foreground">Interactive games and puzzles</p>
              </div>
            </div>

            {/* Speech Activity */}
            <div className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-accent-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent-500/20 hover:-translate-y-2 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/0 to-accent-600/0 group-hover:from-accent-500/10 group-hover:to-accent-600/5 transition-all duration-500 rounded-2xl" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-500/20 to-accent-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Volume2 className="w-8 h-8 text-accent-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Speech Practice</h3>
                <p className="text-sm text-muted-foreground">Voice and communication exercises</p>
              </div>
            </div>

            {/* Learning Activity */}
            <div className="group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/20 hover:-translate-y-2 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-600/0 group-hover:from-primary-500/10 group-hover:to-primary-600/5 transition-all duration-500 rounded-2xl" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Brain Training</h3>
                <p className="text-sm text-muted-foreground">Memory and cognitive skills</p>
              </div>
            </div>
          </div>

          {/* Recent Progress */}
          <div className="mt-12 p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border">
            <h3 className="text-lg font-bold mb-4">Today's Progress 🌟</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-secondary-500/10 border border-secondary-500/20">
                <div className="text-3xl font-bold text-secondary-400">12</div>
                <div className="text-xs text-muted-foreground mt-1">Activities Done</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-accent-500/10 border border-accent-500/20">
                <div className="text-3xl font-bold text-accent-400">45</div>
                <div className="text-xs text-muted-foreground mt-1">Minutes Played</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-primary-500/10 border border-primary-500/20">
                <div className="text-3xl font-bold text-primary-400">3</div>
                <div className="text-xs text-muted-foreground mt-1">Stars Earned</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Logout Password Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md mx-4 p-8 rounded-2xl bg-card border border-border shadow-2xl shadow-destructive/20">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background/60 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal content */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-destructive/20 to-destructive/30 flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-destructive" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Parent Permission Required</h2>
              <p className="text-sm text-muted-foreground">
                Ask a parent to enter the password to exit
              </p>
            </div>

            <form onSubmit={handleLogoutSubmit}>
              <div className="mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Parent password"
                  className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20 transition-all duration-300 text-black placeholder:text-black"
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-sm text-destructive">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-xl bg-destructive text-white font-medium shadow-lg shadow-destructive/30 hover:shadow-xl hover:shadow-destructive/40 transition-all duration-300 hover:scale-105"
              >
                Exit Child Mode
              </button>
            </form>

            <button
              onClick={closeModal}
              className="w-full mt-3 px-6 py-3 rounded-xl border border-border text-muted-foreground hover:bg-background/60 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildInterface;
