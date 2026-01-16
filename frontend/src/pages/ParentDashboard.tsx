import { useState } from 'react';
import { 
  LogOut, 
  Users, 
  TrendingUp, 
  Calendar, 
  Brain, 
  Activity,
  Clock,
  Target,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Home,
  FileText,
  HeartPulse,
  CheckSquare,
  ClipboardList,
  Table,
  User,
  BookOpen,
  X,
  Play
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [showJebsenModal, setShowJebsenModal] = useState(false);

  const handleLogout = () => {
    // Direct logout for parent, return to select user page
    navigate('/select-user');
  };

  const navItems = [
    { id: 'dashboard', label: 'Main Dashboard', icon: Home },
    { id: 'reports', label: 'Progress Reports', icon: FileText },
    { id: 'therapy', label: 'Therapy Sessions', icon: HeartPulse },
    { id: 'activities', label: 'Daily Activities', icon: Calendar },
    { id: 'checktable', label: 'Check Table', icon: CheckSquare },
    { id: 'tracking', label: 'Tracking', icon: TrendingUp },
    { id: 'assessments', label: 'Assessment Tools', icon: ClipboardList },
    { id: 'trackingTables', label: 'Tracking Tables', icon: Table },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950">
      {/* Sidebar */}
      <aside className="w-80 flex-shrink-0 bg-gradient-to-b from-emerald-900 via-emerald-950 to-emerald-900 border-r border-emerald-800/30 shadow-2xl">
        <div className="flex flex-col h-screen sticky top-0">
          {/* Logo/Title */}
          <div className="p-6 border-b border-emerald-800/30 bg-gradient-to-r from-emerald-800/20 to-transparent">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/40">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white font-['Inter']">Autism Progress Tracker</h1>
                <p className="text-xs text-emerald-300/70 font-['Inter']">Professional Care Management</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-['Inter'] group relative ${
                    isActive
                      ? 'bg-emerald-600/40 text-white shadow-lg shadow-emerald-600/20 border-l-4 border-emerald-400'
                      : 'text-emerald-200/70 hover:text-white hover:bg-emerald-800/30 hover:border-l-4 hover:border-emerald-500/50 border-l-4 border-transparent'
                  }`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-emerald-300' : 'text-emerald-400/70 group-hover:text-emerald-300'}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                  {isActive && (
                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Jebsen Test Info Card */}
          <div className="p-4 mx-4 mb-4 rounded-xl bg-gradient-to-br from-emerald-800/40 via-emerald-900/40 to-teal-900/40 border border-emerald-700/30 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-white text-sm font-['Inter']">Learn About Jebsen Test</h3>
            </div>
            <p className="text-xs text-emerald-200/80 mb-4 leading-relaxed font-['Inter']">
              Discover how the Jebsen-Taylor Hand Function Test helps track fine motor skills development and hand dexterity in children with autism.
            </p>
            <button
              onClick={() => setShowJebsenModal(true)}
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-medium hover:from-emerald-500 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/40 font-['Inter']"
            >
              View Article & Video
            </button>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-emerald-800/30 bg-gradient-to-r from-emerald-900/50 to-transparent">
            <p className="text-xs text-emerald-300/50 text-center font-['Inter']">
              © 2026 Autism Progress Tracker
            </p>
            <p className="text-xs text-emerald-300/40 text-center mt-1 font-['Inter']">
              All rights reserved
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1 font-['Inter']">Welcome back, Parent! 👋</h2>
              <p className="text-sm text-slate-400 font-['Inter']">Here's an overview of your child's progress and activities</p>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300 shadow-lg"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium font-['Inter']">Logout</span>
            </button>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-slate-900/50 to-emerald-950/20">
          <div className="max-w-7xl mx-auto">

          <div className="max-w-7xl mx-auto">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {/* Weekly Activities */}
              <div className="p-6 rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-emerald-700/20 hover:border-emerald-500/40 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/30 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full font-['Inter']">+12%</span>
                </div>
                <div className="text-3xl font-bold mb-1 text-white font-['Inter']">48</div>
                <div className="text-sm text-slate-400 font-['Inter']">Activities This Week</div>
              </div>

              {/* Total Time */}
              <div className="p-6 rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-emerald-700/20 hover:border-emerald-500/40 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/30 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-teal-400" />
                  </div>
                  <span className="text-xs font-medium text-teal-400 bg-teal-500/10 px-2 py-1 rounded-full font-['Inter']">+8%</span>
                </div>
                <div className="text-3xl font-bold mb-1 text-white font-['Inter']">12.5h</div>
                <div className="text-sm text-slate-400 font-['Inter']">Engagement Time</div>
              </div>

              {/* Progress Score */}
              <div className="p-6 rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-emerald-700/20 hover:border-emerald-500/40 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/30 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full font-['Inter']">+15%</span>
                </div>
                <div className="text-3xl font-bold mb-1 text-white font-['Inter']">87%</div>
                <div className="text-sm text-slate-400 font-['Inter']">Progress Score</div>
              </div>

              {/* Goals Achieved */}
              <div className="p-6 rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-emerald-700/20 hover:border-emerald-500/40 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/30 flex items-center justify-center">
                    <Target className="w-6 h-6 text-teal-400" />
                  </div>
                  <span className="text-xs font-medium text-teal-400 bg-teal-500/10 px-2 py-1 rounded-full font-['Inter']">3/5</span>
                </div>
                <div className="text-3xl font-bold mb-1 text-white font-['Inter']">60%</div>
                <div className="text-sm text-slate-400 font-['Inter']">Weekly Goals</div>
              </div>
            </div>

            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - AI Insights & Schedule */}
              <div className="lg:col-span-2 space-y-6">
                {/* AI Recommendations */}
                <div className="p-6 rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-emerald-700/20 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/30 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white font-['Inter']">AI Insights & Recommendations</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-emerald-400 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-sm mb-1 text-white font-['Inter']">Positive Trend Detected</h4>
                          <p className="text-xs text-slate-400 font-['Inter']">Speech exercises show 25% improvement this week. Consider increasing daily practice to 15 minutes.</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-teal-400 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-sm mb-1 text-white font-['Inter']">Activity Suggestion</h4>
                          <p className="text-xs text-slate-400 font-['Inter']">Based on progress patterns, morning sessions (9-10 AM) show better engagement rates.</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-sm mb-1 text-white font-['Inter']">Milestone Achievement</h4>
                          <p className="text-xs text-slate-400 font-['Inter']">Completed 50 cognitive exercises! Ready to move to intermediate level activities.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Today's Schedule */}
                <div className="p-6 rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-emerald-700/20 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500/20 to-teal-600/30 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-teal-400" />
                      </div>
                      <h3 className="text-lg font-bold text-white font-['Inter']">Today's Schedule</h3>
                    </div>
                    <button className="text-xs text-emerald-400 hover:text-emerald-300 font-medium font-['Inter']">
                      View All →
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/50 border border-slate-700/50">
                      <div className="text-center min-w-[60px]">
                        <div className="text-xs text-slate-400 font-['Inter']">09:00 AM</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white font-['Inter']">Speech Practice</div>
                        <div className="text-xs text-slate-400 font-['Inter']">Communication exercises</div>
                      </div>
                      <div className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full font-['Inter']">Upcoming</div>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/50 border border-slate-700/50">
                      <div className="text-center min-w-[60px]">
                        <div className="text-xs text-slate-400 font-['Inter']">11:00 AM</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white font-['Inter']">Brain Training</div>
                        <div className="text-xs text-slate-400 font-['Inter']">Memory games</div>
                      </div>
                      <div className="text-xs bg-teal-500/10 text-teal-400 px-2 py-1 rounded-full font-['Inter']">Scheduled</div>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-900/50 border border-slate-700/50">
                      <div className="text-center min-w-[60px]">
                        <div className="text-xs text-slate-400 font-['Inter']">02:00 PM</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-white font-['Inter']">Interactive Play</div>
                        <div className="text-xs text-slate-400 font-['Inter']">Fun activities</div>
                      </div>
                      <div className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full font-['Inter']">Scheduled</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Quick Actions & Activity Log */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="p-6 rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-emerald-700/20 shadow-lg">
                  <h3 className="text-lg font-bold mb-4 text-white font-['Inter']">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-300 text-left">
                      <div className="font-semibold text-sm text-white font-['Inter']">Schedule Activity</div>
                      <div className="text-xs text-slate-400 font-['Inter']">Add new exercise</div>
                    </button>
                    
                    <button className="w-full p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 hover:bg-teal-500/20 transition-all duration-300 text-left">
                      <div className="font-semibold text-sm text-white font-['Inter']">View Reports</div>
                      <div className="text-xs text-slate-400 font-['Inter']">Progress analytics</div>
                    </button>
                    
                    <button className="w-full p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-300 text-left">
                      <div className="font-semibold text-sm text-white font-['Inter']">Set Goals</div>
                      <div className="text-xs text-slate-400 font-['Inter']">Weekly objectives</div>
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="p-6 rounded-2xl bg-slate-800/60 backdrop-blur-sm border border-emerald-700/20 shadow-lg">
                  <h3 className="text-lg font-bold mb-4 text-white font-['Inter']">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white font-['Inter']">Completed Speech Exercise</div>
                        <div className="text-xs text-slate-400 font-['Inter']">2 hours ago</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-teal-400 mt-2" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white font-['Inter']">Brain Training Session</div>
                        <div className="text-xs text-slate-400 font-['Inter']">5 hours ago</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white font-['Inter']">Goal Achievement</div>
                        <div className="text-xs text-slate-400 font-['Inter']">Yesterday</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-teal-400 mt-2" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white font-['Inter']">New Milestone Reached</div>
                        <div className="text-xs text-slate-400 font-['Inter']">2 days ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Jebsen Test Modal */}
      {showJebsenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-800 via-slate-900 to-emerald-950 border border-emerald-700/30 rounded-2xl shadow-2xl">
            {/* Close button */}
            <button
              onClick={() => setShowJebsenModal(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700/80 transition-all duration-300 z-10 border border-slate-700"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <div className="p-10">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl shadow-emerald-500/30">
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white font-['Inter']">Jebsen-Taylor Hand Function Test</h2>
                    <p className="text-sm text-emerald-300/70 font-['Inter'] mt-1">Comprehensive Fine Motor Skills Assessment Guide</p>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="mb-8 p-8 rounded-2xl bg-slate-900/60 border border-emerald-700/20 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-5 font-['Inter'] flex items-center gap-2">
                  <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
                  What is the Jebsen-Taylor Hand Function Test?
                </h3>
                <div className="space-y-5 text-slate-300 font-['Inter']">
                  <p className="leading-relaxed text-base">
                    The Jebsen-Taylor Hand Function Test is a standardized, evidence-based assessment tool designed to evaluate broad 
                    aspects of hand function commonly used in activities of daily living (ADLs). For children with autism spectrum 
                    disorder (ASD), this test provides crucial insights into fine motor skill development, hand dexterity, and functional 
                    capabilities that impact independence and quality of life.
                  </p>
                  
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 my-6">
                    <h4 className="text-lg font-semibold text-emerald-300 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Clinical Significance
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Children with ASD often experience challenges with fine motor coordination that can affect essential daily tasks 
                      such as eating, dressing, writing, and self-care. Regular assessment using the Jebsen-Taylor test helps clinicians 
                      and parents track developmental trajectories and intervention effectiveness with objective, quantifiable data.
                    </p>
                  </div>
                  
                  <h4 className="text-xl font-semibold text-white mt-8 mb-4 flex items-center gap-2 font-['Inter']">
                    <div className="w-1 h-6 bg-gradient-to-b from-teal-500 to-emerald-500 rounded-full" />
                    Seven Standardized Subtests
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                      <h5 className="font-bold text-emerald-400 mb-2 text-sm">1. Writing</h5>
                      <p className="text-xs text-slate-400">Measures speed and coordination when writing a standardized sentence (24 letters, 3rd-grade level)</p>
                    </div>
                    <div className="p-4 rounded-lg bg-teal-500/5 border border-teal-500/10">
                      <h5 className="font-bold text-teal-400 mb-2 text-sm">2. Card Turning</h5>
                      <p className="text-xs text-slate-400">Assesses ability to manipulate and turn over flat objects (simulates page turning)</p>
                    </div>
                    <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                      <h5 className="font-bold text-emerald-400 mb-2 text-sm">3. Small Common Objects</h5>
                      <p className="text-xs text-slate-400">Evaluates picking up and relocating small items like paper clips, bottle caps, coins</p>
                    </div>
                    <div className="p-4 rounded-lg bg-teal-500/5 border border-teal-500/10">
                      <h5 className="font-bold text-teal-400 mb-2 text-sm">4. Simulated Feeding</h5>
                      <p className="text-xs text-slate-400">Tests spooning ability with beans to assess self-feeding capabilities</p>
                    </div>
                    <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                      <h5 className="font-bold text-emerald-400 mb-2 text-sm">5. Stacking Checkers</h5>
                      <p className="text-xs text-slate-400">Measures bilateral coordination and precision stacking</p>
                    </div>
                    <div className="p-4 rounded-lg bg-teal-500/5 border border-teal-500/10">
                      <h5 className="font-bold text-teal-400 mb-2 text-sm">6. Large Light Objects</h5>
                      <p className="text-xs text-slate-400">Assesses handling of empty cans (gross grasp with light weight)</p>
                    </div>
                    <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/10 md:col-span-2">
                      <h5 className="font-bold text-emerald-400 mb-2 text-sm">7. Large Heavy Objects</h5>
                      <p className="text-xs text-slate-400">Evaluates manipulation of weighted cans (1-pound cans, tests strength and control)</p>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold text-white mt-8 mb-4 flex items-center gap-2 font-['Inter']">
                    <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
                    Clinical Benefits for Children with Autism
                  </h4>
                  <ul className="space-y-3 list-none">
                    <li className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-white">Objective Progress Tracking:</strong>
                        <span className="text-sm text-slate-400 ml-1">Quantifiable time-based scores enable precise measurement of improvement over multiple assessment periods</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50">
                      <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-white">Targeted Intervention Planning:</strong>
                        <span className="text-sm text-slate-400 ml-1">Identifies specific motor deficits requiring occupational therapy focus</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-white">Therapy Effectiveness Validation:</strong>
                        <span className="text-sm text-slate-400 ml-1">Demonstrates measurable outcomes of occupational therapy interventions</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50">
                      <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-white">Goal Setting Framework:</strong>
                        <span className="text-sm text-slate-400 ml-1">Establishes realistic, data-driven milestones for functional skill development</span>
                      </div>
                    </li>
                  </ul>

                  <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 border border-emerald-500/30">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          <strong className="text-emerald-300">Administration Note:</strong> Each subtest is individually timed using a stopwatch. 
                          Results are compared against age-appropriate normative data. The test is non-invasive, requires minimal equipment, 
                          and can be administered in familiar environments to reduce anxiety. Typically completed in 15-20 minutes with 
                          appropriate breaks between subtests.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* YouTube Video */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-5 font-['Inter'] flex items-center gap-2">
                  <div className="w-1 h-8 bg-gradient-to-b from-teal-500 to-emerald-500 rounded-full" />
                  Video Tutorial & Live Demonstration
                </h3>
                <div className="rounded-2xl overflow-hidden border border-emerald-700/30 shadow-2xl">
                  <div className="relative pb-[56.25%] bg-slate-900">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/7tScAyNaRdQ"
                      title="Jebsen-Taylor Hand Function Test Tutorial"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mt-4 font-['Inter'] flex items-center gap-2">
                  <Play className="w-4 h-4 text-emerald-400" />
                  This professional demonstration video shows proper administration techniques, scoring methods, and real examples of children completing each subtest with clinical commentary.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowJebsenModal(false)}
                  className="flex-1 py-4 px-6 rounded-xl bg-slate-700/80 text-white hover:bg-slate-600 transition-all duration-300 font-medium font-['Inter'] border border-slate-600"
                >
                  Close Window
                </button>
                <button
                  className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 font-medium font-['Inter'] shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Begin Assessment Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentDashboard;
