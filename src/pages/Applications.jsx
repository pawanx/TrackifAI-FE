import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

import DashboardLayout from "../layout/DashboardLayout";
import ApplicationForm from "../components/ApplicationForm";
import { APPLICATION_STATUS } from "../constants/applicationStatus";
import "../styles/application.css";

const Applications = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [applicationToDelete, setApplicationToDelete] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [editingApplication, setEditingApplication] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [applications, setApplications] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [source, setSource] = useState("");

  useEffect(() => {
    fetchApplications();
  }, [search, status, source, currentPage]);

  const updateApplication = async (formData) => {
    try {
      setLoading(true);

      await API.put(`/applications/${editingApplication._id}`, formData);

      setShowEditModal(false);

      setEditingApplication(null);

      fetchApplications();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addApplication = async (formData) => {
    try {
      setLoading(true);

      await API.post("/applications", formData);

      setShowModal(false);

      fetchApplications();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    setFetching(true);
    try {
      const params = new URLSearchParams();

      if (search) params.append("search", search);

      if (status) params.append("status", status);

      if (source) params.append("source", source);

      params.append("page", currentPage);

      params.append("limit", 10);

      const { data } = await API.get(`/applications?${params}`);

      setApplications(data.data);

      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  const deleteApplication = async () => {
    if (!applicationToDelete) return;

    try {
      await API.delete(`/applications/${applicationToDelete._id}`);

      fetchApplications();

      setShowDeleteModal(false);
      setApplicationToDelete(null);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Offer":
        return "bg-success";

      case "Interview":
        return "bg-info";

      case "Assessment":
        return "bg-primary";

      case "Rejected":
        return "bg-danger";

      case "Applied":
        return "bg-warning";

      default:
        return "bg-secondary";
    }
  };

  return (
    <DashboardLayout>
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-4 application-header">
          <div>
            <h2>Job Applications</h2>

            <p className="text-muted mb-0">
              Manage and track your application pipeline
            </p>
          </div>

          <button
            className="btn btn-primary btn-sm add-application-btn"
            onClick={() => setShowModal(true)}
          >
            Add Application
          </button>
        </div>

        {/* Filters */}

        <div className="row mb-4">
          <div className="col-md-4">
            <input
              type="text"
              placeholder="Search..."
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Status</option>

              {APPLICATION_STATUS.map((statusItem) => (
                <option key={statusItem} value={statusItem}>
                  {statusItem}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            >
              <option value="">All Sources</option>

              <option value="LinkedIn">LinkedIn</option>

              <option value="Naukri">Naukri</option>

              <option value="Indeed">Indeed</option>

              <option value="Internshala">Internshala</option>

              <option value="Referral">Referral</option>
            </select>
          </div>
        </div>

        {/* Table */}

        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Company</th>

                  <th>Role</th>

                  <th>Status</th>

                  <th>Source</th>

                  <th>Applied Date</th>

                  <th>Resume</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {fetching ? (
                  <tr>
                    <td colSpan="7" className="text-center p-5">
                      Loading applications...
                    </td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-5">
                      No applications found
                    </td>
                  </tr>
                ) : (
                  applications.map((application) => (
                    <tr key={application._id}>
                      <td>{application.companyName}</td>

                      <td>{application.role}</td>

                      <td>
                        <span
                          className={`badge ${getStatusClass(
                            application.status,
                          )}`}
                        >
                          {application.status}
                        </span>
                      </td>

                      <td>{application.source}</td>

                      <td>
                        {new Date(
                          application.applicationDate,
                        ).toLocaleDateString()}
                      </td>

                      <td>{application.resume?.title || "-"}</td>

                      <td className="text-nowrap">
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => {
                            setEditingApplication(application);

                            setShowEditModal(true);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            setApplicationToDelete(application);
                            setShowDeleteModal(true);
                          }}
                        >
                          Delete
                        </button>

                        <Link
                          to={`/applications/${application._id}/interviews`}
                          className="btn btn-sm btn-info me-2 mx-2"
                        >
                          Interviews
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-outline-primary me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <span className="align-self-center">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-outline-primary ms-2"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>

        {showModal && (
          <>
            <div className="modal d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Application</h5>

                    <button
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                    />
                  </div>

                  <div className="modal-body">
                    <ApplicationForm
                      onSubmit={addApplication}
                      loading={loading}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show"></div>
          </>
        )}
        {showEditModal && (
          <>
            <div className="modal d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Application</h5>

                    <button
                      className="btn-close"
                      onClick={() => setShowEditModal(false)}
                    />
                  </div>

                  <div className="modal-body">
                    <ApplicationForm
                      initialData={editingApplication}
                      onSubmit={updateApplication}
                      loading={loading}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show"></div>
          </>
        )}

        {showDeleteModal && (
          <>
            <div className="modal d-block">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Delete Application</h5>

                    <button
                      className="btn-close"
                      onClick={() => setShowDeleteModal(false)}
                    />
                  </div>

                  <div className="modal-body">
                    <p>Are you sure you want to delete this application?</p>

                    <div className="alert alert-warning mb-0">
                      <strong>{applicationToDelete?.companyName}</strong>

                      {applicationToDelete?.role &&
                        ` - ${applicationToDelete.role}`}
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={deleteApplication}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show"></div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Applications;
