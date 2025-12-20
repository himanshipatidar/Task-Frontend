import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios"; // ✅ shared axios instance

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!image) {
      return toast.error("Please select an image");
    }

    setLoading(true);

    // ✅ FormData for image upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image); // must match backend upload.single("image")

    try {
      await api.post("/api/projects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Project added successfully!");

      // reset form
      setTitle("");
      setDescription("");
      setImage(null);
      document.getElementById("fileInput").value = "";
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-xl font-semibold mb-6">Add New Project</h2>

      <form onSubmit={submit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">
              Project Image File
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="border rounded px-4 py-1.5 focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">
              Project Name
            </label>
            <input
              className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Portfolio Website"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">
              Description
            </label>
            <input
              className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Short description..."
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
          {loading ? "Uploading..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}
