import { useState, useEffect } from 'react'
import type { View } from '../App'

interface HomePageProps {
  navigate: (v: View) => void
}

const careers = [
  {
    title: 'Data Scientist',
    match: 94,
    desc: 'Turn raw data into insights, predictions, and intelligent decisions that drive business strategy.',
    skills: ['Python', 'Statistics', 'ML', 'SQL'],
    demand: 'Very High',
    demandColor: '#10b981',
    color: '#3b82f6',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="rgba(59,130,246,0.1)"/>
        <rect x="10" y="30" width="6" height="10" rx="2" fill="#3b82f6" opacity="0.5"/>
        <rect x="19" y="22" width="6" height="18" rx="2" fill="#3b82f6" opacity="0.7"/>
        <rect x="28" y="16" width="6" height="24" rx="2" fill="#3b82f6"/>
        <circle cx="13" cy="18" r="2.5" fill="#8b5cf6"/>
        <circle cx="22" cy="14" r="2.5" fill="#8b5cf6"/>
        <circle cx="31" cy="10" r="2.5" fill="#8b5cf6"/>
        <path d="M13 18 L22 14 L31 10" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    title: 'AI Engineer',
    match: 89,
    desc: 'Build intelligent systems and AI-powered applications that transform industries.',
    skills: ['PyTorch', 'LLMs', 'MLOps', 'APIs'],
    demand: 'Extreme',
    demandColor: '#8b5cf6',
    color: '#8b5cf6',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="rgba(139,92,246,0.1)"/>
        <circle cx="24" cy="24" r="6" fill="#8b5cf6" opacity="0.2"/>
        <circle cx="24" cy="24" r="3" fill="#8b5cf6"/>
        <circle cx="12" cy="17" r="2.5" fill="#8b5cf6" opacity="0.7"/>
        <circle cx="36" cy="17" r="2.5" fill="#8b5cf6" opacity="0.7"/>
        <circle cx="12" cy="31" r="2.5" fill="#3b82f6" opacity="0.7"/>
        <circle cx="36" cy="31" r="2.5" fill="#3b82f6" opacity="0.7"/>
        <circle cx="24" cy="10" r="2.5" fill="#60a5fa" opacity="0.7"/>
        <circle cx="24" cy="38" r="2.5" fill="#60a5fa" opacity="0.7"/>
        <path d="M24 21 L12 17 M24 21 L36 17 M24 21 L12 31 M24 21 L36 31 M24 21 L24 10 M24 21 L24 38" stroke="#8b5cf6" strokeWidth="1" opacity="0.4"/>
      </svg>
    ),
  },
  {
    title: 'ML Engineer',
    match: 82,
    desc: 'Design, train, and deploy machine learning models at production scale.',
    skills: ['TensorFlow', 'Python', 'Cloud', 'Data Pipelines'],
    demand: 'High',
    demandColor: '#3b82f6',
    color: '#06b6d4',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="rgba(6,182,212,0.1)"/>
        <rect x="8" y="20" width="10" height="8" rx="3" fill="#06b6d4" opacity="0.5"/>
        <rect x="24" y="16" width="10" height="16" rx="3" fill="#06b6d4" opacity="0.8"/>
        <rect x="16" y="12" width="6" height="24" rx="3" fill="#06b6d4" opacity="0.3"/>
        <path d="M18 20 L24 22 M14 24 L24 24" stroke="#06b6d4" strokeWidth="1.5" opacity="0.6"/>
        <circle cx="36" cy="24" r="4" fill="none" stroke="#3b82f6" strokeWidth="1.5"/>
        <path d="M34 24 L38 24 M36 22 L36 26" stroke="#3b82f6" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    title: 'Data Analyst',
    match: 78,
    desc: 'Uncover patterns in data to guide strategic business decisions and growth.',
    skills: ['SQL', 'Tableau', 'Excel', 'Python'],
    demand: 'High',
    demandColor: '#3b82f6',
    color: '#f59e0b',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="rgba(245,158,11,0.1)"/>
        <circle cx="24" cy="24" r="12" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.3"/>
        <path d="M24 24 L24 12" stroke="#f59e0b" strokeWidth="2"/>
        <path d="M24 24 L34 30" stroke="#3b82f6" strokeWidth="2"/>
        <path d="M24 24 L13 30" stroke="#8b5cf6" strokeWidth="2"/>
        <circle cx="24" cy="24" r="3" fill="#f59e0b"/>
      </svg>
    ),
  },
  {
    title: 'Software Engineer',
    match: 74,
    desc: 'Build scalable systems and products that millions of people rely on every day.',
    skills: ['React', 'Node.js', 'Python', 'Cloud'],
    demand: 'High',
    demandColor: '#3b82f6',
    color: '#10b981',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="rgba(16,185,129,0.1)"/>
        <path d="M16 20 L10 24 L16 28" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 20 L38 24 L32 28" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M26 16 L22 32" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const steps = [
  { num: '01', label: 'Assess', desc: 'Share your skills, interests, and strengths', color: '#3b82f6' },
  { num: '02', label: 'Analyze', desc: 'AI processes your profile against career data', color: '#6366f1' },
  { num: '03', label: 'Discover', desc: 'Get matched to careers that truly fit you', color: '#8b5cf6' },
  { num: '04', label: 'Build', desc: 'Follow a personalized roadmap and close skill gaps', color: '#a855f7' },
  { num: '05', label: 'Career Ready', desc: 'Land the role you were always meant for', color: '#d946ef' },
]

const flowSteps = [
  { label: 'Assessment', icon: '📋', sub: 'Skills, interests, personality' },
  { label: 'AI Analysis', icon: '🤖', sub: 'Deep pattern matching' },
  { label: 'Career Match', icon: '🎯', sub: '94% confidence score' },
  { label: 'Skill Gap', icon: '📊', sub: 'What you need to learn' },
  { label: 'Roadmap', icon: '🗺️', sub: 'Stage-by-stage journey' },
  { label: 'Learning', icon: '📚', sub: 'Curated resources' },
  { label: 'Career Ready', icon: '🚀', sub: 'Portfolio + interview prep' },
]

function HeroVisualization() {
  const [activeNode, setActiveNode] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActiveNode(n => (n + 1) % 6), 2000)
    return () => clearInterval(timer)
  }, [])

  const nodes = [
    { x: 200, y: 160, label: 'AI Analysis', color: '#3b82f6', size: 38 },
    { x: 330, y: 100, label: 'Career Match', color: '#8b5cf6', size: 34 },
    { x: 360, y: 220, label: 'Skill Gap', color: '#06b6d4', size: 32 },
    { x: 280, y: 310, label: 'Roadmap', color: '#10b981', size: 30 },
    { x: 130, y: 280, label: 'Learning', color: '#f59e0b', size: 30 },
    { x: 100, y: 160, label: 'Insights', color: '#6366f1', size: 28 },
  ]

  const centerX = 230
  const centerY = 200

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 420, margin: '0 auto' }}>
      <svg viewBox="0 0 460 400" style={{ width: '100%', overflow: 'visible' }}>
        <defs>
          <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0"/>
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Background pulse rings */}
        <circle cx={centerX} cy={centerY} r="70" fill="url(#centerGrad)" opacity="0.4">
          <animate attributeName="r" values="60;75;60" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.4;0.2;0.4" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx={centerX} cy={centerY} r="100" fill="none" stroke="var(--blue)" strokeWidth="0.5" opacity="0.15" strokeDasharray="4 4"/>

        {/* Connection lines */}
        {nodes.map((node, i) => (
          <line
            key={i}
            x1={centerX} y1={centerY}
            x2={node.x} y2={node.y}
            stroke={node.color}
            strokeWidth={activeNode === i ? 1.5 : 0.8}
            opacity={activeNode === i ? 0.7 : 0.2}
            strokeDasharray="4 4"
            style={{ transition: 'all 0.5s ease' }}
          />
        ))}

        {/* Outer nodes */}
        {nodes.map((node, i) => (
          <g key={i} style={{ cursor: 'pointer' }} onClick={() => setActiveNode(i)}>
            <circle
              cx={node.x} cy={node.y} r={node.size}
              fill={activeNode === i ? node.color : 'var(--bg-elevated)'}
              stroke={node.color}
              strokeWidth={activeNode === i ? 0 : 1.5}
              opacity={activeNode === i ? 1 : 0.8}
              style={{ transition: 'all 0.5s ease', filter: activeNode === i ? `drop-shadow(0 0 8px ${node.color}80)` : 'none' }}
            />
            <text
              x={node.x} y={node.y + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif"
              fill={activeNode === i ? 'white' : node.color}
              style={{ transition: 'all 0.5s ease', pointerEvents: 'none' }}
            >
              {node.label.split(' ').map((word, wi) => (
                <tspan key={wi} x={node.x} dy={wi === 0 ? (node.label.includes(' ') ? '-4' : '0') : '10'}>{word}</tspan>
              ))}
            </text>
          </g>
        ))}

        {/* Center node */}
        <circle cx={centerX} cy={centerY} r="48" fill="var(--gradient-primary)" style={{ filter: 'drop-shadow(0 0 16px rgba(59,130,246,0.4))' }}>
          <animate attributeName="r" values="46;50;46" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx={centerX} cy={centerY} r="48" fill="url(#centerGrad)"/>
        <defs>
          <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6"/>
            <stop offset="100%" stopColor="#8b5cf6"/>
          </linearGradient>
        </defs>
        <circle cx={centerX} cy={centerY} r="48" fill="url(#btnGrad)"/>

        {/* Student icon */}
        <circle cx={centerX} cy={centerY - 8} r="12" fill="white" opacity="0.9"/>
        <path d={`M${centerX - 18} ${centerY + 20} Q${centerX} ${centerY + 6} ${centerX + 18} ${centerY + 20}`}
          fill="white" opacity="0.9"/>
        <text x={centerX} y={centerY + 34} textAnchor="middle" fontSize="9" fontWeight="700"
          fontFamily="Inter, sans-serif" fill="white" opacity="0.9">YOU</text>

        {/* Match badge */}
        <g style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))' }}>
          <rect x={nodes[1].x - 20} y={nodes[1].y - node1Badge()} width="40" height="18" rx="9"
            fill="#8b5cf6"/>
          <text x={nodes[1].x} y={nodes[1].y - node1Badge() + 12}
            textAnchor="middle" fontSize="9" fontWeight="700"
            fontFamily="JetBrains Mono, monospace" fill="white">
            94%
          </text>
        </g>
      </svg>
    </div>
  )

  function node1Badge() { return 52 }
}

export default function HomePage({ navigate }: HomePageProps) {
  const [hoveredCareer, setHoveredCareer] = useState<number | null>(null)

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '5rem 0 6rem', position: 'relative', overflow: 'hidden' }}>
        {/* Background texture */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 60% 0%, var(--blue-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 10% 80%, var(--violet-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}/>

        <div className="container-max">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
          }} className="hero-grid">
            <div style={{ animation: 'fade-in-up 0.6s ease forwards' }}>
              <div className="tag tag-blue" style={{ marginBottom: '1.5rem' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <circle cx="5" cy="5" r="5"/>
                </svg>
                AI-Powered Career Guidance
              </div>

              <h1 className="text-display" style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                Find the career<br/>
                <span className="gradient-text">that fits you.</span><br/>
                Then build the path.
              </h1>

              <p className="text-body-lg" style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: 480 }}>
                Discover careers matched to your skills, interests and strengths —
                then get a personalized roadmap to become career-ready.
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={() => navigate('assessment')} style={{ padding: '0.75rem 1.75rem', fontSize: '1rem' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  Take Career Assessment
                </button>
                <button className="btn-secondary" onClick={() => navigate('career-explorer')} style={{ padding: '0.75rem 1.75rem', fontSize: '1rem' }}>
                  Explore Careers
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>

              {/* Social proof */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
                <div style={{ display: 'flex' }}>
                  {['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'].map((c, i) => (
                    <div key={i} style={{
                      width: 28, height: 28, borderRadius: '50%', background: c,
                      marginLeft: i > 0 ? -8 : 0,
                      border: '2px solid var(--bg)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.625rem', fontWeight: 700, color: 'white',
                    }}>
                      {['AS', 'MR', 'KL', 'JP'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.875rem' }}>12,400+ students</span>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}> found their career path</span>
                </div>
              </div>
            </div>

            {/* Hero visualization */}
            <div style={{ animation: 'fade-in-up 0.7s 0.15s ease both' }}>
              <HeroVisualization />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          }
        `}</style>
      </section>

      {/* Path to clarity */}
      <section className="section" style={{ background: 'var(--bg-elevated)' }}>
        <div className="container-max">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ color: 'var(--blue)', fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Your Path
            </p>
            <h2 className="text-h1" style={{ color: 'var(--text-primary)' }}>From uncertainty to clarity</h2>
          </div>

          <div style={{ position: 'relative', display: 'flex', gap: 0, overflow: 'hidden' }} className="steps-container">
            {/* Connecting line */}
            <div style={{
              position: 'absolute',
              top: '28px',
              left: '2.5%',
              right: '2.5%',
              height: '2px',
              background: 'linear-gradient(90deg, #3b82f6, #d946ef)',
              opacity: 0.3,
            }} className="steps-line"/>

            {steps.map((step, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '0 1rem',
                  position: 'relative',
                }}
              >
                <div style={{
                  width: 56, height: 56,
                  borderRadius: '50%',
                  background: `${step.color}18`,
                  border: `2px solid ${step.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  <span className="text-mono" style={{ fontWeight: 700, fontSize: '0.875rem', color: step.color }}>
                    {step.num}
                  </span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.375rem' }}>
                  {step.label}
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .steps-container { flex-direction: column !important; gap: 2rem !important; }
            .steps-line { display: none !important; }
          }
        `}</style>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container-max">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '5rem', alignItems: 'center' }} className="works-grid">
            <div>
              <p style={{ color: 'var(--blue)', fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                The System
              </p>
              <h2 className="text-h1" style={{ color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                How CareerPath AI works
              </h2>
              <p className="text-body-lg" style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                A continuous, personalized journey from your first assessment to career-ready status. Every step is connected.
              </p>
              <button className="btn-primary" onClick={() => navigate('assessment')}>
                Start Your Journey
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {flowSteps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', position: 'relative' }}>
                  {/* Connector */}
                  {i < flowSteps.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      left: '22px',
                      top: '44px',
                      bottom: '-8px',
                      width: '2px',
                      background: i < 2 ? 'var(--gradient-primary)' : 'var(--border-strong)',
                      opacity: i < 2 ? 0.6 : 0.4,
                    }}/>
                  )}

                  <div style={{
                    width: 44, height: 44,
                    borderRadius: '50%',
                    background: i < 3 ? 'var(--gradient-primary)' : 'var(--bg-elevated)',
                    border: i < 3 ? 'none' : '2px solid var(--border-strong)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: '1.125rem',
                    position: 'relative',
                    zIndex: 1,
                  }}>
                    {i < 3 ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : step.icon}
                  </div>

                  <div style={{ paddingBottom: '1.5rem' }}>
                    <div style={{ fontWeight: 600, color: i < 3 ? 'var(--text-primary)' : 'var(--text-secondary)', marginBottom: '0.25rem', fontSize: '0.9375rem' }}>
                      {step.label}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
                      {step.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .works-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          }
        `}</style>
      </section>

      {/* Career Explorer Preview */}
      <section className="section" style={{ background: 'var(--bg-elevated)' }}>
        <div className="container-max">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ color: 'var(--blue)', fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Career Possibilities
              </p>
              <h2 className="text-h1" style={{ color: 'var(--text-primary)' }}>Explore where you could go</h2>
            </div>
            <button className="btn-secondary" onClick={() => navigate('career-explorer')}>
              View all careers
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}>
            {careers.map((career, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transform: hoveredCareer === i ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={() => setHoveredCareer(i)}
                onMouseLeave={() => setHoveredCareer(null)}
                onClick={() => navigate('career-detail')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  {career.icon}
                  <div style={{ textAlign: 'right' }}>
                    <div className="text-mono" style={{ fontSize: '1.375rem', fontWeight: 700, color: career.color, lineHeight: 1 }}>
                      {career.match}%
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>MATCH</div>
                  </div>
                </div>

                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {career.title}
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1rem' }}>
                  {career.desc}
                </p>

                <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {career.skills.map(skill => (
                    <span key={skill} style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      padding: '0.2rem 0.5rem',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: career.demandColor }}/>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                      Demand: <span style={{ color: career.demandColor, fontWeight: 600 }}>{career.demand}</span>
                    </span>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>

                {/* Match bar */}
                <div style={{ marginTop: '1rem' }}>
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill"
                      style={{
                        width: `${career.match}%`,
                        background: `linear-gradient(90deg, ${career.color}, ${career.color}99)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section style={{ padding: '3rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container-max">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }} className="stats-grid">
            {[
              { value: '94%', label: 'Assessment Accuracy' },
              { value: '120+', label: 'Career Paths' },
              { value: '12.4K', label: 'Students Matched' },
              { value: '8.2', label: 'Avg. Match Score' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-mono" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 640px) {
            .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '7rem 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, var(--blue-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}/>
        <div className="container-max" style={{ position: 'relative' }}>
          <p style={{ color: 'var(--violet-light)', fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            One decision changes everything
          </p>
          <h2 className="text-display" style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            Your future starts<br/>
            <span className="gradient-text">with one assessment</span>
          </h2>
          <p className="text-body-lg" style={{ color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: 520, margin: '0 auto 3rem' }}>
            Seven focused questions. An AI match in minutes. A roadmap that's yours forever.
          </p>
          <button className="btn-primary" onClick={() => navigate('assessment')} style={{ padding: '0.875rem 2.5rem', fontSize: '1.0625rem' }}>
            Take Career Assessment — Free
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
          <p style={{ marginTop: '1rem', fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
            No account needed · 5 minutes · Instant results
          </p>
        </div>
      </section>
    </div>
  )
}
