// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UserLogin from "./pages/auth/UserLogin";
import AdminLogin from "./pages/auth/AdminLogin";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UploadStudents from './pages/admin/UploadStudents';
import UserDashboard from "./pages/users/UserDashboard";
import ViewProfile from "./pages/users/ViewProfile";
import ChangePassword from "./pages/users/ChangePassword";
import UpdateAcademicYear from "./pages/users/UpdateAcademicYear";
import ProjectList from "./pages/projects/ProjectList";
import CreateProject from "./pages/projects/CreateProject";
import ProjectDetail from "./pages/projects/ProjectDetail";
import AdminDownloadRequests from "./pages/admin/AdminDownloadRequests";
import EditProject from "./pages/projects/EditProject";
import RecommendProjects from "./pages/recommender/RecommendProjects";
import QueryList from './pages/queries/QueryList';
import QueryDetail from './pages/queries/QueryDetail';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/upload-students" element={<PrivateRoute><UploadStudents /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
        <Route path="/user/profile" element={<PrivateRoute><ViewProfile /></PrivateRoute>}/>
        <Route path="/user/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>}/>
        <Route path="/user/update-academic-year" element={<PrivateRoute><UpdateAcademicYear /></PrivateRoute>}/>
        <Route path="/projects" element={<PrivateRoute><ProjectList/></PrivateRoute>} />
        <Route path="/projects/create" element={<PrivateRoute><CreateProject/></PrivateRoute>} />
        <Route path="/projects/:id" element={<PrivateRoute><ProjectDetail/></PrivateRoute>} />
        <Route path="/admin/download-requests" element={<PrivateRoute adminOnly><AdminDownloadRequests/></PrivateRoute>} />
        <Route path="/projects/:id/edit" element={<PrivateRoute><EditProject/></PrivateRoute>}/>
        <Route path="/recommender/recommend" element={<PrivateRoute><RecommendProjects/></PrivateRoute>}/>
        <Route path="/queries" element={<PrivateRoute><QueryList/></PrivateRoute>} />
        <Route path="/queries/:id" element={<PrivateRoute><QueryDetail/></PrivateRoute>} />
      </Routes>

      {/* ✅ Toast Notifications will now work globally */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Router>
  );
}

export default App;
