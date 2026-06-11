import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock,FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import "../styles/auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword,setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const { data } = await API.post("/auth/login", formData);

      login(data.token, data.user);

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.35,
      }}
    >
      <div className="min-vh-100 d-flex align-items-center justify-content-center auth-page">
        <div className="container">
          <div className="row auth-card overflow-hidden">
            {/* Left Side */}
            <div className="col-md-6 bg-dark text-white d-flex flex-column justify-content-center p-5">
              <h1 className="fw-bold display-4">TrackifAI</h1>

              <p className="lead mt-3">AI Powered Job Application Tracker</p>

              <hr />

              <div className="mt-4">
                <div className="mb-3">🎯 Track Job Applications</div>

                <div className="mb-3">🤖 AI-Powered Interview Prep</div>

                <div className="mb-3">📈 Monitor Your Progress</div>

                <div>🚀 Land Your Dream Job Faster</div>
              </div>
            </div>

            {/* Right Side */}
            <div
              className="col-md-6 p-5"
              style={{
                background: "rgba(255,255,255,0.95)",
              }}
            >
              <h2 className="mb-4 text-center">Login</h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Email</label>

                  <div className="input-group">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label>Password</label>

                  <div className="input-group">
                    <span className="input-group-text">
                      <FaLock />
                    </span>

                    <input
                       type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                     <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button
                  className="btn btn-primary w-100 py-2"
                  disabled={loading}
                  className="btn btn-primary w-100 py-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>

              <p className="text-center mt-4">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="fw-semibold text-decoration-none auth-switch"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
