import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuthStore();
  const location = useLocation();

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

  if (!isAuthenticated()) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
