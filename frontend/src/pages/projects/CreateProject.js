import React, { useState, useContext, useEffect } from "react";
import { createProject } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const CreateProject = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      toast.info("Please login to create a project.");
      navigate("/login/user");
    }
  }, [token, navigate]);

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
    for (const key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }

    setSubmitting(true);
    try {
      await createProject(formData);
      toast.success("Project created successfully.");
      navigate("/projects");
    } catch (err) {
      const message = err.detail || "Failed to create project.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-lg mx-auto" autoComplete="off">
      <h2 className="text-2xl font-semibold text-center">Create Project</h2>

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
          required
          className="w-full"
        />
        {fileNames.source_code && <p className="text-sm mt-1">Selected: {fileNames.source_code}</p>}
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
        {fileNames.documentation && <p className="text-sm mt-1">Selected: {fileNames.documentation}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
};

export default CreateProject;
