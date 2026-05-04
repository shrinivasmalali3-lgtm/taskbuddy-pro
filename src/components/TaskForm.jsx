import React, { useState } from "react";

function TaskForm({ addTask }) {
  // TASK NAME
  const [task, setTask] =
    useState("");

  // PRIORITY
  const [priority, setPriority] =
    useState("Medium");

  // CATEGORY
  const [category, setCategory] =
    useState("General");

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.trim()) {
      addTask({
        text: task,
        priority,
        category,
        completed: false,

        // SMART STATUS
        status: "todo",

        // REAL PROGRESS
        progress: 0,
      });

      // RESET
      setTask("");
      setPriority("Medium");
      setCategory("General");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="task-form"
    >

      {/* TASK INPUT */}
      <div className="task-top">

        <input
          type="text"
          value={task}
          onChange={(e) =>
            setTask(
              e.target.value
            )
          }
          placeholder="Enter your task"
          required
        />

        <button type="submit">
          Add Task
        </button>

      </div>

      {/* OPTIONS */}
      <div className="task-options">

        {/* PRIORITY */}
        <select
          value={priority}
          onChange={(e) =>
            setPriority(
              e.target.value
            )
          }
        >
          <option value="High">
            High
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Low">
            Low
          </option>
        </select>

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        >
          <option value="General">
            General
          </option>

          <option value="Work">
            Work
          </option>

          <option value="Personal">
            Personal
          </option>

          <option value="Study">
            Study
          </option>

          <option value="Fitness">
            Fitness
          </option>
        </select>

      </div>

    </form>
  );
}

export default TaskForm;