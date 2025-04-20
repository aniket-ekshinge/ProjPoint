// src/services/api.js

import axios from "axios";

// Base URLs
const AUTH_BASE_URL = "http://127.0.0.1:8000/api/auth";
const STUDENT_BASE_URL = "http://127.0.0.1:8000/api/students";
const PROJECT_BASE_URL = "http://127.0.0.1:8000/api/projects";
const FEEDBACK_BASE_URL = "http://127.0.0.1:8000/api/feedback";
const RECOMMENDATION_BASE_URL = "http://127.0.0.1:8000/api/recommend";
const QUERIES_BASE_URL = "http://127.0.0.1:8000/api/queries";

// Auth API instance
const authAPI = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const studentAPI = axios.create({
  baseURL: STUDENT_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// **Project API (no default headers)**  
// Let Axios auto‑detect multipart when you send FormData
const projectAPI = axios.create({
  baseURL: PROJECT_BASE_URL,
});

// Feedback API instance
const feedbackAPI = axios.create({
  baseURL: FEEDBACK_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Recommendation API instance (newly added)
const recommendAPI = axios.create({
  baseURL: RECOMMENDATION_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const queriesAPI = axios.create({ 
  baseURL: QUERIES_BASE_URL });

// 🛡️ Interceptors for Authorization Header
const addAuthInterceptor = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Token ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        console.error("API error:", JSON.stringify(error.response.data));
      } else {
        console.error("API error:", error.message);
      }

      return Promise.reject(error.response?.data || { error: error.message });
    }
  );
};

// ✅ Apply interceptors to all instances
[authAPI, studentAPI, projectAPI, feedbackAPI, recommendAPI, queriesAPI].forEach(addAuthInterceptor);

// ==============================
// 🔐 Authentication
// ==============================
export const userLogin = async (credentials) => {
  const response = await authAPI.post("/user-login/", credentials);
  return response.data;
};

export const adminLogin = async (credentials) => {
  const response = await authAPI.post("/admin-login/", credentials);
  return response.data;
};


export const uploadStudents = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await studentAPI.post("/upload-students/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// ==============================
// 👤 User Profile & Settings
// ==============================

export const fetchUserProfile = async () => {
  const response = await authAPI.get("/profile/");
  return response.data;
};

export const updatePassword = async (passwordData) => {
  const response = await authAPI.post("/change-password/", passwordData);
  return response.data;
};

export const updateAcademicYear = async (yearData) => {
  const response = await authAPI.put("/update-my-academic-year/", yearData);
  return response.data;
};

// Projects

export { projectAPI };

export const fetchProjects = () => 
  projectAPI.get("/").then(res => res.data);

export const fetchProject = (id) =>
  projectAPI.get(`/${id}/details/`).then(res => res.data);

export const createProject = (formData) =>
  projectAPI.post("/", formData).then(res => res.data);

export const requestDownload = (data) => 
  projectAPI.post("/create-download-request/", data).then(res => res.data);

export const fetchDownloadRequests = () => 
  projectAPI.get("/list-download-requests/").then(res => res.data);

export const approveDownloadRequest = (id, status) => 
  projectAPI.put(`/download-request/${id}/approve/`, { status }).then(res => res.data);



// ==============================
// 📝 Feedback
// ==============================
export const getFeedbacks = async (projectId) => {
  const response = await feedbackAPI.get(`/?project=${projectId}`);
  return response.data;
};

export const submitFeedback = async (feedbackData) => {
  const response = await feedbackAPI.post("/", feedbackData);
  return response.data;
};



// ==============================
// 🔍 Project Recommendations (NEW ENDPOINT)
// ==============================
export const RecommendProjects = async (query) => {
  const payload = { query};
  const response = await recommendAPI.post("/recommend/", payload);
  return response.data;
};

// Queries //

export const fetchQueries = () =>
  queriesAPI.get('/queries/')
    .then(res => res.data);

export const fetchQuery = (id) =>
  queriesAPI.get(`/queries/${id}/`)
    .then(res => res.data);

export const createQuery = (data) =>
  queriesAPI.post('/queries/', data)
    .then(res => res.data);

export const createAnswer = (queryId, data) =>
  queriesAPI.post(
        `/queries/${queryId}/answers/`, 
        { ...data, query: queryId }    // add the `query` field
      ).then(res => res.data);

export const updateProject = (id, formData) =>
  projectAPI.patch(`/${id}/`, formData).then(res => res.data);

export const deleteProject = (id) =>
  projectAPI.delete(`/${id}/`).then(res => res.data);