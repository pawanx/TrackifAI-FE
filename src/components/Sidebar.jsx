import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
         width: "250px",
    minWidth: "250px",
    flexShrink: 0,
    minHeight: "100vh",
      }}
    >
      <h3 className="mb-4">TrackifAI</h3>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link
            className={`nav-link text-white ${
              location.pathname === "/dashboard" ? "fw-bold" : ""
            }`}
            to="/dashboard"
          >
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/applications">
            Applications
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/kanban">
            Kanban Board
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/Resumes">
            Resumes
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/resume-analyser">
            Analyse Resume
          </Link>
        </li>
         <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/job-prep">
            Job Preparation
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
