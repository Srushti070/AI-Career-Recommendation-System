import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import api from '../api/client'
import { submitAssessment } from '../api/client'
import type { View } from '../App'

interface AssessmentPageProps {
  navigate: (v: View) => void
  onComplete: (career: string) => void
}

interface RecommendationPayload {
  interests: string;
  skills: Record<string, number>;
  background: string;
  goals: string[];
  workStyle: string;
  timeline: string;
  experience: string;
}

const questions = [
  {
    step: 1,
    category: 'Interests',
    question: 'What kind of work excites you most?',
    type: 'single',
    options: [
      { label: 'Building things with code', icon: '⚙️', value: 'engineering' },
      { label: 'Working with data and insights', icon: '📊', value: 'data' },
      { label: 'Designing AI systems', icon: '🤖', value: 'ai' },
      { label: 'Solving complex problems', icon: '🧩', value: 'problem-solving' },
      { label: 'Communicating findings to teams', icon: '💬', value: 'communication' },
      { label: 'Research and experimentation', icon: '🔬', value: 'research' },
    ],
  },
  {
    step: 2,
    category: 'Skills',
    question: 'Rate your comfort with these skills',
    type: 'rating',
    skills: ['Python', 'SQL', 'Statistics', 'Machine Learning', 'Data Visualization', 'Cloud Platforms'],
  },
  {
    step: 3,
    category: 'Background',
    question: "What's your current academic or professional background?",
    type: 'single',
    options: [
      { label: 'Computer Science / Engineering', icon: '💻', value: 'cs' },
      { label: 'Mathematics / Statistics', icon: '📐', value: 'math' },
      { label: 'Business / Economics', icon: '📈', value: 'business' },
      { label: 'Science / Research', icon: '🔬', value: 'science' },
      { label: 'Humanities / Social Sciences', icon: '📚', value: 'humanities' },
      { label: 'Other / Self-taught', icon: '🌱', value: 'other' },
    ],
  },
  {
    step: 4,
    category: 'Goals',
    question: 'What matters most to you in a career?',
    type: 'multi',
    options: [
      { label: 'High salary potential', icon: '💰', value: 'salary' },
      { label: 'Job security & demand', icon: '🛡️', value: 'security' },
      { label: 'Remote work flexibility', icon: '🏠', value: 'remote' },
      { label: 'Creative problem-solving', icon: '💡', value: 'creative' },
      { label: 'Societal impact', icon: '🌍', value: 'impact' },
      { label: 'Continuous learning', icon: '📖', value: 'learning' },
    ],
  },
  {
    step: 5,
    category: 'Work Style',
    question: 'How do you prefer to work?',
    type: 'single',
    options: [
      { label: 'Deep focus, solo work', icon: '🎯', value: 'solo' },
      { label: 'Collaborative team projects', icon: '👥', value: 'team' },
      { label: 'Mix of both', icon: '⚖️', value: 'mixed' },
      { label: 'Client-facing work', icon: '🤝', value: 'client' },
    ],
  },
  {
    step: 6,
    category: 'Timeline',
    question: 'How long are you willing to invest in preparation?',
    type: 'single',
    options: [
      { label: 'Under 3 months', icon: '⚡', value: '3m' },
      { label: '3–6 months', icon: '📅', value: '6m' },
      { label: '6–12 months', icon: '🗓️', value: '12m' },
      { label: 'Over a year', icon: '🏆', value: '1y' },
    ],
  },
  {
    step: 7,
    category: 'Experience',
    question: 'Do you have any relevant projects or experience?',
    type: 'single',
    options: [
      { label: 'No experience yet', icon: '🌱', value: 'none' },
      { label: 'Completed online courses', icon: '📱', value: 'courses' },
      { label: 'Personal / academic projects', icon: '🗂️', value: 'projects' },
      { label: 'Internship experience', icon: '🏢', value: 'intern' },
      { label: 'Professional experience', icon: '💼', value: 'pro' },
    ],
  },
]

const ratingLabels = ['Beginner', 'Some exposure', 'Comfortable', 'Proficient', 'Expert']

export default function AssessmentPage({ navigate, onComplete }: AssessmentPageProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[] | Record<string, number>>>({})
  const [ratings, setRatings] = useState<Record<string, number>>({})

  const mutation = useMutation({
    mutationFn: async (payload: RecommendationPayload) => {
      // Map the simple UI payload to the full ML model required schema
      const fullRequest = {
        Age: 21,
        Gender: "Female",
        Degree: "B.Tech",
        Branch: "Computer Science",
        Semester: 6,
        CGPA: 8.0,
        
        Python: payload.skills['Python'] !== undefined ? payload.skills['Python'] + 1 : 3,
        SQL: payload.skills['SQL'] !== undefined ? payload.skills['SQL'] + 1 : 3,
        Java: 3,
        C_plus_plus: 3,
        JavaScript: 3,
        HTML_CSS: 3,
        
        Data_Structures: 3,
        OOP: 3,
        Statistics: payload.skills['Statistics'] !== undefined ? payload.skills['Statistics'] + 1 : 3,
        Mathematics: 3,
        Machine_Learning: payload.skills['Machine Learning'] !== undefined ? payload.skills['Machine Learning'] + 1 : 3,
        Deep_Learning: 3,
        Data_Visualization: payload.skills['Data Visualization'] !== undefined ? payload.skills['Data Visualization'] + 1 : 3,
        Pandas: 3,
        NumPy: 3,
        Power_BI: 3,

        Communication: 4,
        Leadership: 3,
        Problem_Solving: 4,
        Critical_Thinking: 4,
        Creativity: 3,
        Teamwork: 4,
        Presentation: 3,
        Time_Management: 3,

        AI_Interest: payload.interests === 'ai' ? 5 : 3,
        Programming_Interest: payload.interests === 'engineering' ? 5 : 3,
        Research_Interest: payload.interests === 'research' ? 5 : 3,
        Business_Interest: 3,
        Cloud_Interest: 3,
        Cybersecurity_Interest: 3,
        Finance_Interest: 3,
        Design_Interest: 3,

        Analytical_Thinking: 4,
        Logical_Reasoning: 4,
        Attention_to_Detail: 4,
        Decision_Making: 3,
        Confidence: 3,
        Adaptability: 4,
        Curiosity: 4,

        Projects: payload.experience === 'projects' || payload.experience === 'pro' ? 5 : 2,
        Internships: payload.experience === 'intern' ? 2 : 0,
        Hackathons: 1,
        Certifications: 2,
        GitHub_Activity: 3,
        Open_Source: 1
      };

      const response = await submitAssessment(fullRequest)
      return response
    },
    onSuccess: (data) => {
      onComplete(data)
    },
    onError: (error) => {
      console.error("Failed to fetch recommendation", error)
      onComplete({ career: 'AI Engineer' }) // Fallback if backend is unreachable
    }
  })

  const q = questions[step]
  const progress = ((step) / questions.length) * 100

  const canAdvance = () => {
    if (q.type === 'rating') {
      return (q.skills || []).every(s => ratings[s] !== undefined)
    }
    if (q.type === 'multi') {
      return Array.isArray(answers[step]) && (answers[step] as string[]).length > 0
    }
    return answers[step] !== undefined
  }

  const handleSingle = (val: string) => {
    setAnswers(a => ({ ...a, [step]: val }))
  }

  const handleMulti = (val: string) => {
    const current = (answers[step] as string[]) || []
    if (current.includes(val)) {
      setAnswers(a => ({ ...a, [step]: current.filter(v => v !== val) }))
    } else {
      setAnswers(a => ({ ...a, [step]: [...current, val] }))
    }
  }

  const handleRating = (skill: string, val: number) => {
    setRatings(r => ({ ...r, [skill]: val }))
  }

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(s => s + 1)
    } else {
      const payload: RecommendationPayload = {
        interests: answers[0] as string || '',
        skills: ratings,
        background: answers[2] as string || '',
        goals: answers[3] as string[] || [],
        workStyle: answers[4] as string || '',
        timeline: answers[5] as string || '',
        experience: answers[6] as string || '',
      }
      mutation.mutate(payload)
    }
  }

  if (mutation.isPending) {
    return (
      <div style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        padding: '2rem',
      }}>
        <div style={{ position: 'relative', width: 120, height: 120 }}>
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute' }}>
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border)" strokeWidth="3"/>
            <circle cx="60" cy="60" r="52" fill="none" stroke="url(#analyzeGrad)" strokeWidth="3"
              strokeLinecap="round" strokeDasharray="326" strokeDashoffset="326">
              <animate attributeName="stroke-dashoffset" from="326" to="0" dur="2.5s" fill="freeze"/>
            </circle>
            <defs>
              <linearGradient id="analyzeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6"/>
                <stop offset="100%" stopColor="#8b5cf6"/>
              </linearGradient>
            </defs>
          </svg>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem',
          }}>
            🤖
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2 className="text-h2" style={{ color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Analyzing your profile
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
            Our AI is matching you against 120+ career paths…
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', width: '100%', maxWidth: 360 }}>
          {['Evaluating skills profile', 'Analyzing interest patterns', 'Computing career matches', 'Generating your roadmap'].map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: 20, height: 20,
                borderRadius: '50%',
                background: 'var(--gradient-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0,
                animation: `fade-in-up 0.4s ${i * 0.55}s ease forwards`,
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                opacity: 0,
                animation: `fade-in-up 0.4s ${i * 0.55}s ease forwards`,
              }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 700 }}>
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--blue)', fontFamily: "'JetBrains Mono', monospace" }}>
              STEP {step + 1} OF {questions.length}
            </span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary)' }}>
              {q.category}
            </span>
          </div>

          {/* Progress bar */}
          <div style={{ height: 4, background: 'var(--bg-elevated)', borderRadius: 9999, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progress + (100 / questions.length)}%`,
              background: 'var(--gradient-primary)',
              borderRadius: 9999,
              transition: 'width 0.4s ease',
            }}/>
          </div>

          {/* Step dots */}
          <div style={{ display: 'flex', gap: '0.375rem', marginTop: '0.625rem' }}>
            {questions.map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 3, borderRadius: 9999,
                background: i <= step ? 'var(--blue)' : 'var(--border-strong)',
                transition: 'background 0.3s ease',
              }}/>
            ))}
          </div>
        </div>

        {/* Question */}
        <div style={{ animation: 'fade-in-up 0.35s ease forwards' }} key={step}>
          <h1 className="text-h1" style={{ color: 'var(--text-primary)', marginBottom: '2rem' }}>
            {q.question}
          </h1>

          {/* Single choice */}
          {(q.type === 'single' || q.type === 'multi') && q.options && (
            <div style={{ display: 'grid', gridTemplateColumns: q.options.length <= 4 ? '1fr 1fr' : 'repeat(3, 1fr)', gap: '0.75rem' }} className="options-grid">
              {q.options.map(opt => {
                const isSelected = q.type === 'single'
                  ? answers[step] === opt.value
                  : ((answers[step] as string[]) || []).includes(opt.value)

                return (
                  <button
                    key={opt.value}
                    onClick={() => q.type === 'single' ? handleSingle(opt.value) : handleMulti(opt.value)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      padding: '1.25rem',
                      borderRadius: 'var(--radius)',
                      border: `2px solid ${isSelected ? 'var(--blue)' : 'var(--border-strong)'}`,
                      background: isSelected ? 'var(--blue-glow)' : 'var(--bg-surface)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{opt.icon}</span>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: isSelected ? 'var(--blue)' : 'var(--text-primary)', lineHeight: 1.3 }}>
                      {opt.label}
                    </span>
                  </button>
                )
              })}
            </div>
          )}

          {/* Rating type */}
          {q.type === 'rating' && q.skills && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {q.skills.map(skill => {
                const rating = ratings[skill] ?? -1
                return (
                  <div key={skill}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)' }}>{skill}</span>
                      {rating >= 0 && (
                        <span style={{ fontSize: '0.8125rem', color: 'var(--blue)', fontWeight: 600 }}>
                          {ratingLabels[rating]}
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {[0, 1, 2, 3, 4].map(level => (
                        <button
                          key={level}
                          onClick={() => handleRating(skill, level)}
                          style={{
                            flex: 1,
                            height: 10,
                            borderRadius: 9999,
                            border: 'none',
                            background: level <= rating
                              ? `linear-gradient(90deg, #3b82f6, #8b5cf6)`
                              : 'var(--bg-subtle)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        />
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.375rem' }}>
                      <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Beginner</span>
                      <span style={{ fontSize: '0.6875rem', color: 'var(--text-tertiary)' }}>Expert</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              className="btn-ghost"
              onClick={() => step > 0 ? setStep(s => s - 1) : navigate('home')}
              style={{ padding: '0.625rem 1.25rem' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              {step === 0 ? 'Back' : 'Previous'}
            </button>

            <button
              className="btn-primary"
              onClick={handleNext}
              disabled={!canAdvance()}
              style={{
                padding: '0.75rem 2rem',
                opacity: canAdvance() ? 1 : 0.4,
                cursor: canAdvance() ? 'pointer' : 'not-allowed',
                transform: 'none',
              }}
            >
              {step === questions.length - 1 ? 'Get My Career Match' : 'Continue'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          {q.type === 'multi' && (
            <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginTop: '0.75rem' }}>
              Select all that apply
            </p>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .options-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 420px) {
          .options-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
