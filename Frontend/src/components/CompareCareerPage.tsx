import { useState } from 'react'
import type { View } from '../App'

interface CompareCareerPageProps {
  navigate: (v: View) => void
}

const careerOptions = ['Data Scientist', 'AI Engineer', 'ML Engineer', 'Data Analyst', 'Software Engineer', 'Cloud Engineer']

const careerData: Record<string, {
  salary: number
  demand: number
  growth: number
  difficulty: number
  education: string
  timeToReady: string
  skills: string[]
  match: number
  color: string
}> = {
  'Data Scientist': {
    salary: 110,
    demand: 91,
    growth: 32,
    difficulty: 68,
    education: "Master's preferred",
    timeToReady: '8–12 months',
    skills: ['Python', 'Statistics', 'ML', 'SQL', 'Visualization'],
    match: 94,
    color: '#3b82f6',
  },
  'AI Engineer': {
    salary: 145,
    demand: 98,
    growth: 45,
    difficulty: 85,
    education: "Bachelor's / Master's",
    timeToReady: '12–18 months',
    skills: ['PyTorch', 'LLMs', 'MLOps', 'Python', 'APIs'],
    match: 89,
    color: '#8b5cf6',
  },
  'ML Engineer': {
    salary: 128,
    demand: 87,
    growth: 38,
    difficulty: 78,
    education: "Bachelor's+ in CS",
    timeToReady: '10–14 months',
    skills: ['TensorFlow', 'MLOps', 'Python', 'Cloud', 'Pipelines'],
    match: 82,
    color: '#06b6d4',
  },
  'Data Analyst': {
    salary: 82,
    demand: 79,
    growth: 18,
    difficulty: 42,
    education: "Bachelor's in any field",
    timeToReady: '4–6 months',
    skills: ['SQL', 'Excel', 'Tableau', 'Python', 'Statistics'],
    match: 78,
    color: '#f59e0b',
  },
  'Software Engineer': {
    salary: 115,
    demand: 88,
    growth: 22,
    difficulty: 62,
    education: "Bachelor's in CS / Bootcamp",
    timeToReady: '6–12 months',
    skills: ['JavaScript', 'Python', 'React', 'Node.js', 'Cloud'],
    match: 74,
    color: '#10b981',
  },
  'Cloud Engineer': {
    salary: 118,
    demand: 85,
    growth: 28,
    difficulty: 65,
    education: "Bachelor's / Certifications",
    timeToReady: '6–9 months',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Python', 'Networking'],
    match: 68,
    color: '#06b6d4',
  },
}

function CompareBar({ valueA, valueB, colorA, colorB, max = 100, label }: {
  valueA: number, valueB: number, colorA: string, colorB: string, max?: number, label: string
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.75rem', alignItems: 'center' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.25rem' }}>
          <span className="text-mono" style={{ fontSize: '0.8125rem', fontWeight: 700, color: colorA }}>{valueA}{label === 'Salary' ? 'K' : label === 'Education' ? '' : '%'}</span>
        </div>
        <div className="skill-bar-track" style={{ direction: 'rtl' }}>
          <div style={{
            height: '100%', width: `${(valueA / max) * 100}%`,
            background: colorA, borderRadius: 9999,
            transition: 'width 0.8s ease',
          }}/>
        </div>
      </div>

      <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-tertiary)', textAlign: 'center', minWidth: 80, letterSpacing: '0.03em', textTransform: 'uppercase' }}>
        {label}
      </span>

      <div>
        <div style={{ marginBottom: '0.25rem' }}>
          <span className="text-mono" style={{ fontSize: '0.8125rem', fontWeight: 700, color: colorB }}>{valueB}{label === 'Salary' ? 'K' : label === 'Education' ? '' : '%'}</span>
        </div>
        <div className="skill-bar-track">
          <div style={{
            height: '100%', width: `${(valueB / max) * 100}%`,
            background: colorB, borderRadius: 9999,
            transition: 'width 0.8s ease',
          }}/>
        </div>
      </div>
    </div>
  )
}

export default function CompareCareerPage({ navigate }: CompareCareerPageProps) {
  const [careerA, setCareerA] = useState('Data Scientist')
  const [careerB, setCareerB] = useState('AI Engineer')

  const a = careerData[careerA]
  const b = careerData[careerB]

  const winner = (fieldA: number, fieldB: number, higherIsBetter = true) => {
    if (higherIsBetter) return fieldA > fieldB ? 'A' : fieldB > fieldA ? 'B' : 'tie'
    return fieldA < fieldB ? 'A' : fieldB < fieldA ? 'B' : 'tie'
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', padding: '3rem 0' }}>
      <div className="container-max">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ color: 'var(--text-tertiary)', fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Discover
          </p>
          <h1 className="text-h1" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Compare Careers
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Side-by-side analysis of salary, demand, skills, and your personal match.
          </p>
        </div>

        {/* Career selectors */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Career A
            </label>
            <select
              value={careerA}
              onChange={e => setCareerA(e.target.value)}
              style={{
                width: '100%', padding: '0.75rem 1rem',
                background: `${a.color}12`,
                border: `2px solid ${a.color}50`,
                borderRadius: 'var(--radius)',
                color: a.color, fontWeight: 700,
                fontSize: '1rem', cursor: 'pointer', outline: 'none',
              }}
            >
              {careerOptions.filter(c => c !== careerB).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div style={{ textAlign: 'center', fontWeight: 700, color: 'var(--text-tertiary)', fontSize: '1.125rem', paddingTop: '1.25rem' }}>
            VS
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Career B
            </label>
            <select
              value={careerB}
              onChange={e => setCareerB(e.target.value)}
              style={{
                width: '100%', padding: '0.75rem 1rem',
                background: `${b.color}12`,
                border: `2px solid ${b.color}50`,
                borderRadius: 'var(--radius)',
                color: b.color, fontWeight: 700,
                fontSize: '1rem', cursor: 'pointer', outline: 'none',
              }}
            >
              {careerOptions.filter(c => c !== careerA).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Match scores */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { career: careerA, data: a },
            { career: careerB, data: b },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: '1.5rem',
                background: `${item.data.color}08`,
                border: `1px solid ${item.data.color}30`,
                borderRadius: 'var(--radius-lg)',
                textAlign: i === 0 ? 'left' : 'right',
                gridColumn: i === 0 ? 1 : 3,
              }}
            >
              <div className="text-mono" style={{ fontSize: '2.5rem', fontWeight: 800, color: item.data.color, lineHeight: 1 }}>
                {item.data.match}%
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600, letterSpacing: '0.05em', marginTop: '0.25rem' }}>
                YOUR MATCH
              </div>
            </div>
          ))}
          <div style={{ gridColumn: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
            ⚡
          </div>
        </div>

        {/* Comparison bars */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <CompareBar valueA={a.salary} valueB={b.salary} colorA={a.color} colorB={b.color} max={180} label="Salary" />
            <CompareBar valueA={a.demand} valueB={b.demand} colorA={a.color} colorB={b.color} label="Demand" />
            <CompareBar valueA={a.growth} valueB={b.growth} colorA={a.color} colorB={b.color} max={55} label="Growth" />
            <CompareBar valueA={100 - a.difficulty} valueB={100 - b.difficulty} colorA={a.color} colorB={b.color} label="Ease" />
          </div>
        </div>

        {/* Skills comparison */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {[
            { career: careerA, data: a },
            { career: careerB, data: b },
          ].map((item, i) => (
            <div key={i} style={{ padding: '1.5rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: item.data.color, marginBottom: '1rem', letterSpacing: '0.02em' }}>
                {item.career}
              </div>
              <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {item.data.skills.map(s => (
                  <span key={s} style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.6875rem', fontWeight: 600,
                    padding: '0.25rem 0.5rem',
                    background: `${item.data.color}12`,
                    border: `1px solid ${item.data.color}30`,
                    borderRadius: 4,
                    color: item.data.color,
                  }}>{s}</span>
                ))}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                  <span>Education</span>
                  <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{item.data.education}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Time to career-ready</span>
                  <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{item.data.timeToReady}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation */}
        <div style={{
          padding: '2rem',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.875rem' }}>🎯</div>
          <h2 className="text-h2" style={{ color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Which career fits you better?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: 500, margin: '0 auto 1.5rem' }}>
            Based on your assessment profile, <strong style={{ color: a.color }}>{careerA}</strong> is your stronger match at{' '}
            <strong style={{ color: a.color }}>{a.match}%</strong>.{' '}
            {careerA === 'AI Engineer'
              ? 'However, it requires significantly more prep time.'
              : 'It offers a great balance of salary potential and time to readiness.'}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => navigate('roadmap')}>
              Start {careerA} Roadmap
            </button>
            <button className="btn-secondary" onClick={() => navigate('career-detail')}>
              Explore {careerB}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
