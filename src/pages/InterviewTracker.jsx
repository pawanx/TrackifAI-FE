import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../api/axios";
import DashboardLayout from "../layout/DashboardLayout";

const InterviewTracker = () => {
  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    round: "",
    interviewDate: "",
    interviewer: "",
    result: "Scheduled",
    notes: "",
  });

  const [application, setApplication] = useState(null);

  useEffect(() => {
    fetchApplication();
  }, []);

  const fetchApplication = async () => {
    try {
      const { data } = await API.get(`/applications/${id}`);

      setApplication(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addInterview = async (e) => {
    e.preventDefault();

    try {
      await API.post(`/interviews/${id}`, formData);

      setShowModal(false);

      setFormData({
        round: "",
        interviewDate: "",
        interviewer: "",
        result: "Scheduled",
        notes: "",
      });

      fetchApplication();
    } catch (error) {
      console.log(error);
    }
  };

  const updateInterviewResult = async (interviewId, result) => {
    try {
      await API.patch(`/interviews/${id}/${interviewId}`, { result });

      setApplication((prev) => ({
        ...prev,
        interviews: prev.interviews.map((interview) =>
          interview._id === interviewId
            ? {
                ...interview,
                result,
              }
            : interview,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteInterview = async (interviewId) => {
    const confirmDelete = window.confirm("Delete this interview?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/interviews/${id}/${interviewId}`);

      setApplication((prev) => ({
        ...prev,
        interviews: prev.interviews.filter(
          (interview) => interview._id !== interviewId,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  if (!application) {
    return <DashboardLayout>Loading...</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="container-fluid p-4">
        <h2>{application.companyName}</h2>

        <h5 className="text-muted mb-4">{application.role}</h5>

        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3">
              <h4>Interviews</h4>

              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
              >
                Add Interview
              </button>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Round</th>
                  <th>Date</th>
                  <th>Interviewer</th>
                  <th>Result</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {application.interviews?.map((interview) => (
                  <tr key={interview._id}>
                    <td>{interview.round}</td>

                    <td>
                      {interview.interviewDate
                        ? new Date(interview.interviewDate).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>{interview.interviewer}</td>

                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={interview.result}
                        onChange={(e) =>
                          updateInterviewResult(interview._id, e.target.value)
                        }
                      >
                        <option value="Scheduled">Scheduled</option>

                        <option value="Passed">Passed</option>

                        <option value="Failed">Failed</option>

                        <option value="Pending">Pending</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteInterview(interview._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Interview</h5>

                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  />
                </div>

                <form onSubmit={addInterview}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label>Round</label>

                      <input
                        className="form-control"
                        value={formData.round}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            round: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label>Interview Date</label>

                      <input
                        type="date"
                        className="form-control"
                        value={formData.interviewDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            interviewDate: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label>Interviewer</label>

                      <input
                        className="form-control"
                        value={formData.interviewer}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            interviewer: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label>Result</label>

                      <select
                        className="form-select"
                        value={formData.result}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            result: e.target.value,
                          })
                        }
                      >
                        <option>Scheduled</option>

                        <option>Passed</option>

                        <option>Failed</option>

                        <option>Pending</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label>Notes</label>

                      <textarea
                        rows="3"
                        className="form-control"
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            notes: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>

                    <button type="submit" className="btn btn-primary">
                      Save Interview
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default InterviewTracker;
