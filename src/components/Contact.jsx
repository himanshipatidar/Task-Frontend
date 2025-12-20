import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios"; // ✅ shared axios instance

export default function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/contact", form);
      toast.success("Your request has been submitted!");

      setForm({
        fullName: "",
        email: "",
        mobile: "",
        city: "",
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to submit request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-10">
        <h2 className="text-3xl font-bold text-center mb-8">
          Get Quick Quote
        </h2>

        <form
          onSubmit={submitForm}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            placeholder="Full Name"
            className="border p-3 rounded"
            value={form.fullName}
            onChange={(e) =>
              setForm({ ...form, fullName: e.target.value })
            }
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="border p-3 rounded"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Mobile Number"
            className="border p-3 rounded"
            value={form.mobile}
            onChange={(e) =>
              setForm({ ...form, mobile: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="City"
            className="border p-3 rounded"
            value={form.city}
            onChange={(e) =>
              setForm({ ...form, city: e.target.value })
            }
            required
          />

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-lg text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Submitting..." : "Get Quick Quote"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
