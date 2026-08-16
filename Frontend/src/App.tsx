import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import HomePage from './components/HomePage'
import AssessmentPage from './components/AssessmentPage'
import AIResultsPage from './components/AIResultsPage'
import RoadmapPage from './components/RoadmapPage'
import SkillGapPage from './components/SkillGapPage'
import LearningPathPage from './components/LearningPathPage'
import MyCareerPlanPage from './components/MyCareerPlanPage'
import CareerExplorerPage from './components/CareerExplorerPage'
import CareerDetailPage from './components/CareerDetailPage'
import CareerInsightsPage from './components/CareerInsightsPage'
import CompareCareerPage from './components/CompareCareerPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import { AuthProvider, useAuth } from './contexts/AuthContext'

export type View =
  | 'home'
  | 'assessment'
  | 'results'
  | 'roadmap'
  | 'skill-gap'
  | 'learning-path'
  | 'career-plan'
  | 'career-explorer'
  | 'career-detail'
  | 'career-insights'
  | 'compare'
  | 'login'
  | 'register'
  | 'profile'

export type Theme = 'light' | 'dark' | 'system'

// A wrapper for protected routes
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !token) {
      navigate('/login');
    }
  }, [token, isLoading, navigate]);

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--text-primary)' }}>Loading...</div>;
  }

  return token ? <>{children}</> : null;
}

export interface AppState {
  assessmentComplete: boolean
  selectedCareer: string
  assessmentResult: any
}

function AppContent() {
  const navigateRouter = useNavigate()
  const location = useLocation()

  let view: View | 'login' | 'register' | 'profile' = 'home'
  const path = location.pathname.slice(1) || 'home'
  if (['home', 'assessment', 'results', 'roadmap', 'skill-gap', 'learning-path', 'career-plan', 'career-explorer', 'career-detail', 'career-insights', 'compare', 'login', 'register', 'profile'].includes(path)) {
    view = path as View | 'login' | 'register' | 'profile'
  }

  const [theme, setTheme] = useState<Theme>('dark')
  const [appState, setAppState] = useState<AppState>({
    assessmentComplete: false,
    selectedCareer: 'Data Scientist',
    assessmentResult: null
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', isDark)
    } else {
      root.classList.toggle('dark', theme === 'dark')
    }
  }, [theme])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const navigate = (v: View | 'login' | 'register' | 'profile') => {
    navigateRouter(`/${v === 'home' ? '' : v}`)
  }

  const completeAssessment = (result: any) => {
    const careerName = typeof result === 'string' ? result : (result.career || 'Data Scientist');
    setAppState(s => ({ ...s, assessmentComplete: true, selectedCareer: careerName, assessmentResult: result }))
    navigate('results')
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', transition: 'background 250ms ease' }}>
      <Nav view={view} navigate={navigate} theme={theme} setTheme={setTheme} />
      <main style={{ paddingTop: '64px' }}>
        <Routes>
          <Route path="/" element={<HomePage navigate={navigate} />} />
          <Route path="/home" element={<HomePage navigate={navigate} />} />
          <Route path="/login" element={<LoginPage navigate={navigate} />} />
          <Route path="/register" element={<RegisterPage navigate={navigate} />} />

          {/* Protected Routes */}
          <Route path="/assessment" element={<ProtectedRoute><AssessmentPage navigate={navigate} onComplete={completeAssessment} /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute><AIResultsPage navigate={navigate} career={appState.selectedCareer} result={appState.assessmentResult} /></ProtectedRoute>} />
          <Route path="/roadmap" element={<ProtectedRoute><RoadmapPage navigate={navigate} career={appState.selectedCareer} /></ProtectedRoute>} />
          <Route path="/skill-gap" element={<ProtectedRoute><SkillGapPage navigate={navigate} career={appState.selectedCareer} /></ProtectedRoute>} />
          <Route path="/learning-path" element={<ProtectedRoute><LearningPathPage navigate={navigate} career={appState.selectedCareer} /></ProtectedRoute>} />
          <Route path="/career-plan" element={<ProtectedRoute><MyCareerPlanPage navigate={navigate} career={appState.selectedCareer} /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><AIResultsPage navigate={navigate} career={appState.selectedCareer} result={appState.assessmentResult} /></ProtectedRoute>} />

          {/* Public Exploratory Routes */}
          <Route path="/career-explorer" element={<CareerExplorerPage navigate={navigate} />} />
          <Route path="/career-detail" element={<CareerDetailPage navigate={navigate} career={appState.selectedCareer} />} />
          <Route path="/career-insights" element={<CareerInsightsPage navigate={navigate} />} />
          <Route path="/compare" element={<CompareCareerPage navigate={navigate} />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}
