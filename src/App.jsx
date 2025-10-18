import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { ProtectedRoute } from './our/ProtectedRoute'
import { DashboardLayout } from './our/DashboardLayout'
import { DashboardContent } from './our/DashboardContent'
import { AnalyticsContent } from './our/AnalyticsContent'
import { RulesContent } from './our/RulesContent'
import { ProfileContent } from './our/ProfileContent'
import { useAuthStore } from './stores/authStore'
import { Toaster } from './components/ui/sonner'

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  )
}

function Analytics() {
  return (
    <DashboardLayout>
      <AnalyticsContent />
    </DashboardLayout>
  )
}

function Rules() {
  return (
    <DashboardLayout>
      <RulesContent />
    </DashboardLayout>
  )
}

function Profile() {
  return (
    <DashboardLayout>
      <ProfileContent />
    </DashboardLayout>
  )
}

function App() {
  const initialize = useAuthStore((state) => state.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/overview" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/rules" 
          element={
            <ProtectedRoute>
              <Rules />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App