import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuthStore();
  const location = useLocation();

  // Check authentication FIRST - check both localStorage and state
  const hasToken = localStorage.getItem('authToken') || isAuthenticated();
  
  if (!hasToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Only show loading if we're still loading AND we have a token
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't redirect to onboarding if already on onboarding page
  if (user && user.approved === false && location.pathname !== "/onboarding") {
    return <Navigate to="/onboarding" />;
  }

  return children;
};
