import { useState,useEffect } from "react";
import { APPLICATION_STATUS } from "../constants/applicationStatus";
import API from "../api/axios";

const ApplicationForm = ({ onSubmit, initialData = {}, loading }) => {
  const [resumes, setResumes] = useState([]);

  const [formData, setFormData] = useState({
    companyName: initialData.companyName || "",
    role: initialData.role || "",
    location: initialData.location || "",
    source: initialData.source || "LinkedIn",
    status: initialData.status || "Applied",
    resume: initialData.resume?._id || "",
    jobLink: initialData.jobLink || "",
    notes: initialData.notes || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...formData };

  if (!payload.resume) {
    delete payload.resume;
  }

  onSubmit(payload);
    
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const { data } = await API.get("/resumes");

      setResumes(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Company</label>

        <input
          className="form-control"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Role</label>

        <input
          className="form-control"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Location</label>

        <input
          className="form-control"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Status</label>

        <select
          className="form-select"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          {APPLICATION_STATUS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label>Source</label>

        <select
          className="form-select"
          name="source"
          value={formData.source}
          onChange={handleChange}
        >
          <option>LinkedIn</option>
          <option>Naukri</option>
          <option>Indeed</option>
          <option>Referral</option>
          <option>Internshala</option>
          <option>Company Website</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Job Link</label>

        <input
          className="form-control"
          name="jobLink"
          value={formData.jobLink}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Resume Used</label>

        <select
          className="form-select"
          name="resume"
          value={formData.resume}
          onChange={handleChange}
        >
          <option value="">Select Resume</option>

          {resumes.map((resume) => (
            <option key={resume._id} value={resume._id}>
              {resume.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label>Notes</label>

        <textarea
          rows="3"
          className="form-control"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Saving..." : "Save Application"}
      </button>
    </form>
  );
};

export default ApplicationForm;
