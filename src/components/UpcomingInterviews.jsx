import {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

const UpcomingInterviews =
  () => {
    const [
      interviews,
      setInterviews,
    ] = useState([]);

    useEffect(() => {
      fetchInterviews();
    }, []);

    const fetchInterviews =
      async () => {
        try {
          const { data } =
            await API.get(
              "/interviews/upcoming"
            );

          setInterviews(
            data.data
          );
        } catch (error) {
          console.log(error);
        }
      };

    return (
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h5 className="mb-3">
            Upcoming Interviews
          </h5>

          {interviews.length ===
          0 ? (
            <p className="text-muted">
              No upcoming
              interviews
            </p>
          ) : (
            interviews.map(
              (
                interview,
                index
              ) => (
                <div
                  key={index}
                  className="border-bottom pb-2 mb-2"
                >
                  <h6>
                    {
                      interview.companyName
                    }
                  </h6>

                  <small>
                    {
                      interview.round
                    }
                  </small>

                  <br />

                  <small className="text-muted">
                    {new Date(
                      interview.interviewDate
                    ).toLocaleDateString()}
                  </small>
                </div>
              )
            )
          )}
        </div>
      </div>
    );
  };

export default UpcomingInterviews;