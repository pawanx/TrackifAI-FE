import {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

const ActivityTimeline = () => {
  const [
    activities,
    setActivities,
  ] = useState([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities =
    async () => {
      const { data } =
        await API.get(
          "/activities"
        );

      setActivities(
        data.data
      );
    };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5>
          Recent Activity
        </h5>

        {activities.map(
          (activity) => (
            <div
              key={
                activity._id
              }
              className="border-start border-3 ps-3 mb-4"
            >
              <h6>
                {
                  activity.title
                }
              </h6>

              <small className="text-muted">
                {
                  activity.description
                }
              </small>

              <br />

              <small className="text-secondary">
                {new Date(
                  activity.createdAt
                ).toLocaleString()}
              </small>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ActivityTimeline;