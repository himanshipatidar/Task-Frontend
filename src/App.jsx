import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminPanel from "./pages/AdminPanel";
import AdminLoginPage from "./components/admin/AdminLoginPage";
import { Toaster } from "react-hot-toast";

export default function App() {
  // Simple check for login status in localStorage
  const isAuthenticated = localStorage.getItem("isAdminLoggedIn") === "true";

  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* If trying to access /admin, check auth status */}
        <Route 
          path="/admin" 
          element={isAuthenticated ? <AdminPanel /> : <AdminLoginPage />} 
        />

        {/* Catch-all redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}