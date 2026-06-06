import { useEffect, useState } from "react";
import API from "../api/axios";

const RecentApplications = () => {
  const [applications, setApplications] =
    useState([]);

  useEffect(() => {
    fetchRecentApplications();
  }, []);

  const fetchRecentApplications =
    async () => {
      try {
        const { data } =
          await API.get(
            "/applications/recent"
          );

        setApplications(
          data.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const getBadgeClass = (
    status
  ) => {
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
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="mb-4">
          Recent Applications
        </h5>

        {applications.length ===
        0 ? (
          <p>
            No applications yet.
          </p>
        ) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {applications.map(
                  (
                    application
                  ) => (
                    <tr
                      key={
                        application._id
                      }
                    >
                      <td>
                        {
                          application.companyName
                        }
                      </td>

                      <td>
                        {
                          application.role
                        }
                      </td>

                      <td>
                        <span
                          className={`badge ${getBadgeClass(
                            application.status
                          )}`}
                        >
                          {
                            application.status
                          }
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentApplications;