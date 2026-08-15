import { useState } from 'react'
import type { View } from '../App'

interface LearningPathPageProps {
  navigate: (v: View) => void
  career: string
}

const months = [
  {
    month: 'Month 1',
    theme: 'SQL + Statistics',
    color: '#3b82f6',
    done: true,
    topics: ['SQL Joins & Subqueries', 'Window Functions', 'Descriptive Statistics', 'Probability Basics'],
    project: 'Analyze a public dataset with SQL',
    resources: ['Mode SQL Tutorial', 'Khan Academy Stats'],
    hours: 40,
  },
  {
    month: 'Month 2',
    theme: 'Data Analysis',
    color: '#6366f1',
    done: false,
    current: true,
    topics: ['Pandas Mastery', 'Data Cleaning', 'Hypothesis Testing', 'A/B Testing'],
    project: 'Customer churn analysis notebook',
    resources: ["Python for Data Analysis (O'Reilly)", 'DataCamp Pandas'],
    hours: 45,
  },
  {
    month: 'Month 3',
    theme: 'Machine Learning',
    color: '#8b5cf6',
    done: false,
    topics: ['Regression Models', 'Classification', 'Model Evaluation', 'Scikit-learn'],
    project: 'House price prediction model',
    resources: ['Andrew Ng ML Course', 'Hands-On ML (Book)'],
    hours: 60,
  },
  {
    month: 'Month 4',
    theme: 'Projects',
    color: '#a855f7',
    done: false,
    topics: ['End-to-End Pipelines', 'Feature Engineering', 'Model Deployment', 'GitHub Portfolio'],
    project: '2 full ML projects from scratch',
    resources: ['FastAPI docs', 'MLflow tutorial'],
    hours: 55,
  },
  {
    month: 'Month 5',
    theme: 'Advanced ML',
    color: '#c026d3',
    done: false,
    topics: ['Neural Networks', 'Deep Learning', 'Transfer Learning', 'NLP Basics'],
    project: 'Sentiment analysis with transformers',
    resources: ['fast.ai', 'HuggingFace docs'],
    hours: 70,
  },
  {
    month: 'Month 6',
    theme: 'Portfolio + Interview',
    color: '#10b981',
    done: false,
    topics: ['Case Study Prep', 'Technical Interviews', 'Resume & LinkedIn', 'Networking Strategy'],
    project: 'Complete portfolio site + 3 case studies',
    resources: ['Interviewing.io', 'Glassdoor Questions'],
    hours: 40,
  },
]

export default function LearningPathPage({ navigate, career }: LearningPathPageProps) {
  const [expanded, setExpanded] = useState<number>(1)

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', padding: '3rem 0' }}>
      <div className="container-max">
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <button className="btn-ghost" onClick={() => navigate('roadmap')} style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to Roadmap
          </button>

          <p style={{ color: 'var(--text-tertiary)', fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Personalized
          </p>
          <h1 className="text-h1" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Your Learning Path
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 560 }}>
            A personalized sequence based on your career goal and skill gaps. 6 months from now, you'll be career-ready.
          </p>
        </div>

        {/* Progress overview */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
          {months.map((m, i) => (
            <div
              key={i}
              onClick={() => setExpanded(i)}
              style={{
                flexShrink: 0,
                padding: '0.875rem 1rem',
                background: expanded === i ? m.color + '18' : 'var(--bg-surface)',
                border: `1px solid ${expanded === i ? m.color + '60' : 'var(--border)'}`,
                borderRadius: 'var(--radius)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minWidth: 140,
              }}
            >
              <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: m.done ? '#10b981' : m.current ? m.color : 'var(--text-tertiary)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                {m.done ? '✓ DONE' : m.current ? '● CURRENT' : m.month.toUpperCase()}
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{m.theme}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>{m.hours}h</div>
            </div>
          ))}
          <div style={{
            flexShrink: 0,
            padding: '0.875rem 1rem',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            minWidth: 120,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem',
          }}>
            <div style={{ fontSize: '1.25rem' }}>🚀</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981' }}>CAREER READY</div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }} className="learn-layout">
          {/* Timeline */}
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute',
              left: 22,
              top: 0,
              bottom: 0,
              width: 2,
              background: 'linear-gradient(180deg, #3b82f6 16%, #10b981 84%)',
              opacity: 0.2,
            }}/>

            {months.map((month, i) => (
              <div key={i} style={{ position: 'relative', marginBottom: '0.75rem' }}>
                <button
                  onClick={() => setExpanded(expanded === i ? -1 : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    gap: '1.25rem',
                    alignItems: 'flex-start',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: 0,
                  }}
                >
                  {/* Node */}
                  <div style={{
                    width: 44, height: 44,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    position: 'relative',
                    zIndex: 1,
                    background: month.done ? 'var(--gradient-primary)' : month.current ? month.color + '18' : 'var(--bg-surface)',
                    border: month.done ? 'none' : `2px solid ${month.current ? month.color : 'var(--border-strong)'}`,
                    transition: 'all 0.2s ease',
                  }}>
                    {month.done
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      : <span style={{ fontSize: '0.75rem', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: month.current ? month.color : 'var(--text-tertiary)' }}>{i + 1}</span>
                    }
                  </div>

                  {/* Header */}
                  <div style={{
                    flex: 1,
                    background: 'var(--bg-surface)',
                    border: `1px solid ${expanded === i ? month.color + '50' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.125rem 1.25rem',
                    transition: 'all 0.2s ease',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                            {month.month}: {month.theme}
                          </span>
                          {month.current && (
                            <span style={{ fontSize: '0.625rem', fontWeight: 700, color: month.color, background: month.color + '18', padding: '0.15rem 0.5rem', borderRadius: 9999 }}>
                              CURRENT
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>{month.hours} hours · {month.topics.length} topics</div>
                      </div>
                      <svg
                        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ transform: expanded === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', flexShrink: 0 }}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </div>

                    {/* Expanded */}
                    {expanded === i && (
                      <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', animation: 'fade-in-up 0.25s ease' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                          <div>
                            <div style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '0.625rem' }}>Topics</div>
                            {month.topics.map(t => (
                              <div key={t} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.375rem' }}>
                                <div style={{ width: 5, height: 5, borderRadius: '50%', background: month.color, opacity: 0.7, flexShrink: 0 }}/>
                                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{t}</span>
                              </div>
                            ))}
                          </div>
                          <div>
                            <div style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '0.625rem' }}>Resources</div>
                            {month.resources.map(r => (
                              <div key={r} style={{ fontSize: '0.8125rem', color: 'var(--blue)', marginBottom: '0.375rem', fontWeight: 500 }}>
                                → {r}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div style={{ padding: '0.875rem', background: 'var(--bg-elevated)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '1rem' }}>
                          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                            Project
                          </div>
                          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{month.project}</div>
                        </div>

                        {month.current && (
                          <button className="btn-primary" style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}>
                            Start This Month →
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              </div>
            ))}

            {/* Career ready end node */}
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginLeft: 0 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981, #3b82f6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, position: 'relative', zIndex: 1,
                boxShadow: '0 0 16px rgba(16,185,129,0.3)',
              }}>
                🚀
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#10b981' }}>Career Ready</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>Portfolio · Job offers · Your new career</div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ position: 'sticky', top: '84px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1.25rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Path Summary</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Duration', value: '6 months' },
                  { label: 'Total hours', value: '310 hrs' },
                  { label: 'Projects', value: '6 projects' },
                  { label: 'Completion', value: '16%' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>{item.label}</span>
                    <span className="text-mono" style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="btn-primary" onClick={() => navigate('roadmap')} style={{ padding: '0.75rem' }}>
              View Full Roadmap
            </button>
            <button className="btn-secondary" onClick={() => navigate('skill-gap')} style={{ padding: '0.75rem' }}>
              Check Skill Gap
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .learn-layout { grid-template-columns: 1fr !important; }
          .learn-layout > div:last-child { position: static !important; }
        }
      `}</style>
    </div>
  )
}
