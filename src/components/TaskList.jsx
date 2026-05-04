import React from "react";

function TaskList({
  tasks = [],
  deleteTask,
  updateTaskStatus,
}) {
  // TASK PROGRESS
  const getTaskProgress = (
    status
  ) => {
    if (
      status === "completed"
    ) {
      return 100;
    }

    if (
      status === "ongoing"
    ) {
      return 50;
    }

    return 0;
  };

  // COLOR
  const getProgressColor = (
    progress
  ) => {
    if (progress === 100) {
      return "green";
    }

    if (progress >= 50) {
      return "blue";
    }

    if (progress > 0) {
      return "orange";
    }

    return "gray";
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>
          No tasks available. Add
          some tasks!
        </p>
      ) : (
        tasks.map(
          (task, index) => {
            const taskProgress =
              getTaskProgress(
                task.status
              );

            return (
              <div
                key={index}
                className="task-item"
              >
                {/* TASK INFO */}
                <div className="task-info">
                  <p
                    className={
                      task.completed
                        ? "completed"
                        : ""
                    }
                  >
                    {task.text}
                  </p>

                  <span className="priority">
                    Priority:{" "}
                    {
                      task.priority
                    }
                  </span>

                  <br />

                  <span className="category">
                    Category:{" "}
                    {
                      task.category
                    }
                  </span>

                  <br />

                  <span className="status">
                    Status:{" "}
                    {
                      task.status
                    }
                  </span>
                </div>

                {/* INDIVIDUAL TASK PROGRESS */}
                <div className="task-progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{
                        width: `${taskProgress}%`,
                        backgroundColor:
                          getProgressColor(
                            taskProgress
                          ),
                      }}
                    ></div>
                  </div>

                  <p>
                    Progress:{" "}
                    {
                      taskProgress
                    }
                    %
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="task-actions">

                  {/* TO-DO */}
                  {task.status ===
                    "todo" && (
                    <button
                      onClick={() =>
                        updateTaskStatus(
                          index,
                          "ongoing"
                        )
                      }
                      className="ongoing-btn"
                    >
                      Move to Ongoing
                    </button>
                  )}

                  {/* ONGOING */}
                  {task.status ===
                    "ongoing" && (
                    <button
                      onClick={() =>
                        updateTaskStatus(
                          index,
                          "completed"
                        )
                      }
                      className="complete-btn"
                    >
                      Move to Completed
                    </button>
                  )}

                  {/* COMPLETED */}
                  {task.status ===
                    "completed" && (
                    <button
                      onClick={() =>
                        updateTaskStatus(
                          index,
                          "todo"
                        )
                      }
                      className="undo-btn"
                    >
                      Undo to To-Do
                    </button>
                  )}

                  {/* DELETE */}
                  <button
                    onClick={() =>
                      deleteTask(
                        index
                      )
                    }
                    className="delete-btn"
                  >
                    Delete
                  </button>

                </div>
              </div>
            );
          }
        )
      )}
    </div>
  );
}

export default TaskList;