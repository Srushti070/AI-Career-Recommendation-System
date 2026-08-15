import { useState } from 'react'
import type { View } from '../App'

interface CareerDetailPageProps {
  navigate: (v: View) => void
  career: string
}

const requiredSkills = [
  { name: 'Python', level: 90, yours: 80 },
  { name: 'Statistics', level: 80, yours: 40 },
  { name: 'SQL', level: 85, yours: 60 },
  { name: 'Machine Learning', level: 75, yours: 30 },
  { name: 'Data Visualization', level: 70, yours: 55 },
  { name: 'Communication', level: 70, yours: 65 },
]

const whatYoullDo = [
  'Design and implement predictive models that drive business decisions',
  'Analyze large datasets to uncover trends, patterns, and anomalies',
  'Collaborate with engineering teams to deploy models to production',
  'Communicate findings clearly to non-technical stakeholders',
  'Build automated pipelines for data collection and feature engineering',
]

export default function CareerDetailPage({ navigate, career }: CareerDetailPageProps) {
  const [activeSection, setActiveSection] = useState('why-fits')

  const sections = [
    { id: 'why-fits', label: 'Why This Fits You' },
    { id: 'what-youll-do', label: "What You'll Do" },
    { id: 'skills', label: 'Required Skills' },
    { id: 'skill-gap', label: 'Skill Gap Preview' },
  ]

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)' }}>
      {/* Hero */}
      <div style={{
        padding: '3rem 0',
        background: 'linear-gradient(180deg, var(--bg-elevated) 0%, var(--bg) 100%)',
        borderBottom: '1px solid var(--border)',
        marginBottom: '3rem',
      }}>
        <div className="container-max">
          <button className="btn-ghost" onClick={() => navigate('career-explorer')} style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Career Explorer
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'start' }} className="detail-hero">
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span className="tag tag-blue">Data & AI</span>
                <span className="tag tag-green">High Demand</span>
                <span className="tag tag-violet">94% Match</span>
              </div>
              <h1 className="text-display" style={{ color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                {career}
              </h1>
              <p className="text-body-lg" style={{ color: 'var(--text-secondary)', maxWidth: 560, marginBottom: '1.5rem' }}>
                Turn data into insights, predictions, and intelligent decisions that shape business strategy and drive real-world impact.
              </p>

              {/* Quick stats */}
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'Avg Salary', value: '$95K–$145K', color: '#10b981' },
                  { label: 'Job Demand', value: 'Very High', color: '#3b82f6' },
                  { label: '5-yr Growth', value: '+32%', color: '#8b5cf6' },
                  { label: 'Difficulty', value: 'Medium-High', color: '#f59e0b' },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="text-mono" style={{ fontWeight: 700, fontSize: '1.125rem', color: stat.color }}>{stat.value}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Career visual */}
            <div style={{ width: 200, height: 200, flexShrink: 0 }}>
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="95" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.15)" strokeWidth="1.5"/>
                <circle cx="100" cy="100" r="70" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.1)" strokeWidth="1" strokeDasharray="4 4"/>

                {/* Data viz elements */}
                <rect x="50" y="110" width="12" height="40" rx="3" fill="#3b82f6" opacity="0.4"/>
                <rect x="68" y="90" width="12" height="60" rx="3" fill="#3b82f6" opacity="0.65"/>
                <rect x="86" y="70" width="12" height="80" rx="3" fill="#3b82f6" opacity="0.85"/>
                <rect x="104" y="80" width="12" height="70" rx="3" fill="#8b5cf6" opacity="0.7"/>
                <rect x="122" y="100" width="12" height="50" rx="3" fill="#8b5cf6" opacity="0.5"/>

                {/* Trend line */}
                <path d="M56 115 L74 95 L92 75 L110 85 L128 105" stroke="url(#detailGrad)" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="56" cy="115" r="3" fill="#3b82f6"/>
                <circle cx="92" cy="75" r="3.5" fill="#3b82f6"/>
                <circle cx="128" cy="105" r="3" fill="#8b5cf6"/>

                <defs>
                  <linearGradient id="detailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6"/>
                    <stop offset="100%" stopColor="#8b5cf6"/>
                  </linearGradient>
                </defs>

                <text x="100" y="46" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono, monospace" fill="#3b82f6">DATA</text>
                <text x="100" y="170" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono, monospace" fill="#8b5cf6">INSIGHTS</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="container-max">
        {/* Section tabs */}
        <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-elevated)', borderRadius: 'var(--radius)', padding: '0.25rem', marginBottom: '2rem', overflowX: 'auto' }}>
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: activeSection === s.id ? 'var(--bg-surface)' : 'transparent',
                color: activeSection === s.id ? 'var(--text-primary)' : 'var(--text-tertiary)',
                fontWeight: activeSection === s.id ? 600 : 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                boxShadow: activeSection === s.id ? 'var(--shadow-sm)' : 'none',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Section content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start', marginBottom: '3rem' }} className="detail-content">
          <div style={{ animation: 'fade-in-up 0.3s ease' }} key={activeSection}>
            {activeSection === 'why-fits' && (
              <div>
                <h2 className="text-h2" style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Why This Career Fits You</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { factor: 'Strengths Alignment', score: 92, desc: 'Your analytical thinking and problem decomposition match the core demands of this role.' },
                    { factor: 'Interest Match', score: 88, desc: 'Your stated interest in working with data and extracting insights aligns strongly.' },
                    { factor: 'Skills Foundation', score: 76, desc: 'Your Python proficiency gives you a solid base to build on.' },
                    { factor: 'Career Goals', score: 85, desc: "Your desire for continuous learning fits Data Science's rapidly evolving landscape." },
                  ].map(f => (
                    <div key={f.factor} style={{ padding: '1.25rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{f.factor}</span>
                        <span className="text-mono" style={{ fontWeight: 700, color: 'var(--blue)', fontSize: '0.9375rem' }}>{f.score}%</span>
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.55 }}>{f.desc}</p>
                      <div className="skill-bar-track">
                        <div className="skill-bar-fill" style={{ width: `${f.score}%` }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'what-youll-do' && (
              <div>
                <h2 className="text-h2" style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>What You'll Do</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {whatYoullDo.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                      <span className="text-mono" style={{ color: 'var(--blue)', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0, paddingTop: '0.125rem' }}>0{i + 1}</span>
                      <span style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', lineHeight: 1.55 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'skills' && (
              <div>
                <h2 className="text-h2" style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Required Skills</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {requiredSkills.map(s => (
                    <div key={s.name} style={{ padding: '1.125rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>{s.name}</span>
                        <span className="text-mono" style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>Required: {s.level}%</span>
                      </div>
                      <div className="skill-bar-track">
                        <div className="skill-bar-fill" style={{ width: `${s.level}%`, background: 'var(--bg-subtle)' }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'skill-gap' && (
              <div>
                <h2 className="text-h2" style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Your Skill Gap Preview</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {requiredSkills.map(s => {
                    const gap = s.level - s.yours
                    return (
                      <div key={s.name} style={{ padding: '1.125rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>{s.name}</span>
                          <span className="text-mono" style={{ fontSize: '0.8125rem', color: gap > 20 ? '#ef4444' : gap > 0 ? '#f59e0b' : '#10b981', fontWeight: 700 }}>
                            {gap > 0 ? `+${gap}% needed` : 'Ready'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ height: 6, borderRadius: 9999, background: 'var(--bg-subtle)', position: 'relative', overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${s.yours}%`, background: 'var(--gradient-primary)', borderRadius: 9999 }}/>
                            </div>
                          </div>
                          <span className="text-mono" style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', minWidth: 60, textAlign: 'right' }}>
                            {s.yours}% / {s.level}%
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <button className="btn-primary" onClick={() => navigate('skill-gap')} style={{ marginTop: '1.25rem' }}>
                  Full Skill Gap Analysis →
                </button>
              </div>
            )}
          </div>

          {/* Sidebar actions */}
          <div style={{ position: 'sticky', top: '84px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button className="btn-primary" onClick={() => navigate('roadmap')} style={{ padding: '0.75rem' }}>
              View Roadmap
            </button>
            <button className="btn-secondary" onClick={() => navigate('skill-gap')} style={{ padding: '0.75rem' }}>
              Analyze Skill Gap
            </button>
            <button className="btn-secondary" onClick={() => navigate('learning-path')} style={{ padding: '0.75rem' }}>
              Start Learning
            </button>
            <button className="btn-ghost" onClick={() => navigate('career-plan')} style={{ padding: '0.75rem', borderColor: 'var(--border)' }}>
              Add to My Plan
            </button>

            <div style={{ marginTop: '0.5rem', padding: '1.25rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Tools & Technologies</div>
              <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                {['Python', 'scikit-learn', 'TensorFlow', 'SQL', 'Jupyter', 'Tableau', 'Spark', 'AWS'].map(t => (
                  <span key={t} style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.6875rem', fontWeight: 600,
                    padding: '0.2rem 0.5rem',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: 4,
                    color: 'var(--text-secondary)',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .detail-hero { grid-template-columns: 1fr !important; }
          .detail-hero > div:last-child { display: none; }
          .detail-content { grid-template-columns: 1fr !important; }
          .detail-content > div:last-child { position: static !important; }
        }
      `}</style>
    </div>
  )
}
