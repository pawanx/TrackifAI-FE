import { useState, useEffect } from "react";
import API from "../api/axios";
import DashboardLayout from "../layout/DashboardLayout";

const ResumeAnalyser = () => {
  const [resumeText, setResumeText] = useState("");

  const [resumes, setResumes] = useState([]);

  const [selectedResume, setSelectedResume] = useState("");

  const [jobDescription, setJobDescription] = useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    try {
      setLoading(true);
      setResult(null);
      const { data } = await API.post("/ai/resume-match", {
        resumeId: selectedResume,
        jobDescription,
      });

      setResult(data.result);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    const { data } = await API.get("/resumes");

    setResumes(data.data);
  };

  return (
    <DashboardLayout>
      <div className="container">
        <div className="mb-4">
          <h2>🤖 AI Resume Analyzer</h2>

          <p className="text-muted">
            Compare your uploaded resume against a job description and get an
            AI-powered match score.
          </p>
        </div>

        <div className="mb-3">
          <label>Select Resume</label>

          <select
            className="form-select"
            value={selectedResume}
            onChange={(e) => setSelectedResume(e.target.value)}
          >
            <option value="">Select Resume</option>

            {resumes.map((resume) => (
              <option key={resume._id} value={resume._id}>
                {resume.title}
              </option>
            ))}
          </select>
        </div>

        <textarea
          className="form-control mb-3"
          rows="8"
          placeholder="Paste Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={analyze}
          disabled={loading || !selectedResume || !jobDescription}
        >
          {loading ? "Analyzing Resume..." : "Analyze"}
        </button>

        {loading && (
          <div className="card mt-4 shadow-sm">
            <div className="card-body text-center p-5">
              <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>

              <h5>🤖 AI Analysis in Progress</h5>

              <p className="text-muted mb-0">Reading resume...</p>

              <p className="text-muted mb-0">Matching skills...</p>

              <p className="text-muted mb-0">Calculating score...</p>

              <p className="text-muted">Generating recommendations...</p>
            </div>
          </div>
        )}

        {result && (
          <div className="card mt-4 p-3">
            <h4>
              Match Score:
              {result.matchScore}%
            </h4>

            <h5>Matched Skills</h5>
            <ul>
              {result.matchedSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>

            <h5>Missing Skills</h5>
            <ul>
              {result.missingSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>

            <div>
              <h5>💡 Suggestions</h5>

              <ul>
                {result.suggestions?.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ResumeAnalyser;
