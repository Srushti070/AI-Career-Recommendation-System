import { useState, useEffect } from 'react'
import type { View } from '../App'

interface SkillGapPageProps {
  navigate: (v: View) => void
  career: string
}

const skills = [
  { name: 'Python', current: 80, required: 90, priority: 'Low', priorityColor: '#10b981' },
  { name: 'SQL', current: 60, required: 85, priority: 'High', priorityColor: '#ef4444' },
  { name: 'Statistics', current: 40, required: 80, priority: 'Critical', priorityColor: '#dc2626' },
  { name: 'Machine Learning', current: 30, required: 75, priority: 'High', priorityColor: '#f59e0b' },
  { name: 'Data Visualization', current: 55, required: 70, priority: 'Medium', priorityColor: '#3b82f6' },
  { name: 'Cloud Platforms', current: 20, required: 60, priority: 'Medium', priorityColor: '#3b82f6' },
]

const topPriorities = [
  {
    rank: '01',
    skill: 'Statistics',
    gap: 40,
    why: 'Core to every modeling decision — required for hypothesis testing and validation.',
    action: 'Khan Academy Statistics + Coursera Statistical Thinking',
    time: '3–4 weeks',
  },
  {
    rank: '02',
    skill: 'SQL',
    gap: 25,
    why: 'Daily tool for data access, transformation, and analysis in most data roles.',
    action: 'Mode SQL Tutorial + LeetCode SQL problems',
    time: '2–3 weeks',
  },
  {
    rank: '03',
    skill: 'Machine Learning',
    gap: 45,
    why: 'The defining skill of the Data Scientist role — predictive modeling.',
    action: 'Andrew Ng ML Course + Hands-On ML book',
    time: '6–8 weeks',
  },
]

function SkillBar({ name, current, required, priority, priorityColor, animated }: typeof skills[0] & { animated: boolean }) {
  const gap = required - current

  return (
    <div style={{
      padding: '1.25rem',
      background: 'var(--bg-surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      transition: 'border-color 0.2s ease',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
          <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{name}</span>
          <span style={{
            fontSize: '0.6875rem', fontWeight: 700,
            color: priorityColor,
            background: `${priorityColor}18`,
            padding: '0.15rem 0.5rem',
            borderRadius: 9999,
          }}>
            {priority}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            Gap: <span className="text-mono" style={{ fontWeight: 700, color: gap > 20 ? '#ef4444' : 'var(--text-secondary)' }}>+{gap}%</span>
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {/* Current */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Current</span>
            <span className="text-mono" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{current}%</span>
          </div>
          <div className="skill-bar-track">
            <div className="skill-bar-fill" style={{
              width: animated ? `${current}%` : '0%',
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              transitionDelay: '0.2s',
            }}/>
          </div>
        </div>

        {/* Required */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Required</span>
            <span className="text-mono" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{required}%</span>
          </div>
          <div className="skill-bar-track">
            {/* Full bar showing target */}
            <div style={{
              height: '100%',
              borderRadius: 9999,
              width: animated ? `${required}%` : '0%',
              background: 'var(--bg-subtle)',
              position: 'relative',
              transition: 'width 1s ease',
              transitionDelay: '0.1s',
              overflow: 'visible',
            }}>
              <div style={{
                position: 'absolute',
                right: 0,
                top: -2,
                width: 2,
                height: 10,
                background: priorityColor,
                borderRadius: 9999,
              }}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SkillGapPage({ navigate, career }: SkillGapPageProps) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 400)
    return () => clearTimeout(timer)
  }, [])

  const overallReadiness = Math.round(
    skills.reduce((acc, s) => acc + Math.min(s.current / s.required, 1), 0) / skills.length * 100
  )

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', padding: '3rem 0' }}>
      <div className="container-max">
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <button className="btn-ghost" onClick={() => navigate('results')} style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to Results
          </button>

          <p style={{ color: 'var(--text-tertiary)', fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Skill Gap Analysis
          </p>
          <h1 className="text-h1" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Your Skill Gap
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Target: <span style={{ fontWeight: 600, color: 'var(--blue)' }}>{career}</span> · See where you are vs. where you need to be.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }} className="gap-layout">
          {/* Skills */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 className="text-h3" style={{ color: 'var(--text-primary)' }}>Current vs. Required</h2>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
                  <div style={{ width: 12, height: 3, borderRadius: 9999, background: 'var(--gradient-primary)' }}/>
                  Current
                </div>
                <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
                  <div style={{ width: 12, height: 3, borderRadius: 9999, background: 'var(--bg-subtle)', border: '1px solid var(--border-strong)' }}/>
                  Required
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {skills.map(skill => (
                <SkillBar key={skill.name} {...skill} animated={animated} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'sticky', top: '84px' }}>
            {/* Readiness score */}
            <div style={{ padding: '1.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ marginBottom: '1rem' }}>
                <div className="text-mono" style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
                  {animated ? overallReadiness : 0}%
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginTop: '0.375rem' }}>Career Readiness</div>
              </div>
              <div className="skill-bar-track" style={{ height: 8 }}>
                <div className="skill-bar-fill" style={{
                  width: animated ? `${overallReadiness}%` : '0%',
                  background: overallReadiness > 70 ? 'linear-gradient(90deg, #10b981, #3b82f6)' : 'var(--gradient-primary)',
                }}/>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: 1.5 }}>
                You need <strong style={{ color: 'var(--text-primary)' }}>3–4 months</strong> of focused study to reach career readiness.
              </p>
            </div>

            {/* Quick actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button className="btn-primary" onClick={() => navigate('roadmap')} style={{ padding: '0.75rem' }}>
                View Roadmap
              </button>
              <button className="btn-secondary" onClick={() => navigate('learning-path')} style={{ padding: '0.75rem' }}>
                Start Learning Path
              </button>
            </div>
          </div>
        </div>

        {/* Top priorities */}
        <div style={{ marginTop: '3rem' }}>
          <h2 className="text-h2" style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            Top Priorities
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {topPriorities.map((p, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '1.5rem',
                alignItems: 'start',
                padding: '1.5rem',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                animation: `fade-in-up 0.4s ${i * 0.1}s ease both`,
              }}>
                <div className="text-mono" style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--border-strong)', lineHeight: 1, paddingTop: '0.125rem' }}>
                  {p.rank}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.375rem' }}>{p.skill}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.55 }}>{p.why}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--blue)', fontWeight: 500 }}>
                    → {p.action}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Est. time</div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{p.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .gap-layout { grid-template-columns: 1fr !important; }
          .gap-layout > div:last-child { position: static !important; }
        }
      `}</style>
    </div>
  )
}
