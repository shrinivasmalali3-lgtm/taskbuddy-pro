import React from "react";

function TaskHistory({
  history,
  restoreTask,
  deleteHistoryTask,
}) {
  return (
    <div className="task-history">
      <h2>Completed Task History</h2>

      {/* If no history */}
      {history.length === 0 ? (
        <p>No completed task history yet.</p>
      ) : (
        history.map((task, index) => (
          <div key={index} className="history-item">

            {/* Task Info */}
            <div className="history-info">
              <p>{task.text}</p>

              <span>
                Priority: {task.priority}
              </span>

              <span>
                Category: {task.category}
              </span>
            </div>

            {/* Buttons */}
            <div className="history-actions">

              <button
                onClick={() => restoreTask(task)}
                className="restore-btn"
              >
                Restore
              </button>

              <button
                onClick={() =>
                  deleteHistoryTask(index)
                }
                className="delete-btn"
              >
                Delete
              </button>

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskHistory;