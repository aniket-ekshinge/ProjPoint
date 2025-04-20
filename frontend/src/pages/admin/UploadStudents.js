import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

const UploadStudents = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext); // Get token from AuthContext

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/auth/upload-students/",
        formData,
        {
          headers: {
            'Authorization': `Token ${token}`, // Use the token from AuthContext
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed.");
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Upload Student Excel File</h2>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {error && <p style={styles.error}>{error}</p>}
      {response && (
        <div style={styles.response}>
          <h3>Upload Result:</h3>
          <p><strong>Created:</strong> {response.created?.length || 0}</p>
          {response.errors && (
            <>
              <h4>Errors:</h4>
              <ul>
                {response.errors.map((err, index) => (
                  <li key={index}>{Object.entries(err)[0].join(": ")}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    margin: '2rem auto',
    maxWidth: '500px',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: '1rem',
  },
  response: {
    marginTop: '1rem',
    textAlign: 'left',
  },
};

export default UploadStudents;
