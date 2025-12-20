import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { useState } from "react";
import AddProject from "../components/admin/AddProject";
import AddClient from "../components/admin/AddClient";
import ViewContacts from "../components/admin/ViewContacts";
import ViewSubscribers from "../components/admin/ViewSubscribers";
import toast from "react-hot-toast"; // For feedback

export default function AdminPanel() {
  const [active, setActive] = useState("projects");
  const navigate = useNavigate();

  // --- LOGOUT LOGIC ---
  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn"); // Clears the auth flag
    toast.success("Logged out successfully");
    window.location.reload(); // Triggers the App.js check to show Login Page
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col">
        <h2 className="text-2xl font-bold text-center py-6 border-b border-blue-500">
          Admin Panel
        </h2>

        <nav className="flex-1 p-4 space-y-3">
          <button
            onClick={() => setActive("projects")}
            className={`w-full text-left px-4 py-2 rounded ${
              active === "projects" ? "bg-blue-500" : "hover:bg-blue-600"
            }`}
          >
            📁 Project Management
          </button>

          <button
            onClick={() => setActive("clients")}
            className={`w-full text-left px-4 py-2 rounded ${
              active === "clients" ? "bg-blue-500" : "hover:bg-blue-600"
            }`}
          >
            👤 Client Management
          </button>

          <button
            onClick={() => setActive("contacts")}
            className={`w-full text-left px-4 py-2 rounded ${
              active === "contacts" ? "bg-blue-500" : "hover:bg-blue-600"
            }`}
          >
            📩 Contact Forms
          </button>

          <button
            onClick={() => setActive("subscribers")}
            className={`w-full text-left px-4 py-2 rounded ${
              active === "subscribers" ? "bg-blue-500" : "hover:bg-blue-600"
            }`}
          >
            📧 Subscribers
          </button>
        </nav>

        {/* LOGOUT BUTTON AT BOTTOM */}
        <div className="p-4 border-t border-blue-500">
          <button 
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition font-medium"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">
        <div className="flex justify-end mb-4">
          <Link
            to="/"
            className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            🏠 Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8 capitalize">{active} Management</h1>

        {active === "projects" && <AddProject />}
        {active === "clients" && <AddClient />}
        {active === "contacts" && <ViewContacts />}
        {active === "subscribers" && <ViewSubscribers />}
      </main>
    </div>
  );
}