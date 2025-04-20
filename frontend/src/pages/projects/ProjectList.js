import React, { useEffect, useState } from "react";
import { fetchProjects } from "../../services/api";
import { Link } from "react-router-dom";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  return (
    <div>
      <h2>All Projects</h2>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {projects.map((project) => (
            <li key={project.id} style={{ marginBottom: "1.5rem" }}>
              <Link to={`/projects/${project.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <h3 style={{ margin: 0 }}>{project.title}</h3>
              </Link>
              <p style={{ margin: "0.5rem 0 0" }}>{project.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;