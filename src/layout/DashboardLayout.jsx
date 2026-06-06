import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />

      <div
        style={{
          flex: 1,
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Navbar />

        <div className="p-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;