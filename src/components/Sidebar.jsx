import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBriefcase,
  FaFileAlt,
  FaRobot,
  FaClipboardList,
  FaColumns,
} from "react-icons/fa";

import "../styles/sidebar.css"

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "sidebar-link active" : "sidebar-link";

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        TrackifAI
      </div>

      

      <small className="sidebar-section">
        MAIN
      </small>

      <Link
        to="/dashboard"
        className={isActive("/dashboard")}
        
      >
        <FaHome />
        <span>Dashboard</span>
      </Link>

      <Link
        to="/applications"
        className={isActive("/applications")}
      >
        <FaBriefcase />
        <span>Applications</span>
      </Link>

      <Link
        to="/kanban"
        className={isActive("/kanban")}
      >
        <FaColumns />
        <span>Kanban Board</span>
      </Link>

      <small className="sidebar-section mt-4">
        AI TOOLS
      </small>

      <Link
        to="/resumes"
        className={isActive("/resumes")}
      >
        <FaFileAlt />
        <span>Resumes</span>
      </Link>

      <Link
        to="/resume-analyser"
        className={isActive("/resume-analyser")}
      >
        <FaRobot />
        <span>Resume Analyzer</span>
      </Link>

      <Link
        to="/job-prep"
        className={isActive("/job-prep")}
      >
        <FaClipboardList />
        <span>Job Preparation</span>
      </Link>

      <div className="sidebar-footer">
        <div className="stats-card">
          <small>Track Your Progress</small>
          <p className="mb-0">
            Stay consistent 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;