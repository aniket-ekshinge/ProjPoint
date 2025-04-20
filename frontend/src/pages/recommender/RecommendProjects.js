import React, { useState } from "react";
import { toast } from "react-toastify";
import { RecommendProjects as getRecommendations } from "../../services/api";

const RecommendProjects = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return toast.error("Please enter your interest or query");

    try {
      const data = await getRecommendations(query); // no filters now
      setResults(data);
    } catch (err) {
      toast.error("Failed to get recommendations");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Project Recommendation System</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your interest or idea..."
          required
          style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
        />
        <br /><br />
        <button type="submit">Get Recommendations</button>
      </form>

      {results.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Recommendations:</h3>
          {results.map((proj, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "1rem",
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <h4>{proj.Title}</h4>
              <p><strong>Domain:</strong> {proj.Domain}</p>
              <p><strong>Complexity:</strong> {proj.Complexity}</p>
              <p><strong>Keywords:</strong> {proj.Keywords}</p>
              <p><strong>Description:</strong> {proj.Description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendProjects;
