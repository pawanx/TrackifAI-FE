import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaBars } from "react-icons/fa";
import { Offcanvas } from "bootstrap";
import { useLocation } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const offcanvasElement = document.getElementById("mobileSidebar");

    if (!offcanvasElement) return;

    const instance = Offcanvas.getInstance(offcanvasElement);

    if (instance) {
      instance.hide();
    }

    document
      .querySelectorAll(".offcanvas-backdrop")
      .forEach((el) => el.remove());

    document.body.classList.remove("offcanvas-backdrop");
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }, [location.pathname]);

  
  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileSidebar"
      >
        <div className="offcanvas-header">
          <h5 className="mb-0">🚀 TrackifAI</h5>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          />
        </div>

        <div className="offcanvas-body p-0">
          <Sidebar />
        </div>
      </div>

      <div className="d-flex">
        {/* Desktop Sidebar */}
        <div className="d-none d-lg-block">
          <Sidebar />
        </div>

        <div
          style={{
            flex: 1,
            height: "100vh",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {/* Mobile Menu Button */}
          <div className="d-lg-none p-2 border-bottom bg-white">
            <button
              className="btn btn-primary"
              data-bs-toggle="offcanvas"
              data-bs-target="#mobileSidebar"
            >
              <FaBars />
            </button>
          </div>

          <Navbar />

          <div className="p-3">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
