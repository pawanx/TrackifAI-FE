import { useState } from "react";
import API from "../api/axios";
import DashboardLayout from "../layout/DashboardLayout";

const JobPreparation = () => {
  const [jobDescription, setJobDescription] = useState("");

  const [questions, setQuestions] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const generateQuestions = async () => {
    try {
      setLoading(true);
      setError("");
      setQuestions(null);

      const { data } = await API.post("/ai/interview-questions", {
        jobDescription,
      });

      setQuestions(data.result);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to generate interview questions.",
      );
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

        {error && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {error}

            <button
              type="button"
              className="btn-close"
              onClick={() => setError("")}
            ></button>
          </div>
        )}

        <textarea
          rows="10"
          className="form-control mb-3"
          placeholder="Paste Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={generateQuestions}
          disabled={loading}
        >
          {loading ? "Generating Questions..." : "Generate Questions"}
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

                <div className="d-flex flex-wrap gap-2">
                  {questions.skillsToStudy?.map((skill, i) => (
                    <span key={i} className="badge bg-primary px-3 py-2">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h4>Important Topics</h4>

                <div className="d-flex flex-wrap gap-2">
                  {questions.importantTopics?.map((topic, i) => (
                    <span key={i} className="badge bg-secondary px-3 py-2">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>


            <div className="card shadow-sm">
              <div className="card-body">
                <ul
                  className="nav nav-tabs mb-3"
                  id="questionTabs"
                  role="tablist"
                >
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      data-bs-toggle="tab"
                      data-bs-target="#technical"
                      type="button"
                    >
                      Technical
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#behavioral"
                      type="button"
                    >
                      Behavioral
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#system"
                      type="button"
                    >
                      System Design
                    </button>
                  </li>
                </ul>

                <div className="tab-content">
                  <div className="tab-pane fade show active" id="technical">
                    <div className="d-flex flex-column gap-3">
                      {questions.technical?.map((q, i) => (
                        <div
                          key={i}
                          className="card border-start border-4 border-primary"
                        >
                          <div className="card-body">
                            <h6 className="text-primary">
                              Technical Question #{i + 1}
                            </h6>

                            <p className="mb-0">{q}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="tab-pane fade" id="behavioral">
                    <div className="d-flex flex-column gap-3">
                      {questions.behavioral?.map((q, i) => (
                        <div
                          key={i}
                          className="card border-start border-4 border-success"
                        >
                          <div className="card-body">
                            <h6 className="text-success">
                              Behavioral Question #{i + 1}
                            </h6>

                            <p className="mb-0">{q}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="tab-pane fade" id="system">
                    <div className="d-flex flex-column gap-3">
                      {questions.systemDesign?.map((q, i) => (
                        <div
                          key={i}
                          className="card border-start border-4 border-warning"
                        >
                          <div className="card-body">
                            <h6 className="text-warning">
                              System Design Question #{i + 1}
                            </h6>

                            <p className="mb-0">{q}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default JobPreparation;
