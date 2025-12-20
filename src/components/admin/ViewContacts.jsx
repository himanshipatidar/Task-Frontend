import { useEffect, useState } from "react";
import api from "../../api/axios"; // ✅ shared axios instance
import toast from "react-hot-toast";

export default function ViewContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await api.get("/api/contact");
        setContacts(data);
      } catch (error) {
        toast.error("Failed to load contact responses");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <p className="text-gray-500">Loading contacts...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-xl font-semibold mb-6">
        Contact Form Responses
      </h2>

      {contacts.length === 0 ? (
        <p className="text-gray-500">No contact submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">City</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c._id} className="border-t">
                  <td className="p-3">{c.fullName}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.mobile}</td>
                  <td className="p-3">{c.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
