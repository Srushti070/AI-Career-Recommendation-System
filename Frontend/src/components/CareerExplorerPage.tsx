import { useState } from 'react'
import type { View } from '../App'

interface CareerExplorerPageProps {
  navigate: (v: View) => void
}

const allCareers = [
  {
    title: 'Data Scientist',
    match: 94,
    category: 'Data & AI',
    salary: '$95K–$145K',
    demand: 'Very High',
    demandColor: '#10b981',
    difficulty: 'Medium-High',
    desc: 'Turn raw data into insights, predictions, and intelligent decisions.',
    skills: ['Python', 'ML', 'Statistics', 'SQL'],
    color: '#3b82f6',
  },
  {
    title: 'AI Engineer',
    match: 89,
    category: 'Data & AI',
    salary: '$110K–$175K',
    demand: 'Extreme',
    demandColor: '#8b5cf6',
    difficulty: 'High',
    desc: 'Build intelligent systems, LLM applications, and AI-powered products.',
    skills: ['PyTorch', 'LLMs', 'MLOps', 'Python'],
    color: '#8b5cf6',
  },
  {
    title: 'ML Engineer',
    match: 82,
    category: 'Data & AI',
    salary: '$105K–$160K',
    demand: 'High',
    demandColor: '#3b82f6',
    difficulty: 'High',
    desc: 'Design, train, and deploy machine learning models at production scale.',
    skills: ['TensorFlow', 'MLOps', 'Cloud', 'Python'],
    color: '#06b6d4',
  },
  {
    title: 'Software Engineer',
    match: 74,
    category: 'Engineering',
    salary: '$90K–$155K',
    demand: 'High',
    demandColor: '#3b82f6',
    difficulty: 'Medium',
    desc: 'Build scalable systems and products that millions of people use daily.',
    skills: ['React', 'Node.js', 'Python', 'Cloud'],
    color: '#10b981',
  },
  {
    title: 'Data Analyst',
    match: 78,
    category: 'Data & AI',
    salary: '$65K–$105K',
    demand: 'High',
    demandColor: '#3b82f6',
    difficulty: 'Medium',
    desc: 'Uncover patterns in data to guide strategic business decisions.',
    skills: ['SQL', 'Tableau', 'Python', 'Excel'],
    color: '#f59e0b',
  },
  {
    title: 'Cloud Engineer',
    match: 68,
    category: 'Engineering',
    salary: '$95K–$145K',
    demand: 'Very High',
    demandColor: '#10b981',
    difficulty: 'Medium-High',
    desc: 'Design and manage cloud infrastructure for modern applications.',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Python'],
    color: '#06b6d4',
  },
  {
    title: 'Cybersecurity Analyst',
    match: 61,
    category: 'Security',
    salary: '$80K–$130K',
    demand: 'Very High',
    demandColor: '#10b981',
    difficulty: 'Medium-High',
    desc: 'Protect organizations from threats, breaches, and vulnerabilities.',
    skills: ['Security', 'Networking', 'Python', 'SIEM'],
    color: '#ef4444',
  },
  {
    title: 'Product Manager',
    match: 55,
    category: 'Business',
    salary: '$100K–$160K',
    demand: 'High',
    demandColor: '#3b82f6',
    difficulty: 'Medium',
    desc: 'Lead product strategy and execution from ideation to launch.',
    skills: ['Strategy', 'Analytics', 'Communication', 'Agile'],
    color: '#f59e0b',
  },
]

const categories = ['All', 'Data & AI', 'Engineering', 'Security', 'Business']
const sortOptions = ['Best Match', 'Salary', 'Demand']

export default function CareerExplorerPage({ navigate }: CareerExplorerPageProps) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState('Best Match')
  const [search, setSearch] = useState('')
  const [hovered, setHovered] = useState<number | null>(null)

  const filtered = allCareers
    .filter(c => (activeCategory === 'All' || c.category === activeCategory) &&
      (search === '' || c.title.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => sort === 'Best Match' ? b.match - a.match : sort === 'Salary' ? parseInt(b.salary.replace(/\D/g, '')) - parseInt(a.salary.replace(/\D/g, '')) : 0)

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', padding: '3rem 0' }}>
      <div className="container-max">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ color: 'var(--text-tertiary)', fontWeight: 600, fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Discover
          </p>
          <h1 className="text-h1" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            Career Explorer
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {allCareers.length} careers · Matched to your profile
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search careers..."
              style={{
                width: '100%',
                padding: '0.625rem 0.75rem 0.625rem 2.25rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border-strong)',
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Categories */}
          <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                style={{
                  padding: '0.5rem 0.875rem',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${activeCategory === c ? 'var(--blue)' : 'var(--border-strong)'}`,
                  background: activeCategory === c ? 'var(--blue-glow)' : 'var(--bg-surface)',
                  color: activeCategory === c ? 'var(--blue)' : 'var(--text-secondary)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              padding: '0.5rem 0.875rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-strong)',
              background: 'var(--bg-surface)',
              color: 'var(--text-secondary)',
              fontSize: '0.8125rem',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {sortOptions.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        {/* Career grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {filtered.map((career, i) => (
            <div
              key={i}
              className="card"
              style={{
                padding: '1.5rem',
                cursor: 'pointer',
                transform: hovered === i ? 'translateY(-4px)' : 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate('career-detail')}
            >
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{
                  width: 44, height: 44,
                  borderRadius: 10,
                  background: `${career.color}18`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.25rem',
                }}>
                  {career.category === 'Data & AI' ? '🤖' : career.category === 'Engineering' ? '⚙️' : career.category === 'Security' ? '🛡️' : '📈'}
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="text-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: career.color, lineHeight: 1 }}>
                    {career.match}%
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>MATCH</div>
                </div>
              </div>

              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                {career.title}
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.55 }}>
                {career.desc}
              </p>

              {/* Skills */}
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {career.skills.map(s => (
                  <span key={s} style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.6875rem', fontWeight: 600,
                    padding: '0.2rem 0.5rem',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: 4,
                    color: 'var(--text-secondary)',
                  }}>{s}</span>
                ))}
              </div>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.875rem', borderTop: '1px solid var(--border)', fontSize: '0.75rem' }}>
                <div>
                  <div style={{ color: 'var(--text-tertiary)', marginBottom: '0.125rem' }}>Salary</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{career.salary}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-tertiary)', marginBottom: '0.125rem' }}>Demand</div>
                  <div style={{ fontWeight: 600, color: career.demandColor }}>{career.demand}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-tertiary)', marginBottom: '0.125rem' }}>Difficulty</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{career.difficulty}</div>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '5rem 2rem',
              color: 'var(--text-secondary)',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                No careers found
              </div>
              <div style={{ fontSize: '0.875rem' }}>Try adjusting your search or filters</div>
              <button className="btn-secondary" onClick={() => { setSearch(''); setActiveCategory('All') }} style={{ marginTop: '1.25rem' }}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
