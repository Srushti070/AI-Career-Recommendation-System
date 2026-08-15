import { useState, useEffect } from 'react'
import type { View } from '../App'
import api from '../api/client'

interface AIResultsPageProps {
  navigate: (v: View) => void
  career: string
  result?: any
}

// Fallbacks
const fallbackSkillProfile = [
  { name: 'Python', current: 80, color: '#3b82f6' },
  { name: 'SQL', current: 60, color: '#8b5cf6' },
  { name: 'Statistics', current: 40, color: '#06b6d4' },
  { name: 'Machine Learning', current: 30, color: '#10b981' },
  { name: 'Data Visualization', current: 55, color: '#f59e0b' },
]

const strengths = [
  { label: 'Analytical Thinking', icon: '🧠', desc: 'Strong pattern recognition and problem decomposition' },
  { label: 'Technical Aptitude', icon: '⚙️', desc: 'Comfort with code and quantitative methods' },
  { label: 'Data Curiosity', icon: '🔍', desc: 'Natural drive to explore and question data' },
]

const nextSteps = [
  { step: '01', action: 'Strengthen Statistics fundamentals', priority: 'High', color: '#ef4444' },
  { step: '02', action: 'Complete advanced SQL joins & window functions', priority: 'High', color: '#f59e0b' },
  { step: '03', action: 'Start Machine Learning with scikit-learn', priority: 'Medium', color: '#3b82f6' },
]

function MatchRing({ percentage, animated }: { percentage: number; animated: boolean }) {
  const r = 70
  const circ = 2 * Math.PI * r
  const offset = circ - (animated ? percentage / 100 * circ : circ)

  return (
    <div style={{ position: 'relative', width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="180" height="180" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
        <circle cx="90" cy="90" r={r} fill="none" stroke="var(--border-strong)" strokeWidth="8"/>
        <circle
          cx="90" cy="90" r={r}
          fill="none"
          stroke="url(#matchGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={animated ? offset : circ}
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
        <defs>
          <linearGradient id="matchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6"/>
            <stop offset="100%" stopColor="#8b5cf6"/>
          </linearGradient>
        </defs>
      </svg>
      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <div className="text-mono" style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
          {animated ? percentage : 0}%
        </div>
        <div style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-tertiary)', marginTop: '0.25rem' }}>
          MATCH
        </div>
      </div>
    </div>
  )
}

export default function AIResultsPage({ navigate, career, result: initialResult }: AIResultsPageProps) {
  const [animated, setAnimated] = useState(false)
  const [activeTab, setActiveTab] = useState('strengths')
  const [result, setResult] = useState<any>(initialResult)
  const [loading, setLoading] = useState(!initialResult)
  const [error, setError] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!initialResult) {
      const fetchLatest = async () => {
        try {
          const res = await api.get('/api/assessment/latest', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setResult(res.data);
        } catch (err: any) {
          setError('Could not load your latest assessment. Please take a new one.');
        } finally {
          setLoading(false);
        }
      }
      fetchLatest();
    }
  }, [initialResult]);
  
  if (loading) {
    return <div style={{ minHeight: 'calc(100vh - 64px)', padding: '3rem 0', textAlign: 'center', color: 'var(--text-primary)' }}>Loading your career match...</div>
  }

  if (error || !result) {
    return (
      <div style={{ minHeight: 'calc(100vh - 64px)', padding: '3rem 0', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--text-primary)' }}>No Assessment Found</h2>
        <p style={{ color: 'var(--text-secondary)' }}>{error}</p>
        <button onClick={() => navigate('assessment')} className="btn-primary" style={{ marginTop: '1rem' }}>Take Assessment</button>
      </div>
    )
  }

  const displayCareer = result?.career || career;
  const matchScore = result?.match_score ? Math.round(result.match_score) : 94;
  const salaryRange = result?.salary_range || '$95K';
  const futureScope = result?.future_scope || 'High';
  const description = result?.description || 'Turn data into insights, predictions and intelligent decisions that drive real-world impact.';
  
  const dynamicStrengths = result?.strengths ? result.strengths.map((s: string) => ({
      label: s.replace('_', ' '),
      icon: '✨',
      desc: `Strong foundation in ${s.replace('_', ' ')}`
  })) : strengths;

  const dynamicSkillGaps = result?.skill_gaps ? result.skill_gaps.map((s: string, i: number) => ({
      step: `0${i+1}`,
      action: `Improve your skills in ${s.replace('_', ' ')}`,
      priority: i === 0 ? 'High' : 'Medium',
      color: i === 0 ? '#ef4444' : '#3b82f6'
  })) : nextSteps;

  const dynamicSkills = result?.strengths ? result.strengths.map((s: string, i: number) => ({
      name: s.replace('_', ' '),
      current: 80 - (i * 10),
      color: i % 2 === 0 ? '#3b82f6' : '#8b5cf6'
  })) : fallbackSkillProfile;


  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', padding: '3rem 0' }}>
      <div className="container-max">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="tag tag-blue" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="5"/></svg>
            AI Career Match · Confidence: Very High
          </div>
          <p style={{ color: 'var(--text-tertiary)', fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Your AI Career Match
          </p>
          <h1 className="text-display" style={{ color: 'var(--text-primary)' }}>
            <span className="gradient-text">{displayCareer}</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.75rem', maxWidth: 500, margin: '0.75rem auto 0' }}>
            {description}
          </p>
        </div>

        {/* Main result card */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '3rem',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          marginBottom: '2rem',
          alignItems: 'center',
        }} className="result-main">
          {/* Match ring */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <MatchRing percentage={matchScore} animated={animated} />
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div className="text-mono" style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.125rem', maxWidth: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{salaryRange}</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Salary</div>
              </div>
              <div style={{ width: 1, background: 'var(--border)' }}/>
              <div style={{ textAlign: 'center' }}>
                <div className="text-mono" style={{ fontWeight: 700, color: '#10b981', fontSize: '1.125rem', maxWidth: '80px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{futureScope}</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Scope</div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', background: 'var(--bg-elevated)', borderRadius: 'var(--radius)', padding: '0.25rem' }}>
              {['strengths', 'skills', 'next steps'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    background: activeTab === tab ? 'var(--bg-surface)' : 'transparent',
                    color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-tertiary)',
                    fontWeight: activeTab === tab ? 600 : 500,
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textTransform: 'capitalize',
                    boxShadow: activeTab === tab ? 'var(--shadow-sm)' : 'none',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'strengths' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', animation: 'fade-in-up 0.3s ease' }}>
                {dynamicStrengths.map((s: any, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.25rem' }}>{s.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{s.label}</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'skills' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', animation: 'fade-in-up 0.3s ease' }}>
                {dynamicSkills.map((skill: any, i: number) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                      <span style={{ fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{skill.name}</span>
                      <span className="text-mono" style={{ fontSize: '0.8125rem', fontWeight: 600, color: skill.color }}>{skill.current}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <div className="skill-bar-fill" style={{
                        width: animated ? `${skill.current}%` : '0%',
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                        transitionDelay: `${i * 0.1}s`,
                      }}/>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'next steps' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', animation: 'fade-in-up 0.3s ease' }}>
                {dynamicSkillGaps.map((s: any, i: number) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    padding: '0.875rem',
                    background: 'var(--bg-elevated)',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                  }}>
                    <span className="text-mono" style={{ fontWeight: 700, color: 'var(--text-tertiary)', fontSize: '0.75rem', flexShrink: 0 }}>{s.step}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', flex: 1 }}>{s.action}</span>
                    <span style={{
                      fontSize: '0.6875rem', fontWeight: 700,
                      color: s.color,
                      background: `${s.color}18`,
                      padding: '0.2rem 0.5rem',
                      borderRadius: 9999,
                    }}>{s.priority}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn-primary" onClick={() => navigate('career-detail')} style={{ padding: '0.75rem 1.5rem' }}>
            View Career Details
          </button>
          <button className="btn-secondary" onClick={() => navigate('skill-gap')} style={{ padding: '0.75rem 1.5rem' }}>
            Analyze Skill Gap
          </button>
          <button className="btn-secondary" onClick={() => navigate('roadmap')} style={{ padding: '0.75rem 1.5rem' }}>
            View Roadmap
          </button>
          <button className="btn-secondary" onClick={() => navigate('learning-path')} style={{ padding: '0.75rem 1.5rem' }}>
            Start Learning
          </button>
          <button className="btn-ghost" onClick={() => navigate('career-plan')} style={{ padding: '0.75rem 1.5rem' }}>
            Add to My Plan
          </button>
        </div>

        {/* Secondary careers */}
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Also consider
          </h3>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {[
              { title: 'ML Engineer', match: 87 },
              { title: 'AI Engineer', match: 81 },
              { title: 'Data Analyst', match: 76 },
            ].map((c, i) => (
              <button
                key={i}
                className="btn-secondary"
                onClick={() => navigate('career-detail')}
                style={{ padding: '0.625rem 1rem', display: 'flex', gap: '0.625rem', alignItems: 'center' }}
              >
                <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{c.title}</span>
                <span className="text-mono" style={{ fontSize: '0.75rem', color: 'var(--blue)', fontWeight: 700 }}>{c.match}%</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .result-main { grid-template-columns: 1fr !important; text-align: center; }
        }
      `}</style>
    </div>
  )
}
