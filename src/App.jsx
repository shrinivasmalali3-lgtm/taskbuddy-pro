import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import ProgressTracker from "./components/ProgressTracker.jsx";
import TaskHistory from "./components/TaskHistory.jsx";
import VideoTracker from "./components/VideoTracker.jsx";
import MiniTube from "./components/MiniTube.jsx";
import AIStudyAssistant from "./components/AIStudyAssistant.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";

function App() {
  // TASKS
  const [tasks, setTasks] = useState(() => {
    const savedTasks =
      localStorage.getItem("tasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : [];
  });

  // HISTORY
  const [history, setHistory] =
    useState(() => {
      const savedHistory =
        localStorage.getItem("history");

      return savedHistory
        ? JSON.parse(savedHistory)
        : [];
    });

  // DARK MODE
  const [darkMode, setDarkMode] =
    useState(() => {
      const savedTheme =
        localStorage.getItem(
          "darkMode"
        );

      return savedTheme
        ? JSON.parse(savedTheme)
        : false;
    });

  // FILTER
  const [filter, setFilter] =
    useState("all");

  // SAVE TASKS
  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  // SAVE HISTORY
  useEffect(() => {
    localStorage.setItem(
      "history",
      JSON.stringify(history)
    );
  }, [history]);

  // SAVE THEME
  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  // ADD TASK
  const addTask = (task) => {
    const duplicate = tasks.some(
      (t) =>
        t.text.toLowerCase() ===
        task.text.toLowerCase()
    );

    if (duplicate) {
      alert("Task already exists!");
      return;
    }

    setTasks([...tasks, task]);
  };

  // UPDATE TASK STATUS
  const updateTaskStatus = (
    index,
    newStatus
  ) => {
    const updatedTasks = tasks.map(
      (task, i) =>
        i === index
          ? {
              ...task,
              status: newStatus,
              completed:
                newStatus ===
                "completed",
            }
          : task
    );

    setTasks(updatedTasks);
  };

  // DELETE TASK
  const deleteTask = (index) => {
    const deletedTask = tasks[index];

    if (
      deletedTask.status ===
      "completed"
    ) {
      setHistory([
        ...history,
        deletedTask,
      ]);
    }

    const updatedTasks =
      tasks.filter(
        (_, i) => i !== index
      );

    setTasks(updatedTasks);
  };

  // RESTORE TASK
  const restoreTask = (task) => {
    setTasks([
      ...tasks,
      {
        ...task,
        status: "todo",
        completed: false,
      },
    ]);

    const updatedHistory =
      history.filter(
        (t) => t !== task
      );

    setHistory(updatedHistory);
  };

  // DELETE HISTORY
  const deleteHistoryTask = (
    index
  ) => {
    const updatedHistory =
      history.filter(
        (_, i) => i !== index
      );

    setHistory(updatedHistory);
  };

  // CLEAR ALL
  const clearAllTasks = () => {
    setTasks([]);
  };

  // FILTERED TASKS
  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter(
          (task) =>
            task.status ===
            filter
        );

  return (
    <div
      className={`App ${
        darkMode ? "dark" : ""
      }`}
    >
      <h1>TaskBuddy Pro</h1>

      {/* DARK MODE */}
      <ThemeToggle
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* TASK FORM */}
      <TaskForm addTask={addTask} />

      {/* FILTER */}
      <div className="task-filter">
        <button
          onClick={() =>
            setFilter("all")
          }
        >
          All
        </button>

        <button
          onClick={() =>
            setFilter("todo")
          }
        >
          To-Do
        </button>

        <button
          onClick={() =>
            setFilter(
              "ongoing"
            )
          }
        >
          Ongoing
        </button>

        <button
          onClick={() =>
            setFilter(
              "completed"
            )
          }
        >
          Completed
        </button>
      </div>

      {/* CLEAR */}
      <button
        className="clear-btn"
        onClick={clearAllTasks}
      >
        Clear All Tasks
      </button>

      {/* TASK LIST */}
      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        updateTaskStatus={
          updateTaskStatus
        }
      />

      {/* PROGRESS */}
      <ProgressTracker
        tasks={tasks}
      />

      {/* HISTORY */}
      <TaskHistory
        history={history}
        restoreTask={restoreTask}
        deleteHistoryTask={
          deleteHistoryTask
        }
      />

      {/* VIDEO TRACKER */}
      <VideoTracker />

      {/* MINITUBE */}
      <MiniTube />

      {/* AI STUDY ASSISTANT */}
      <AIStudyAssistant />
    </div>
  );
}

export default App;