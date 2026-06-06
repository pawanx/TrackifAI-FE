import { useState,useEffect } from "react";
import API from "../api/axios";
import DashboardLayout from "../layout/DashboardLayout";

const ResumeManager = () => {
  const [resumes, setResumes] = useState([]);

  const [title, setTitle] = useState("");

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);

    formData.append("resume", file);

    try {
      await API.post("/resumes", formData);

      alert("Resume uploaded successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchResumes = async () => {
    try {
      const { data } = await API.get("/resumes");

      setResumes(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mt-5">
        <div className="card p-4">
          <h3>Upload Resume</h3>

          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3"
              placeholder="Resume Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="file"
              accept=".pdf"
              className="form-control mb-3"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <button className="btn btn-primary">Upload</button>
          </form>
        </div>

        <div className="mt-4">
  <h4>My Resumes</h4>

  {resumes.map((resume) => (
    <div
      key={resume._id}
      className="card p-3 mb-2"
    >
      <h6>{resume.title}</h6>

      <a
        href={resume.resumeUrl}
        target="_blank"
        rel="noreferrer"
      >
        View Resume
      </a>
    </div>
  ))}
</div>
      </div>
    </DashboardLayout>
  );
};

export default ResumeManager;
