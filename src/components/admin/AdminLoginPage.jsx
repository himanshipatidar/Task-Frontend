import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios"; // ✅ shared axios instance

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/api/admin/login", {
        email,
        password,
      });

      if (data.success) {
        toast.success("Login successful!");
        localStorage.setItem("isAdminLoggedIn", "true");

        // reload to trigger auth check in App.jsx
        window.location.reload();
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Server error. Please try again."
      );
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')",
        }}
      />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-gray-200/90 rounded-xl shadow-2xl backdrop-blur-md border border-white/20">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-8">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            className="w-full p-3 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300 shadow-lg"
          >
            Login
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-4 py-3 bg-transparent border border-blue-600 text-blue-700 font-medium rounded hover:bg-blue-50 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
