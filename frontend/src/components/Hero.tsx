import { useEffect, useRef } from 'react'
import { ArrowRight, Brain, Shield, Sparkles, AlertCircle, Target, Zap, Users, TrendingUp, Layers, Activity } from 'lucide-react'
import gsap from 'gsap'
import SplitType from 'split-type'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const featureCardsRef = useRef<HTMLDivElement>(null)

  const handleGetStarted = () => {
    // Placeholder for authentication logic
    console.log('Get Started clicked');
    alert('Authentication functionality to be implemented');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.2,
      })

      // Animate subtitle
      gsap.from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5,
      })

      // Animate CTA buttons
      gsap.from(ctaRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.8,
      })

      gsap.to(ctaRef.current?.children || [], {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.8,
        })

      // Animate feature cards
      gsap.from(featureCardsRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 1.1,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div id="hero" ref={heroRef} className="relative flex items-center justify-center overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary-950/10" />
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
            {/* Left Section - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-primary-400" />
                <span className="text-sm text-primary-300 font-medium">
                  AI-Powered Autism Care Platform
                </span>
              </div>

              {/* Main Title */}
              <h1
                ref={titleRef}
                className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-tight"
              >
                Empowering Parents,
                <br />
                <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                  Supporting Children
                </span>
              </h1>

              {/* Description */}
              <p
                ref={subtitleRef}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed"
              >
                EchoMind is an intelligent support platform designed exclusively for parents
                of autistic children. Understand behavior, automate insights, and simplify
                daily care routines with AI-powered tools.
              </p>

              {/* CTA Buttons */}
              <div ref={ctaRef} className="flex flex-col sm:flex-row items-start gap-4 pt-4">
                <button 
                  onClick={handleGetStarted}
                  className="group relative px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 group-hover:opacity-100 transition-opacity" />
                </button>

                <button className="px-8 py-4 border border-border hover:border-primary-500/50 rounded-xl font-medium transition-all duration-300 hover:bg-primary-500/5">
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Right Section - Image Placeholder */}
            <div ref={featureCardsRef} className="relative">
              <div className="relative aspect-square lg:aspect-[4/5] rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-600/5 border border-primary-500/20 backdrop-blur-sm overflow-hidden">
                {/* Placeholder content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-24 h-24 mx-auto rounded-2xl bg-primary-500/20 flex items-center justify-center">
                      <Brain className="w-12 h-12 text-primary-400" />
                    </div>
                    <p className="text-muted-foreground text-sm">Image Placeholder</p>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-primary-500/10 blur-2xl" />
                <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-primary-600/10 blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}

// Problem Section Component
const ProblemSection = () => {
  const descriptionRef = useRef<HTMLParagraphElement>(null) 
const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!descriptionRef.current) return

    // Split the text into words
    const split = new SplitType(descriptionRef.current, { 
      types: 'words',
      wordClass: 'split-word'
    })

    // Set initial state - words are invisible
    gsap.set(split.words, {
      opacity: 0.2,
      filter: 'blur(8px)',
      willChange: 'opacity, filter'
    })

    // Animate words on scroll - tied to scroll position
    gsap.to(split.words, {
      opacity: 1,
      filter: 'blur(0px)',
      stagger: 0.05,
      ease: 'none',
      scrollTrigger: {
        trigger: descriptionRef.current,
        start: 'top 75%',
        end: 'bottom 25%',
        scrub: 1,
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      split.revert()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section id="problem" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 backdrop-blur-sm mb-6">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <span className="text-sm text-destructive font-medium">
                The Challenge
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
              The Problem We're{' '}
              <span className="bg-gradient-to-r from-destructive to-destructive/60 bg-clip-text">
                Solving
              </span>
            </h2>
          </div>

          {/* Problem Description Card */}
          <div className="relative">
            <div className="relative p-8 md:p-12 rounded-2xl bg-card/30 backdrop-blur-sm transition-all duration-500">
              {/* Decorative corner accent */}
              <div className="absolute top-0 left-0 w-20 h-20 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 rounded-br-2xl" />
              
              <p 
                ref={descriptionRef}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center"
              >
                Autism Spectrum Disorder (ASD) affects approximately 1 in 100 children worldwide, with 30–40% being non-verbal or minimally verbal and reliant on alternative communication methods. While clinical therapies exist, most autism care happens at home, where parents spend 15–25 hours per week managing communication, behavior, routines, and therapy activities.<br /><br />
Parents face ongoing challenges in interpreting non-verbal cues, coordinating multiple parallel therapies, adapting AAC strategies as children develop, and tracking behavioral progress over time. Existing AAC and therapy tools are largely child-focused and fragmented, providing limited support for parent-side decision-making.<br /><br />
Critically, over 60% of care-related decisions are made without continuous professional supervision, creating a gap between structured therapy sessions and real-world daily care, leading to manual tracking, inconsistent personalization, and reduced effectiveness of developmental support.
                <span className="text-foreground font-semibold">manual effort</span>,{' '}
                <span className="text-foreground font-semibold">inconsistent feedback</span>, and{' '}
                <span className="text-foreground font-semibold">reduced effectiveness</span>{' '}
                in daily autism care.
              </p>
            </div>

            {/* Decorative blur effects */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-destructive/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-destructive/5 rounded-full blur-3xl" />
            </div>
            </div>
      </div>
    </section>
  )
}

// Solution Section Component
const SolutionSection = () => {
  return (
    <section id="solution" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background to-primary-950/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 backdrop-blur-sm mb-6">
              <Target className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-primary-300 font-medium">Our Solution</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
              Introducing{' '}
              <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                EchoMind
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A unified AI-powered platform that connects parent control with child engagement,
              providing personalized care management and continuous progress tracking.
            </p>
          </div>

          {/* Dual Interface Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Parent Dashboard Card */}
            <div className="group relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/20 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer overflow-hidden">
              {/* Animated gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-600/0 group-hover:from-primary-500/10 group-hover:to-primary-600/5 transition-all duration-500 rounded-2xl" />
              
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary-500/50">
                  <Users className="w-8 h-8 text-primary-400 group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary-400 transition-colors duration-300">Parent Dashboard</h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  The control center for comprehensive care management and AI-driven insights.
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 group/item">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform">
                      <div className="w-2 h-2 rounded-full bg-primary-400" />
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:translate-x-1 transition-transform duration-300">Real-time progress tracking and analytics</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform">
                      <div className="w-2 h-2 rounded-full bg-primary-400" />
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:translate-x-1 transition-transform duration-300">AI-generated care recommendations</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform">
                      <div className="w-2 h-2 rounded-full bg-primary-400" />
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:translate-x-1 transition-transform duration-300">Activity scheduling and monitoring</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <div className="w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform">
                      <div className="w-2 h-2 rounded-full bg-primary-400" />
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:translate-x-1 transition-transform duration-300">Behavioral trend analysis</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Child Interface Card */}
            <div className="group relative p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-secondary-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary-500/20 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer overflow-hidden">
              {/* Animated gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/0 to-secondary-600/0 group-hover:from-secondary-500/10 group-hover:to-secondary-600/5 transition-all duration-500 rounded-2xl" />
              
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-500/20 to-secondary-600/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-secondary-500/50">
                  <Sparkles className="w-8 h-8 text-secondary-400 group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-secondary-400 transition-colors duration-300">Child Interface</h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  Secure, adaptive environment with guided activities and exercises.
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 group/item">
                    <div className="w-5 h-5 rounded-full bg-secondary-500/20 flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform">
                      <div className="w-2 h-2 rounded-full bg-secondary-400" />
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:translate-x-1 transition-transform duration-300">Child-lock secure mode</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <div className="w-5 h-5 rounded-full bg-secondary-500/20 flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform">
                      <div className="w-2 h-2 rounded-full bg-secondary-400" />
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:translate-x-1 transition-transform duration-300">Interactive cognitive tests</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <div className="w-5 h-5 rounded-full bg-secondary-500/20 flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform">
                      <div className="w-2 h-2 rounded-full bg-secondary-400" />
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:translate-x-1 transition-transform duration-300">Speech and communication exercises</span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <div className="w-5 h-5 rounded-full bg-secondary-500/20 flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform">
                      <div className="w-2 h-2 rounded-full bg-secondary-400" />
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:translate-x-1 transition-transform duration-300">AI-adaptive difficulty levels</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Advanced machine learning algorithms analyze behavioral patterns and provide personalized care recommendations.',
      color: 'primary'
    },
    {
      icon: Activity,
      title: 'Real-Time Monitoring',
      description: 'Track activity completion, engagement levels, and performance metrics in real-time across all exercises.',
      color: 'secondary'
    },
    {
      icon: TrendingUp,
      title: 'Progress Analytics',
      description: 'Comprehensive dashboards showing developmental progress, skill acquisition, and behavioral trends over time.',
      color: 'accent'
    },
    {
      icon: Layers,
      title: 'Adaptive AAC Tools',
      description: 'Communication tools that evolve with your child\'s development and personalize to their unique needs.',
      color: 'primary'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Enterprise-grade security with child-lock features and complete parental control over all activities.',
      color: 'secondary'
    },
    {
      icon: Zap,
      title: 'Automated Workflows',
      description: 'Intelligent scheduling and reminders that adapt to daily routines and therapy requirements.',
      color: 'accent'
    }
  ]

  return (
    <section id="features" className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
              Powerful Features for{' '}
              <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Complete Care
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need to manage autism care effectively, all in one intelligent platform.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-card/30 backdrop-blur-sm border border-border hover:border-primary-500/30 transition-all duration-500 hover:translate-y-[-4px]"
              >
                <div className={`w-14 h-14 rounded-xl bg-${feature.color}-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}-400`} />
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Impact Section Component
const ImpactSection = () => {
  const stats = [
    { value: '1 in 100', label: 'Children Affected by ASD', icon: Users },
    { value: '30-40%', label: 'Non-verbal Cases', icon: Activity },
    { value: '15-25h', label: 'Weekly Care Hours', icon: TrendingUp },
    { value: '60%+', label: 'Decisions Without Supervision', icon: AlertCircle }
  ]

  return (
    <section id="impact" className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-primary-950/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
              Making a Real{' '}
              <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Impact
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              EchoMind addresses the critical gap in home-based autism care, empowering parents
              with professional-grade tools and AI-driven insights.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border text-center"
              >
                <stat.icon className="w-8 h-8 text-primary-400 mx-auto mb-4" />
                <div className="text-3xl md:text-4xl font-bold text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Benefits Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border">
              <h3 className="text-lg font-semibold mb-3">For Parents</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Reduce manual tracking effort, gain confidence in care decisions, and maintain
                continuous therapy progress between professional sessions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border">
              <h3 className="text-lg font-semibold mb-3">For Children</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Consistent, personalized support that adapts to their development, improving
                communication skills and daily routine management.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border">
              <h3 className="text-lg font-semibold mb-3">For Healthcare</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Better data for professionals, improved therapy outcomes, and continuous
                monitoring that extends clinical care into the home environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
export { ProblemSection, SolutionSection, FeaturesSection, ImpactSection }
