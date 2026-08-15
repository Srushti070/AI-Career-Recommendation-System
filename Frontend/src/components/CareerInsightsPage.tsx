import type { View } from '../App'

interface CareerInsightsPageProps {
  navigate: (v: View) => void
}

const demandData = [
  { career: 'AI Engineer', demand: 98, growth: 45 },
  { career: 'Data Scientist', demand: 91, growth: 32 },
  { career: 'ML Engineer', demand: 87, growth: 38 },
  { career: 'Cloud Engineer', demand: 85, growth: 28 },
  { career: 'Data Analyst', demand: 79, growth: 18 },
  { career: 'Software Engineer', demand: 88, growth: 22 },
]

const skillTrends = [
  { skill: 'Large Language Models', trend: 'Exploding', color: '#8b5cf6', change: '+340%' },
  { skill: 'MLOps', trend: 'Rising', color: '#3b82f6', change: '+185%' },
  { skill: 'Python', trend: 'Dominant', color: '#10b981', change: '+45%' },
  { skill: 'Cloud Platforms', trend: 'Rising', color: '#06b6d4', change: '+78%' },
  { skill: 'Data Engineering', trend: 'Rising', color: '#f59e0b', change: '+92%' },
  { skill: 'SQL', trend: 'Stable', color: '#64748b', change: '+12%' },
]

const salaryData = [
  { year: '2021', ds: 82, ai: 95, swe: 98 },
  { year: '2022', ds: 88, ai: 108, swe: 105 },
  { year: '2023', ds: 94, ai: 120, swe: 110 },
  { year: '2024', ds: 101, ai: 138, swe: 112 },
  { year: '2025', ds: 110, ai: 158, swe: 118 },
  { year: '2026E', ds: 118, ai: 175, swe: 124 },
]

function MiniChart({ data, maxVal }: { data: number[], maxVal: number }) {
  const w = 200, h = 60
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / maxVal) * h}`)
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="chartFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0"/>
        </linearGradient>
      </defs>
      <path
        d={`M ${pts.join(' L ')} L ${w},${h} L 0,${h} Z`}
        fill="url(#chartFill)"
      />
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke="url(#miniGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="miniGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6"/>
          <stop offset="100%" stopColor="#8b5cf6"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function CareerInsightsPage({ navigate }: CareerInsightsPageProps) {
  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', padding: '3rem 0' }}>
      <div className="container-max">
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ color: 'var(--text-tertiary)', fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Discover
          </p>
          <h1 className="text-h1" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Career Insights
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Global trends, salary data, and skill demand in 2026.
          </p>
        </div>

        {/* Career demand chart */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 className="text-h2" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Career Demand Index</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Job postings growth vs. talent availability
          </p>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {demandData.map((d, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 1fr auto', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{d.career}</span>
                  <div style={{ position: 'relative' }}>
                    <div className="skill-bar-track" style={{ height: 8 }}>
                      <div
                        className="skill-bar-fill"
                        style={{
                          width: `${d.demand}%`,
                          background: d.demand > 90 ? 'linear-gradient(90deg, #8b5cf6, #3b82f6)' : 'var(--gradient-primary)',
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', minWidth: 100 }}>
                    <span className="text-mono" style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.875rem' }}>{d.demand}</span>
                    <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
                      +{d.growth}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Two column: skills + salary */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }} className="insights-grid">
          {/* Skill trends */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
            <h2 className="text-h3" style={{ color: 'var(--text-primary)', marginBottom: '0.375rem' }}>Skill Trends</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', marginBottom: '1.5rem' }}>Year-on-year demand change</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {skillTrends.map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-elevated)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', gap: '0.625rem', alignItems: 'center' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }}/>
                    <span style={{ fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{s.skill}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.6875rem', color: s.color, fontWeight: 700, background: `${s.color}18`, padding: '0.15rem 0.5rem', borderRadius: 9999 }}>
                      {s.trend}
                    </span>
                    <span className="text-mono" style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#10b981' }}>{s.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Salary trends */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
            <h2 className="text-h3" style={{ color: 'var(--text-primary)', marginBottom: '0.375rem' }}>Salary Trends</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', marginBottom: '1.5rem' }}>Median salary ($K) by role, 2021–2026</p>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Data Scientist', color: '#3b82f6' },
                { label: 'AI Engineer', color: '#8b5cf6' },
                { label: 'SWE', color: '#10b981' },
              ].map(l => (
                <div key={l.label} style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
                  <div style={{ width: 16, height: 2, background: l.color, borderRadius: 9999 }}/>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{l.label}</span>
                </div>
              ))}
            </div>

            {/* Simple bar chart rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {salaryData.map((row, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span className="text-mono" style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', minWidth: 40 }}>{row.year}</span>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {[
                      { val: row.ds, color: '#3b82f6' },
                      { val: row.ai, color: '#8b5cf6' },
                      { val: row.swe, color: '#10b981' },
                    ].map((bar, bi) => (
                      <div key={bi} style={{ height: 5, borderRadius: 9999, background: 'var(--bg-subtle)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(bar.val / 180) * 100}%`, background: bar.color, borderRadius: 9999, opacity: 0.8 }}/>
                      </div>
                    ))}
                  </div>
                  <span className="text-mono" style={{ fontSize: '0.6875rem', color: '#8b5cf6', fontWeight: 700, minWidth: 40 }}>
                    ${row.ai}K
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Industry section */}
        <section>
          <h2 className="text-h2" style={{ color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Industry Growth Sectors</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              { sector: 'Artificial Intelligence', growth: 45, companies: '2,400+', color: '#8b5cf6' },
              { sector: 'Fintech', growth: 28, companies: '1,800+', color: '#3b82f6' },
              { sector: 'Healthcare AI', growth: 38, companies: '1,200+', color: '#10b981' },
              { sector: 'Climate Tech', growth: 52, companies: '900+', color: '#f59e0b' },
              { sector: 'Autonomous Systems', growth: 42, companies: '600+', color: '#06b6d4' },
              { sector: 'Cybersecurity', growth: 31, companies: '1,500+', color: '#ef4444' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '1.25rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, marginTop: 4 }}/>
                  <span className="text-mono" style={{ fontSize: '1.125rem', fontWeight: 800, color: '#10b981' }}>+{s.growth}%</span>
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{s.sector}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{s.companies} companies hiring</div>
                <div style={{ marginTop: '0.875rem' }}>
                  <div className="skill-bar-track" style={{ height: 4 }}>
                    <div className="skill-bar-fill" style={{ width: `${(s.growth / 55) * 100}%`, background: s.color }}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .insights-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
