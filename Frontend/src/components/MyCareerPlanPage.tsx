import type { View } from '../App'

interface MyCareerPlanPageProps {
  navigate: (v: View) => void
  career: string
}

const weeklyTasks = [
  { done: true, task: 'Complete SQL window functions module', time: '2h' },
  { done: true, task: 'Watch statistics lecture series (Ch. 4–6)', time: '3h' },
  { done: false, task: 'Build student performance analyzer project', time: '5h', priority: true },
  { done: false, task: 'Practice 10 LeetCode SQL problems', time: '2h' },
  { done: false, task: 'Review probability distributions', time: '1.5h' },
]

const journeyNodes = [
  { label: 'Assessment', done: true, icon: '📋' },
  { label: 'Career Match', done: true, icon: '🎯' },
  { label: 'Skill Gap', done: true, icon: '📊' },
  { label: 'Learning', done: false, current: true, icon: '📚' },
  { label: 'Projects', done: false, icon: '🗂️' },
  { label: 'Portfolio', done: false, icon: '💼' },
  { label: 'Interview', done: false, icon: '🎤' },
  { label: 'Career Ready', done: false, icon: '🚀' },
]

const skills = [
  { name: 'Python', progress: 80, color: '#3b82f6' },
  { name: 'SQL', progress: 60, color: '#8b5cf6' },
  { name: 'Statistics', progress: 40, color: '#06b6d4' },
  { name: 'Machine Learning', progress: 30, color: '#10b981' },
]

export default function MyCareerPlanPage({ navigate, career }: MyCareerPlanPageProps) {
  const completedTasks = weeklyTasks.filter(t => t.done).length
  const readiness = 42

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', padding: '3rem 0' }}>
      <div className="container-max">
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start', marginBottom: '2.5rem' }} className="plan-header">
          <div>
            <p style={{ color: 'var(--text-tertiary)', fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Career Command Center
            </p>
            <h1 className="text-h1" style={{ color: 'var(--text-primary)', marginBottom: '0.375rem' }}>
              Your Career Plan
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Goal: <span style={{ fontWeight: 600, color: 'var(--blue)' }}>{career}</span>
            </p>
          </div>

          {/* Readiness badge */}
          <div style={{ padding: '1.25rem 1.75rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <div className="text-mono" style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
              {readiness}%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.375rem', fontWeight: 600 }}>
              CAREER READINESS
            </div>
            <div className="skill-bar-track" style={{ marginTop: '0.75rem', height: 6 }}>
              <div className="skill-bar-fill" style={{ width: `${readiness}%` }}/>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 340px', gap: '1.25rem', alignItems: 'start' }} className="plan-grid">

          {/* What to do next */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', gridColumn: '1 / 3' }} className="next-up">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>What to do next</h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{completedTasks}/{weeklyTasks.length} this week</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {weeklyTasks.map((task, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '0.875rem',
                    alignItems: 'center',
                    padding: '0.875rem',
                    background: task.priority ? 'var(--blue-glow)' : task.done ? 'var(--bg-elevated)' : 'var(--bg-elevated)',
                    border: `1px solid ${task.priority ? 'rgba(59,130,246,0.3)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius)',
                    opacity: task.done ? 0.6 : 1,
                  }}
                >
                  <div style={{
                    width: 20, height: 20,
                    borderRadius: 6,
                    border: `2px solid ${task.done ? 'var(--blue)' : 'var(--border-strong)'}`,
                    background: task.done ? 'var(--blue)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {task.done && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </div>
                  <span style={{
                    flex: 1,
                    fontSize: '0.875rem',
                    color: task.done ? 'var(--text-tertiary)' : 'var(--text-primary)',
                    fontWeight: task.priority ? 600 : 500,
                    textDecoration: task.done ? 'line-through' : 'none',
                  }}>
                    {task.task}
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }}>
                    {task.priority && !task.done && (
                      <span style={{ fontSize: '0.625rem', fontWeight: 700, color: 'var(--blue)', background: 'var(--blue-glow)', padding: '0.15rem 0.5rem', borderRadius: 9999 }}>
                        PRIORITY
                      </span>
                    )}
                    <span className="text-mono" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{task.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.75rem' }}>
              <button className="btn-primary" onClick={() => navigate('learning-path')} style={{ padding: '0.625rem 1rem', fontSize: '0.875rem' }}>
                Continue Learning
              </button>
              <button className="btn-secondary" onClick={() => navigate('roadmap')} style={{ padding: '0.625rem 1rem', fontSize: '0.875rem' }}>
                View Roadmap
              </button>
            </div>
          </div>

          {/* Skill progress */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>Skill Progress</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {skills.map(s => (
                <div key={s.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-primary)' }}>{s.name}</span>
                    <span className="text-mono" style={{ fontSize: '0.75rem', fontWeight: 600, color: s.color }}>{s.progress}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-bar-fill" style={{ width: `${s.progress}%`, background: `linear-gradient(90deg, ${s.color}, ${s.color}99)` }}/>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-ghost" onClick={() => navigate('skill-gap')} style={{ marginTop: '1.25rem', width: '100%', justifyContent: 'center', borderColor: 'var(--border)' }}>
              Full Skill Gap Analysis
            </button>
          </div>
        </div>

        {/* Journey map */}
        <div style={{ marginTop: '2rem', padding: '1.75rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Your Journey</h2>

          <div style={{ display: 'flex', gap: 0, overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {journeyNodes.map((node, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.625rem' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: node.done ? 'var(--gradient-primary)' : node.current ? 'var(--blue-glow)' : 'var(--bg-elevated)',
                    border: node.done ? 'none' : node.current ? '2px solid var(--blue)' : '2px solid var(--border-strong)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.125rem',
                    boxShadow: node.current ? '0 0 0 4px var(--blue-glow)' : 'none',
                  }}>
                    {node.done
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      : node.icon
                    }
                  </div>
                  <div style={{
                    fontSize: '0.6875rem',
                    fontWeight: node.current ? 700 : 500,
                    color: node.current ? 'var(--blue)' : node.done ? 'var(--text-secondary)' : 'var(--text-tertiary)',
                    textAlign: 'center',
                    maxWidth: 70,
                    lineHeight: 1.3,
                  }}>
                    {node.label}
                    {node.current && <div style={{ color: 'var(--blue)', fontSize: '0.5625rem', fontWeight: 800, letterSpacing: '0.06em' }}>YOU ARE HERE</div>}
                  </div>
                </div>

                {i < journeyNodes.length - 1 && (
                  <div style={{
                    width: 40, height: 2,
                    background: journeyNodes[i].done ? 'var(--gradient-primary)' : 'var(--border-strong)',
                    opacity: journeyNodes[i].done ? 0.5 : 0.3,
                    flexShrink: 0,
                    alignSelf: 'flex-start',
                    marginTop: '23px',
                  }}/>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '1.5rem' }} className="plan-stats">
          {[
            { label: 'Days on path', value: '14', icon: '📅' },
            { label: 'Hours learned', value: '28', icon: '⏱️' },
            { label: 'Roadmap stage', value: '3/7', icon: '🗺️' },
            { label: 'Est. career ready', value: 'Nov 2026', icon: '🎯' },
          ].map((stat, i) => (
            <div key={i} style={{ padding: '1.125rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <span style={{ fontSize: '1.25rem' }}>{stat.icon}</span>
              <div>
                <div className="text-mono" style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--text-primary)', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.2rem' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) {
          .plan-grid { grid-template-columns: 1fr 1fr !important; }
          .next-up { grid-column: 1 / 3 !important; }
          .plan-grid > div:last-child { grid-column: 1 / 3; }
        }
        @media (max-width: 640px) {
          .plan-grid { grid-template-columns: 1fr !important; }
          .next-up { grid-column: auto !important; }
          .plan-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .plan-header { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
