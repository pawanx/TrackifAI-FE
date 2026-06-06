import { useEffect, useState } from "react";
import API from "../api/axios"
import DashboardLayout from "../layout/DashboardLayout";
import StatusChart from "../components/charts/StatusChart";
import RecentApplications from "../components/RecentApplications";
import UpcomingInterviews from "../components/UpcomingInterviews";
import MonthlyChart from "../components/charts/MonthlyChart";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await API.get("/applications/stats");

      setStats(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
    return (
      <DashboardLayout>
        <div className="container-fluid p-4">
          <h4>Loading Dashboard...</h4>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container-fluid p-4">
        {/* Header */}
        <div className="mb-4">
          <h2>Dashboard</h2>
          <p className="text-muted">Track your job applications and progress</p>
        </div>

        {/* Main Stats */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-muted">Total Applications</h6>

                <h2>{stats.totalApplications}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-muted">Interviews</h6>

                <h2>{stats.interview}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-muted">Offers</h6>

                <h2>{stats.offer}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-muted">Rejected</h6>

                <h2>{stats.rejected}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Rate Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-muted">Interview Rate</h6>

                <h2>{stats.interviewRate || 0}%</h2>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-muted">Offer Rate</h6>

                <h2>{stats.offerRate || 0}%</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="mb-3">Application Status</h5>

                <StatusChart stats={stats} />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="mb-3">Monthly Applications</h5>

               <MonthlyChart/>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming interview */}
        <div className="row mt-4">
          <div className="col-lg-6">
            <RecentApplications />
          </div>

          <div className="col-lg-6">
            <UpcomingInterviews />
          </div>
        </div>

        {/* Recent apps */}
       
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
