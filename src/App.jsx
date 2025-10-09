import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { ProtectedRoute } from './our/ProtectedRoute'
import { useAuthStore } from './stores/authStore'

function Dashboard() {
  const { user, logout } = useAuthStore()
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-foreground">
          Welcome to PP Dashboard
        </h1>
        <p className="text-muted-foreground text-lg max-w-md">
          Hello {user?.username || user?.email || 'User'}! You've successfully logged in. This is your dashboard where you can manage your account and explore features.
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={logout}
            variant="outline"
            className="px-6 py-2"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
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
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  )
}

export default App