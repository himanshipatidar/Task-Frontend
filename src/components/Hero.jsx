import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios"; // ✅ shared axios instance

export default function Hero() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await api.post("/api/contact", formData);

      toast.success("Your request has been submitted successfully!");

      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        city: "",
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative h-[85vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d)",
      }}
    >
      {/* LEFT TEXT */}
      <div className="absolute left-20 top-1/2 -translate-y-1/2">
        <h1 className="text-white text-6xl font-bold leading-tight">
          Consultation,
          <br />
          Design,
          <br />& Marketing
        </h1>
      </div>

      {/* RIGHT FORM */}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-[#1f2b6c] w-[360px] p-8 rounded-2xl shadow-2xl">
        <h2 className="text-white text-xl font-semibold mb-6 text-center">
          Get a Free
          <br />
          Consultation
        </h2>

        <input
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-full bg-transparent border border-white/40 text-white placeholder-gray-300"
        />

        <input
          name="email"
          placeholder="Enter Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-full bg-transparent border border-white/40 text-white placeholder-gray-300"
        />

        <input
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-full bg-transparent border border-white/40 text-white placeholder-gray-300"
        />

        <input
          name="city"
          placeholder="Area, City"
          value={formData.city}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-full bg-transparent border border-white/40 text-white placeholder-gray-300"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-3 rounded-full text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading ? "Submitting..." : "Get Quick Quote"}
        </button>
      </div>
    </div>
  );
}
