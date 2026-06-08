import { useState } from "react";
import API from "../api/axios";
import DashboardLayout from "../layout/DashboardLayout";

const JobPreparation = () => {
  const [jobDescription, setJobDescription] = useState("");

  const [questions, setQuestions] = useState(null);

  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {
    try {
      setLoading(true);

      const { data } = await API.post("/ai/interview-questions", {
        jobDescription,
      });

      setQuestions(data.result);
    } finally {
      setLoading(false);
    }
  };
  return (
    <DashboardLayout>
      <div>
        <div className="mb-4">
          <h2>AI Job Preparation Assistant</h2>

          <p className="text-muted">
            Paste a Job Description and get a personalized interview preparation
            plan, study topics, required skills, and interview questions.
          </p>
        </div>

        <textarea
          rows="10"
          className="form-control mb-3"
          placeholder="Paste Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <button className="btn btn-primary" onClick={generateQuestions}>
          Generate Questions
        </button>

        {loading && (
          <div className="card mt-4 p-4 text-center">
            <div
              className="spinner-border text-primary mb-3"
              role="status"
            ></div>

            <h5>🤖 Preparing Your Interview Plan</h5>

            <p className="text-muted mb-0">Analyzing Job Description...</p>

            <p className="text-muted mb-0">Finding Required Skills...</p>

            <p className="text-muted">Generating Questions...</p>
          </div>
        )}

        {questions && (
          <div className="mt-4">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h4>Skills To Study</h4>

                <ul className="mb-0">
                  {questions.skillsToStudy?.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h4>Important Topics</h4>

                <ul className="mb-0">
                  {questions.importantTopics?.map((topic, i) => (
                    <li key={i}>{topic}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h4>Technical Questions</h4>

                <ol className="mb-0">
                  {questions.technical?.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h4>Behavioral Questions</h4>

                <ol className="mb-0">
                  {questions.behavioral?.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="card shadow-sm">
              <div className="card-body">
                <h4>System Design Questions</h4>

                <ol className="mb-0">
                  {questions.systemDesign?.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default JobPreparation;
