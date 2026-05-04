import React from "react";

function ProgressTracker({
  tasks = [],
}) {
  // TOTAL TASKS
  const totalTasks =
    tasks.length;

  // COMPLETED TASKS
  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "completed"
    ).length;

  // ONGOING TASKS
  const ongoingTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "ongoing"
    ).length;

  // CALCULATE TOTAL PROGRESS
  const totalProgress =
    tasks.reduce(
      (sum, task) => {
        if (
          task.status ===
          "completed"
        ) {
          return sum + 100;
        }

        if (
          task.status ===
          "ongoing"
        ) {
          return sum + 50;
        }

        return sum;
      },
      0
    );

  // FINAL PERCENTAGE
  const progress =
    totalTasks === 0
      ? 0
      : totalProgress /
        totalTasks;

  // DYNAMIC COLOR
  const progressColor =
    progress === 100
      ? "green"
      : progress >= 50
      ? "blue"
      : progress > 0
      ? "orange"
      : "gray";

  return (
    <div className="progress-tracker">

      <h2>
        Task Progress
      </h2>

      {/* STATS */}
      <p>
        Total Tasks:{" "}
        {totalTasks}
      </p>

      <p>
        Ongoing Tasks:{" "}
        {ongoingTasks}
      </p>

      <p>
        Completed Tasks:{" "}
        {completedTasks}
      </p>

      {/* PROGRESS BAR */}
      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${progress}%`,
            backgroundColor:
              progressColor,
          }}
        ></div>
      </div>

      {/* PROGRESS TEXT */}
      <p>
        Overall Progress:{" "}
        {progress.toFixed(0)}%
      </p>

    </div>
  );
}

export default ProgressTracker;