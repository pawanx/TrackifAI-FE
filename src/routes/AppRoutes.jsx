import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import Applications from "../pages/Applications";
import KanbanBoard from "../pages/KanbanBoard";

import ProtectedRoute from "../components/ProtectedRoute";
import InterviewTracker from "../pages/InterviewTracker";
import ResumeManager from "../pages/ResumeManager";
import ResumeAnalyser from "../pages/ResumeAnalyser";
import JobPreparation from "../pages/JobPreparation";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kanban"
          element={
            <ProtectedRoute>
              <KanbanBoard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications/:id/interviews"
          element={
            <ProtectedRoute>
              <InterviewTracker />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications/:id/interviews"
          element={
            <ProtectedRoute>
              <InterviewTracker />
            </ProtectedRoute>
          }
        />
        <Route path="/resumes" element={<ProtectedRoute><ResumeManager /></ProtectedRoute>} />

        <Route path="/resume-analyser" element={<ProtectedRoute><ResumeAnalyser /></ProtectedRoute>} />

        <Route path="/job-prep" element={<ProtectedRoute><JobPreparation /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
