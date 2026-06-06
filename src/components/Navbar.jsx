import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav
      className="navbar navbar-light bg-white border-bottom px-4"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "white",
      }}
    >
      <span>Welcome, {user?.name}</span>

      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
