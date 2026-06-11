import { useEffect, useState } from "react";
import API from "../api/axios";
import DashboardLayout from "../layout/DashboardLayout";
import "../styles/kanban.css"

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { APPLICATION_STATUS } from "../constants/applicationStatus";

const KanbanBoard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data } = await API.get("/applications");

      setApplications(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      return;
    }

    // Optimistic UI Update
    setApplications((prev) =>
      prev.map((app) =>
        app._id === draggableId
          ? {
              ...app,
              status: destination.droppableId,
            }
          : app,
      ),
    );

    try {
      await API.patch(`/applications/${draggableId}/status`, {
        status: destination.droppableId,
      });
    } catch (error) {
      console.log(error);

      // Reload if backend fails
      fetchApplications();
    }
  };

  const getHeaderClass = (status) => {
    switch (status) {
      case "Offer":
        return "bg-success text-white";

      case "Interview":
        return "bg-info text-white";

      case "Assessment":
        return "bg-primary text-white";

      case "Rejected":
        return "bg-danger text-white";

      case "Applied":
        return "bg-warning";

      default:
        return "bg-secondary text-white";
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-4">Loading Kanban Board...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container-fluid p-4">
        <div className="mb-4">
          <h2>Kanban Board</h2>

          <p className="text-muted">Drag applications between stages</p>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div
            className="row g-3"
            style={{
              minHeight: "75vh",
            }}
          >
            {APPLICATION_STATUS.map((status) => {
              const apps = applications.filter((app) => app.status === status);

              return (
                <div key={status} className="col-6 col-lg kanban-column">
                  <div className={`card shadow-sm`}>
                    <div
                      className={`card-header fw-bold ${getHeaderClass(
                        status,
                      )}`}
                    >
                      {status} ({apps.length})
                    </div>

                    <Droppable droppableId={status}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="card-body bg-light"
                          style={{
                            minHeight: "500px",
                          }}
                        >
                          {apps.map((app, index) => (
                            <Draggable
                              key={app._id}
                              draggableId={app._id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="card mb-3 shadow-sm"
                                >
                                  <div className="card-body">
                                    <h6>{app.companyName}</h6>

                                    <p className="mb-1">{app.role}</p>

                                    <small className="text-muted">
                                      {app.source}
                                    </small>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}

                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </DashboardLayout>
  );
};

export default KanbanBoard;
