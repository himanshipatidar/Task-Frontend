import { useEffect, useState } from "react";
import api from "../api/axios"; // ✅ shared axios instance
import toast from "react-hot-toast";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data } = await api.get("/api/clients");
        setClients(data);
      } catch (error) {
        toast.error("Failed to load client testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return (
      <section className="px-20 py-20 bg-gray-50 text-center">
        <p className="text-gray-500">Loading clients...</p>
      </section>
    );
  }

  return (
    <section className="px-20 py-20 bg-gray-50">
      <h2 className="text-center text-3xl font-semibold mb-14">
        Happy Clients
      </h2>

      {clients.length === 0 ? (
        <p className="text-center text-gray-400">
          No client testimonials yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clients.map((client) => (
            <div
              key={client._id}
              className="bg-white shadow-lg p-6 rounded-lg text-center"
            >
              <img
                src={client.image}
                alt={client.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-orange-500"
              />

              <p className="text-sm text-gray-600 mb-3 italic">
                “{client.description}”
              </p>

              <h4 className="font-semibold">{client.name}</h4>
              <p className="text-xs text-gray-500">
                {client.designation}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
