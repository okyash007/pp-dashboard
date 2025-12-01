import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { ProtectedRoute } from "./our/ProtectedRoute";
import { DashboardLayout } from "./our/DashboardLayout";
import { OverviewContent } from "./our/OverviewContent";
import { AnalyticsContent } from "./our/AnalyticsContent";
import { RulesContent } from "./our/RulesContent";
import { ProfileContent } from "./our/ProfileContent";
import { PotatoTreeContent } from "./our/PotatoTreeContent";
import TipPageContent from "./our/TipPageContent";
import { FAQContent } from "./our/FAQContent";
import { TnCContent } from "./our/TnCContent";
import { OutboundSupportContent } from "./our/OutboundSupportContent";
import { useAuthStore } from "./stores/authStore";
import { Toaster } from "./components/ui/sonner";
import OnboardingContent from "./our/OnboardingContent";
import PayoutsContent from "./our/PayoutsContent";

function Dashboard() {
  return (
    <DashboardLayout>
      <OverviewContent />
    </DashboardLayout>
  );
}

function Analytics() {
  return (
    <DashboardLayout>
      <AnalyticsContent />
    </DashboardLayout>
  );
}

function Rules() {
  return (
    <DashboardLayout>
      <RulesContent />
    </DashboardLayout>
  );
}

function Profile() {
  return (
    <DashboardLayout>
      <ProfileContent />
    </DashboardLayout>
  );
}

function PotatoTree() {
  return (
    <DashboardLayout>
      <PotatoTreeContent />
    </DashboardLayout>
  );
}

function TipPage() {
  return (
    <DashboardLayout>
      <TipPageContent />
    </DashboardLayout>
  );
}

function FAQ() {
  return (
    <DashboardLayout>
      <FAQContent />
    </DashboardLayout>
  );
}

function TnC() {
  return (
    <DashboardLayout>
      <TnCContent />
    </DashboardLayout>
  );
}

function Onboarding() {
  return <OnboardingContent />;
}

function OutboundSupport() {
  return (
    <DashboardLayout>
      <OutboundSupportContent />
    </DashboardLayout>
  );
}

function Payouts() {
  return (
    <DashboardLayout>
      <PayoutsContent />
    </DashboardLayout>
  );
}

function App() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />
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
        <Route
          path="/dashboard/potato-tree"
          element={
            <ProtectedRoute>
              <PotatoTree />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/tip-page"
          element={
            <ProtectedRoute>
              <TipPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/faq"
          element={
            <ProtectedRoute>
              <FAQ />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/tnc"
          element={
            <ProtectedRoute>
              <TnC />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/support"
          element={
            <ProtectedRoute>
              <OutboundSupport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/payouts"
          element={
            <ProtectedRoute>
              <Payouts />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
