import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/axios"; // ✅ shared axios instance

export default function ViewSubscribers() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const { data } = await api.get("/api/subscribe");
        setSubs(data);
      } catch (error) {
        toast.error("Failed to load subscribers");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <p className="text-gray-500">Loading subscribers...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-xl font-semibold mb-6">
        Subscribed Emails
      </h2>

      {subs.length === 0 ? (
        <p className="text-gray-500">No subscribers yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subs.map((s) => (
            <div
              key={s._id}
              className="border rounded-lg p-4 bg-gray-50"
            >
              📧 {s.email}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
