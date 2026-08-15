import { useState, useRef, useEffect } from 'react'
import type { View, Theme } from '../App'
import { useAuth } from '../contexts/AuthContext'

interface NavProps {
  view: View
  navigate: (v: View) => void
  theme: Theme
  setTheme: (t: Theme) => void
}

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

const MonitorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
)

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

export default function Nav({ view, navigate, theme, setTheme }: NavProps) {
  const { user, logout } = useAuth()
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
        setThemeOpen(false)
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const go = (v: View) => {
    navigate(v)
    setActiveDropdown(null)
    setMobileOpen(false)
  }

  const themeIcon = theme === 'dark' ? <MoonIcon /> : theme === 'light' ? <SunIcon /> : <MonitorIcon />

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '64px',
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container-max" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {/* Logo */}
        <button
          onClick={() => go('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            marginRight: '1rem',
          }}
        >
          <div style={{
            width: 28, height: 28,
            background: 'var(--gradient-primary)',
            borderRadius: 7,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 7l8 5 8-5-8-5z" fill="white" opacity="0.9"/>
              <path d="M4 12l8 5 8-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 17l8 5 8-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            CareerPath <span style={{ color: 'var(--blue)' }}>AI</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.125rem', flex: 1 }} className="hidden-mobile">
          {/* DISCOVER */}
          <div style={{ position: 'relative' }}>
            <button
              className="nav-link"
              onClick={() => setActiveDropdown(activeDropdown === 'discover' ? null : 'discover')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              Discover <ChevronDown />
            </button>
            {activeDropdown === 'discover' && (
              <div className="dropdown">
                <div className="dropdown-item" onClick={() => go('career-explorer')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  Career Explorer
                </div>
                <div className="dropdown-item" onClick={() => go('compare')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
                  Compare Careers
                </div>
                <div className="dropdown-item" onClick={() => go('career-insights')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                  Career Insights
                </div>
              </div>
            )}
          </div>

          {/* PLAN */}
          <div style={{ position: 'relative' }}>
            <button
              className="nav-link"
              onClick={() => setActiveDropdown(activeDropdown === 'plan' ? null : 'plan')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              Plan <ChevronDown />
            </button>
            {activeDropdown === 'plan' && (
              <div className="dropdown">
                <div className="dropdown-item" onClick={() => go('career-plan')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  My Career Plan
                </div>
                <div className="dropdown-item" onClick={() => go('skill-gap')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  Skill Gap
                </div>
                <div className="dropdown-item" onClick={() => go('roadmap')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Roadmaps
                </div>
                <div className="dropdown-item" onClick={() => go('learning-path')}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  Learning Paths
                </div>
              </div>
            )}
          </div>

          {/* ASSESSMENT */}
          <button className="nav-link" onClick={() => go('assessment')}>
            Assessment
          </button>
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }} className="hidden-mobile">
          {/* Theme toggle */}
          <div style={{ position: 'relative' }}>
            <button
              className="btn-ghost"
              onClick={() => setThemeOpen(!themeOpen)}
              style={{ padding: '0.375rem 0.5rem', gap: '0.375rem', fontSize: '0.8125rem' }}
            >
              {themeIcon}
            </button>
            {themeOpen && (
              <div className="dropdown" style={{ right: 0, left: 'auto' }}>
                {(['light', 'dark', 'system'] as Theme[]).map(t => (
                  <div
                    key={t}
                    className="dropdown-item"
                    onClick={() => { setTheme(t); setThemeOpen(false) }}
                    style={{ color: theme === t ? 'var(--blue)' : undefined }}
                  >
                    {t === 'light' ? <SunIcon /> : t === 'dark' ? <MoonIcon /> : <MonitorIcon />}
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Avatar / Profile Dropdown */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {user ? (
              <>
                <div 
                  onClick={() => setProfileOpen(!profileOpen)}
                  style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'var(--gradient-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.8125rem', fontWeight: 600, color: 'white', cursor: 'pointer',
                  }}
                >
                  {user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
                {profileOpen && (
                  <div className="dropdown" style={{ right: 0, left: 'auto', minWidth: '180px' }}>
                    <div style={{ padding: '0.5rem', borderBottom: '1px solid var(--border)', marginBottom: '0.25rem' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{user.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user.email}</div>
                    </div>
                    <div className="dropdown-item" onClick={() => go('results')}>My Career Results</div>
                    <div className="dropdown-item" onClick={() => go('career-plan')}>My Career Path</div>
                    <div className="dropdown-item" onClick={() => go('assessment')}>My Assessment</div>
                    <div style={{ height: 1, background: 'var(--border)', margin: '0.25rem 0' }} />
                    <div className="dropdown-item" onClick={() => { logout(); setProfileOpen(false); go('login' as View); }} style={{ color: '#ef4444' }}>
                      Logout
                    </div>
                  </div>
                )}
              </>
            ) : (
              <button 
                className="btn-ghost" 
                onClick={() => go('login' as View)}
                style={{ fontSize: '0.875rem', fontWeight: 500 }}
              >
                Sign In
              </button>
            )}
          </div>

          <button className="btn-primary" onClick={() => go('assessment')} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            {user ? 'Take Assessment' : 'Get Started'}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="btn-ghost show-mobile"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ marginLeft: 'auto', padding: '0.375rem' }}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: 'absolute',
          top: '64px',
          left: 0,
          right: 0,
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
        }}>
          {[
            { label: 'Career Explorer', view: 'career-explorer' as View },
            { label: 'Compare Careers', view: 'compare' as View },
            { label: 'Career Insights', view: 'career-insights' as View },
            { label: 'My Career Plan', view: 'career-plan' as View },
            { label: 'Skill Gap', view: 'skill-gap' as View },
            { label: 'Roadmap', view: 'roadmap' as View },
            { label: 'Learning Path', view: 'learning-path' as View },
            { label: 'Assessment', view: 'assessment' as View },
          ].map(item => (
            <button
              key={item.view}
              className="nav-link"
              onClick={() => go(item.view)}
              style={{ textAlign: 'left', padding: '0.625rem 0.75rem' }}
            >
              {item.label}
            </button>
          ))}
          <div style={{ borderTop: '1px solid var(--border)', marginTop: '0.5rem', paddingTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
            {(['light', 'dark', 'system'] as Theme[]).map(t => (
              <button
                key={t}
                onClick={() => { setTheme(t); setMobileOpen(false) }}
                style={{
                  flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-sm)',
                  background: theme === t ? 'var(--bg-elevated)' : 'transparent',
                  border: `1px solid ${theme === t ? 'var(--border-strong)' : 'transparent'}`,
                  color: theme === t ? 'var(--blue)' : 'var(--text-secondary)',
                  cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 500,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem',
                }}
              >
                {t === 'light' ? <SunIcon /> : t === 'dark' ? <MoonIcon /> : <MonitorIcon />}
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          {user ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', padding: '0 0.75rem' }}>
                Signed in as {user.name}
              </div>
              <button className="nav-link" onClick={() => { logout(); setMobileOpen(false); go('login' as View); }} style={{ textAlign: 'left', padding: '0.625rem 0.75rem', color: '#ef4444' }}>
                Logout
              </button>
            </div>
          ) : (
            <button className="btn-primary" onClick={() => go('login' as View)} style={{ marginTop: '0.25rem' }}>
              Sign In
            </button>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
