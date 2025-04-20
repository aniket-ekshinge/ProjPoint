import React, { useState, useEffect, useContext } from "react";
import { fetchProject, updateProject } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [data, setData] = useState({
    title: "",
    description: "",
    technology_stack: "",
    future_scope: "",
    source_code: null,
    documentation: null,
  });
  const [fileNames, setFileNames] = useState({ source_code: "", documentation: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetchProject(id)
      .then((proj) => {
        setData({
          title: proj.title,
          description: proj.description,
          technology_stack: proj.technology_stack,
          future_scope: proj.future_scope,
          source_code: null,
          documentation: null,
        });
      })
      .catch(() => toast.error("Failed to load project."));
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setData((prev) => ({ ...prev, [name]: file }));
      setFileNames((prev) => ({ ...prev, [name]: file.name }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      if (val) formData.append(key, val);
    });

    setSubmitting(true);
    try {
      await updateProject(id, formData);
      toast.success("Project updated.");
      navigate(`/projects/${id}`);
    } catch {
      toast.error("Update failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-lg mx-auto" autoComplete="off">
      <h2 className="text-2xl font-semibold text-center">Edit Project</h2>

      <input
        name="title"
        value={data.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="w-full p-2 border rounded"
      />

      <textarea
        name="description"
        value={data.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="w-full p-2 border rounded h-24"
      />

      <input
        name="technology_stack"
        value={data.technology_stack}
        onChange={handleChange}
        placeholder="Tech Stack"
        required
        className="w-full p-2 border rounded"
      />

      <textarea
        name="future_scope"
        value={data.future_scope}
        onChange={handleChange}
        placeholder="Future Scope"
        required
        className="w-full p-2 border rounded h-24"
      />

      <div>
        <label className="block mb-1 font-medium">Source Code (ZIP)</label>
        <input
          type="file"
          name="source_code"
          accept=".zip"
          onChange={handleChange}
          className="w-full"
        />
        {fileNames.source_code && (
          <p className="text-sm mt-1">Selected: {fileNames.source_code}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Documentation (optional)</label>
        <input
          type="file"
          name="documentation"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
          className="w-full"
        />
        {fileNames.documentation && (
          <p className="text-sm mt-1">Selected: {fileNames.documentation}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditProject;
        