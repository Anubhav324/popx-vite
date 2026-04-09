import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LandingPage  from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage    from "./pages/LoginPage";
import AccountPage  from "./pages/AccountPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"         element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/account"  element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
