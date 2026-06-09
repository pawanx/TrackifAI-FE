import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import "../styles/auth.css";
import { motion } from "framer-motion";

import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      const { data } = await API.post("/auth/register", formData);

      console.log("REGISTER RESPONSE:", data);

      login(data.token, data.user);

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
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
            {/* Branding Section */}
            <div className="col-md-6 bg-dark text-white d-flex flex-column justify-content-center p-5">
              <h1 className="fw-bold display-4">TrackifAI</h1>

              <p className="lead mt-3">AI Powered Job Application Tracker</p>

              <hr />

              <h3 className="mt-3">Start Your Career Journey 🚀</h3>

              <p className="text-light-emphasis mt-3">
                Join TrackifAI and organize your job search smarter with
                AI-powered tools.
              </p>

              <div className="mt-4">
                <div className="mb-3">🎯 Track Job Applications</div>

                <div className="mb-3">🤖 AI Interview Preparation</div>

                <div className="mb-3">📊 Progress Analytics</div>

                <div>🚀 Land Your Dream Job Faster</div>
              </div>
            </div>

            {/* Register Form */}
            <div
              className="col-md-6 p-5"
              style={{
                background: "rgba(255,255,255,0.95)",
              }}
            >
              <h2 className="text-center mb-4">Create Account</h2>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Name</label>

                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUser />
                    </span>

                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

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
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button
                  className="btn btn-primary w-100 py-2"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Register"}
                </button>
              </form>

              <p className="mt-4 text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="fw-semibold text-decoration-none auth-switch"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
