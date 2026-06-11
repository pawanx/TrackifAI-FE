import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

const ResetPassword = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setMessage(
        "Passwords do not match"
      );
    }

    try {
      setLoading(true);

      const { data } = await API.post(
        `/auth/reset-password/${token}`,
        { password }
      );

      setMessage(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card mx-auto shadow"
        style={{ maxWidth: "450px" }}
      >
        <div className="card-body">
          <h3 className="text-center mb-4">
            Reset Password
          </h3>

          {message && (
            <div className="alert alert-info">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>New Password</label>

              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />
            </div>

            <div className="mb-3">
              <label>
                Confirm Password
              </label>

              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
              />
            </div>

            <button
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading
                ? "Updating..."
                : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;