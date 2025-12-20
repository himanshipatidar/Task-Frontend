import { useEffect, useState } from "react";
import api from "../api/axios"; // ✅ shared axios instance
import toast from "react-hot-toast";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get("/api/projects");
        setProjects(data);
      } catch (error) {
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 font-medium">
        Loading projects...
      </div>
    );
  }

  return (
    <section className="px-10 lg:px-20 py-20 bg-gray-50">
      <h2 className="text-center text-4xl font-bold text-gray-800 mb-14">
        Our Projects
      </h2>

      {projects.length === 0 ? (
        <p className="text-center text-gray-400">
          No projects available.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden flex flex-col"
            >
              {/* Project Image */}
              <img
                src={project.image}
                alt={project.title}
                className="h-56 w-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />

              <div className="p-6 flex flex-col flex-grow">
                {/* Project Title */}
                <h3 className="font-bold text-xl text-gray-900 mb-3">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-auto">
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
