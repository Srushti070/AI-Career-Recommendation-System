import { useState } from 'react'
import type { View } from '../App'

interface RoadmapPageProps {
  navigate: (v: View) => void
  career: string
}

const stages = [
  {
    id: 1,
    num: '01',
    label: 'Foundation',
    duration: '3 weeks',
    status: 'completed',
    desc: 'Build the mathematical and computational foundation every data scientist needs.',
    skills: ['Linear Algebra', 'Calculus', 'Python Basics'],
    topics: ['Vectors & matrices', 'Derivatives', 'Python syntax', 'NumPy'],
    project: 'Math toolkit in Python',
    progress: 100,
  },
  {
    id: 2,
    num: '02',
    label: 'Python & SQL',
    duration: '4 weeks',
    status: 'completed',
    desc: 'Master the primary languages for data science work.',
    skills: ['Python', 'Pandas', 'SQL'],
    topics: ['Pandas DataFrames', 'Joins & subqueries', 'Data cleaning', 'Aggregations'],
    project: 'E-commerce data analysis',
    progress: 100,
  },
  {
    id: 3,
    num: '03',
    label: 'Statistics & Data Analysis',
    duration: '4 weeks',
    status: 'current',
    desc: 'Develop the statistical intuition that transforms raw numbers into meaningful insight.',
    skills: ['Statistics', 'Probability', 'Data Analysis'],
    topics: ['Descriptive statistics', 'Probability distributions', 'Hypothesis testing', 'A/B testing'],
    project: 'Student Performance Analyzer',
    progress: 40,
  },
  {
    id: 4,
    num: '04',
    label: 'Machine Learning',
    duration: '6 weeks',
    status: 'pending',
    desc: 'Build predictive models and understand the algorithms behind modern AI.',
    skills: ['Scikit-learn', 'Regression', 'Classification'],
    topics: ['Linear & logistic regression', 'Decision trees', 'Ensemble methods', 'Model evaluation'],
    project: 'Salary Prediction Model',
    progress: 0,
  },
  {
    id: 5,
    num: '05',
    label: 'Advanced ML',
    duration: '5 weeks',
    status: 'pending',
    desc: 'Neural networks, deep learning, and cutting-edge techniques.',
    skills: ['TensorFlow', 'Neural Nets', 'NLP'],
    topics: ['Deep learning fundamentals', 'CNNs & RNNs', 'Transfer learning', 'Transformers'],
    project: 'Sentiment Analysis System',
    progress: 0,
  },
  {
    id: 6,
    num: '06',
    label: 'Projects & Portfolio',
    duration: '4 weeks',
    status: 'pending',
    desc: 'Build 3 end-to-end projects that showcase your skills to employers.',
    skills: ['Project Design', 'GitHub', 'Storytelling'],
    topics: ['End-to-end pipelines', 'README writing', 'Data storytelling', 'GitHub portfolio'],
    project: 'Capstone Project',
    progress: 0,
  },
  {
    id: 7,
    num: '07',
    label: 'Career Ready',
    duration: '3 weeks',
    status: 'pending',
    desc: 'Interview prep, resume building, and job application strategy.',
    skills: ['Interview Prep', 'Resume', 'Networking'],
    topics: ['Technical interviews', 'Case studies', 'Resume writing', 'LinkedIn optimization'],
    project: 'Mock Interview Series',
    progress: 0,
  },
]

const stageIllustrations = [
  null, null,
  (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" strokeWidth="1.5"/>
      <rect x="18" y="36" width="6" height="14" rx="2" fill="#3b82f6" opacity="0.4"/>
      <rect x="26" y="28" width="6" height="22" rx="2" fill="#3b82f6" opacity="0.65"/>
      <rect x="34" y="20" width="6" height="30" rx="2" fill="#3b82f6"/>
      <path d="M20 30 L28 24 L36 18" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="20" cy="30" r="2.5" fill="#8b5cf6"/>
      <circle cx="28" cy="24" r="2.5" fill="#8b5cf6"/>
      <circle cx="36" cy="18" r="2.5" fill="#8b5cf6"/>
    </svg>
  ),
  null, null, null, null,
]

export default function RoadmapPage({ navigate, career }: RoadmapPageProps) {
  const [expandedStage, setExpandedStage] = useState<number>(3)
  const completedStages = stages.filter(s => s.status === 'completed').length
  const totalProgress = Math.round((completedStages / stages.length) * 100 + (stages.find(s => s.status === 'current')?.progress || 0) / stages.length)

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', padding: '3rem 0' }}>
      <div className="container-max">
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <button
            className="btn-ghost"
            onClick={() => navigate('results')}
            style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to Results
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <p style={{ color: 'var(--text-tertiary)', fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Career Roadmap
              </p>
              <h1 className="text-h1" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {career} Roadmap
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                Your path from foundation to career-ready.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ textAlign: 'right' }}>
                <div className="text-mono" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
                  {totalProgress}%
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Complete</div>
              </div>
              <div style={{ width: 72, height: 72, position: 'relative' }}>
                <svg width="72" height="72" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="36" cy="36" r="30" fill="none" stroke="var(--border-strong)" strokeWidth="5"/>
                  <circle cx="36" cy="36" r="30" fill="none" stroke="url(#roadmapGrad)" strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 30}`}
                    strokeDashoffset={`${2 * Math.PI * 30 * (1 - totalProgress / 100)}`}
                    style={{ transition: 'stroke-dashoffset 1s ease' }}
                  />
                  <defs>
                    <linearGradient id="roadmapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6"/>
                      <stop offset="100%" stopColor="#8b5cf6"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '2rem' }} className="roadmap-layout">
          {/* Mini timeline sidebar */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'sticky', top: '84px' }}>
              <div style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Your Journey
              </div>
              {stages.map((stage, i) => (
                <div
                  key={stage.id}
                  style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', marginBottom: '0.375rem', cursor: 'pointer', position: 'relative' }}
                  onClick={() => setExpandedStage(stage.id)}
                >
                  {i < stages.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      left: 13,
                      top: 27,
                      width: 2,
                      height: 'calc(100% + 0.375rem)',
                      background: stage.status === 'completed' ? 'var(--blue)' : 'var(--border-strong)',
                      opacity: stage.status === 'completed' ? 0.5 : 0.3,
                    }}/>
                  )}
                  <div className="timeline-node" style={{
                    width: 28, height: 28,
                    fontSize: '0.75rem',
                    background: stage.status === 'completed' ? 'var(--gradient-primary)' : stage.status === 'current' ? 'var(--blue-glow)' : 'var(--bg-elevated)',
                    border: stage.status === 'current' ? '2px solid var(--blue)' : stage.status === 'completed' ? 'none' : '2px solid var(--border-strong)',
                    color: stage.status === 'completed' ? 'white' : stage.status === 'current' ? 'var(--blue)' : 'var(--text-tertiary)',
                  }}>
                    {stage.status === 'completed'
                      ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      : stage.status === 'current'
                      ? <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--blue)', display: 'block' }}/>
                      : <span className="text-mono" style={{ fontSize: '0.6rem', fontWeight: 700 }}>{stage.num}</span>
                    }
                  </div>
                  <div style={{ paddingBottom: '1rem' }}>
                    <div style={{
                      fontSize: '0.8125rem',
                      fontWeight: expandedStage === stage.id ? 600 : 500,
                      color: expandedStage === stage.id ? 'var(--blue)' : stage.status === 'pending' ? 'var(--text-tertiary)' : 'var(--text-primary)',
                      lineHeight: 1.3,
                    }}>
                      {stage.label}
                    </div>
                    {stage.status === 'current' && (
                      <div style={{ fontSize: '0.625rem', color: 'var(--blue)', fontWeight: 600, marginTop: '0.125rem' }}>YOU ARE HERE</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stage detail */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {stages.map(stage => {
              const isExpanded = expandedStage === stage.id
              const illustration = stageIllustrations[stage.id - 1]

              return (
                <div
                  key={stage.id}
                  style={{
                    background: 'var(--bg-surface)',
                    border: `1px solid ${isExpanded ? 'var(--blue)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    transition: 'all 0.25s ease',
                    boxShadow: isExpanded ? '0 0 0 3px var(--blue-glow)' : 'none',
                  }}
                >
                  {/* Stage header */}
                  <button
                    onClick={() => setExpandedStage(isExpanded ? 0 : stage.id)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: stage.status === 'completed' ? 'var(--gradient-primary)' : stage.status === 'current' ? 'var(--blue-glow)' : 'var(--bg-elevated)',
                      border: stage.status === 'current' ? '2px solid var(--blue)' : stage.status === 'completed' ? 'none' : '2px solid var(--border-strong)',
                    }}>
                      {stage.status === 'completed'
                        ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        : stage.status === 'current'
                        ? <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--blue)', display: 'block' }}/>
                        : <span className="text-mono" style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-tertiary)' }}>{stage.num}</span>
                      }
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{stage.label}</span>
                        {stage.status === 'current' && (
                          <span style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--blue)', background: 'var(--blue-glow)', padding: '0.15rem 0.5rem', borderRadius: 9999, letterSpacing: '0.05em' }}>
                            CURRENT
                          </span>
                        )}
                        {stage.status === 'completed' && (
                          <span style={{ fontSize: '0.625rem', fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '0.15rem 0.5rem', borderRadius: 9999 }}>
                            COMPLETED
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>{stage.duration}</div>
                    </div>

                    {stage.status !== 'pending' && (
                      <div style={{ width: 80 }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.25rem' }}>
                          <span className="text-mono" style={{ fontSize: '0.75rem', fontWeight: 600, color: stage.progress === 100 ? '#10b981' : 'var(--blue)' }}>
                            {stage.progress}%
                          </span>
                        </div>
                        <div className="skill-bar-track">
                          <div className="skill-bar-fill" style={{ width: `${stage.progress}%` }}/>
                        </div>
                      </div>
                    )}

                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s ease', flexShrink: 0 }}
                    >
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div style={{ padding: '0 1.5rem 1.5rem', borderTop: '1px solid var(--border)', animation: 'fade-in-up 0.25s ease' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: illustration ? '1fr auto' : '1fr', gap: '1.5rem', paddingTop: '1.25rem' }}>
                        <div>
                          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                            {stage.desc}
                          </p>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                            <div>
                              <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.625rem' }}>
                                Skills
                              </div>
                              <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                                {stage.skills.map(s => (
                                  <span key={s} className="tag tag-blue" style={{ fontSize: '0.6875rem' }}>{s}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.625rem' }}>
                                Key Topics
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                {stage.topics.map(t => (
                                  <div key={t} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--blue)', opacity: 0.6 }}/>
                                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{t}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div style={{ padding: '0.875rem', background: 'var(--bg-elevated)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', marginBottom: '1.25rem' }}>
                            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.375rem' }}>
                              Project
                            </div>
                            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{stage.project}</div>
                          </div>

                          {stage.status !== 'pending' && (
                            <button
                              className="btn-primary"
                              onClick={() => navigate('learning-path')}
                              style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}
                            >
                              {stage.status === 'current' ? 'Continue Stage →' : 'Review Stage'}
                            </button>
                          )}
                        </div>

                        {illustration && (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.85 }}>
                            {illustration}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .roadmap-layout { grid-template-columns: 1fr !important; }
          .roadmap-layout > div:first-child { display: none; }
        }
      `}</style>
    </div>
  )
}
