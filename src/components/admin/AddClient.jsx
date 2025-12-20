import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios"; // ✅ shared axios instance

export default function AddClient() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [designation, setDesignation] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!image) {
      return toast.error("Please select a client image");
    }

    setLoading(true);

    // ✅ FormData for image upload
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("designation", designation);
    formData.append("image", image); // must match backend field name

    try {
      await api.post("/api/clients", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Client added successfully!");

      // reset form
      setName("");
      setDescription("");
      setDesignation("");
      setImage(null);
      document.getElementById("clientImage").value = "";
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to add client"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-xl font-semibold mb-6">Add New Client</h2>

      <form onSubmit={submit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">
              Client Image
            </label>
            <input
              id="clientImage"
              type="file"
              accept="image/*"
              className="border rounded px-4 py-1.5 focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">
              Client Name
            </label>
            <input
              className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">
              Designation
            </label>
            <input
              className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. CEO, Founder"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">
              Description
            </label>
            <input
              className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Short testimonial..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-6 px-8 py-2 rounded-lg text-white font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading ? "Uploading..." : "Add Client"}
        </button>
      </form>
    </div>
  );
}
