import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projectAPI, fetchProject, requestDownload, deleteProject } from "../../services/api";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import FeedbackSection from "../feedback/FeedbackSection";
import { AuthContext } from "../../context/AuthContext";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [project, setProject] = useState(null);
  const [desc, setDesc] = useState("");

  useEffect(() => {
    fetchProject(id)
      .then(setProject)
      .catch(() => toast.error("Failed to fetch project."));
  }, [id]);

  const handleRequest = () => {
    requestDownload({ project: id, description: desc })
      .then(() => {
        toast.success("Request sent successfully.");
        setDesc("");
        return fetchProject(id);
      })
      .then(setProject)
      .catch(() => toast.error("Failed to send request."));
  };

  const handleDownload = async () => {
    try {
      const fileURL = project.source_code_url;
      const response = await projectAPI.get(fileURL, { responseType: "blob" });
      const filename = fileURL.split("/").pop();
      saveAs(response.data, filename);
      toast.success("Download started!");
    } catch (error) {
      toast.error("Failed to download file.");
      console.error("Download error:", error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Really delete this project?")) return;
    try {
      await deleteProject(id);
      toast.success("Project deleted.");
      navigate("/projects");
    } catch {
      toast.error("Delete failed.");
    }
  };

  if (!project) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{project.title}</h2>
        <div className="space-x-2">
          {/* Edit button for owner */}
          {user?.username === project.owner && (
            <button
              onClick={() => navigate(`/projects/${id}/edit`)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
          )}
          {/* Delete button for admin */}
          {user?.is_staff && (
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <p className="mt-4">{project.description}</p>
      <p className="mt-2"><strong>Tech Stack:</strong> {project.technology_stack}</p>
      <p className="mt-2"><strong>Future Scope:</strong> {project.future_scope}</p>

      {project.documentation_url && (
        <p className="mt-2">
          <a
            href={project.documentation_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Documentation
          </a>
        </p>
      )}

      <div className="mt-4">
        {project.has_access ? (
          <div>
            ✅ Access granted!
            <br />
            <button
              onClick={handleDownload}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
            >
              Download Source Code
            </button>
          </div>
        ) : project.request_status === "pending" ? (
          <p>⏳ Your request is pending approval.</p>
        ) : project.request_status === "rejected" ? (
          <p>❌ Your request was rejected.</p>
        ) : (
          <div className="mt-4">
            <h3 className="font-medium">Request Access to Source Code</h3>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Enter reason for request"
              className="w-full p-2 border rounded h-24 mt-2"
            />
            <button
              onClick={handleRequest}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit Request
            </button>
          </div>
        )}
      </div>

      <div className="mt-6">
        <FeedbackSection projectId={project.id} />
      </div>
    </div>
  );
};

export default ProjectDetail;
