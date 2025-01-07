/* import { useState } from "react"; */
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [error, setError] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [filterState, setFilterState] = useState("ALL");
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const completedCount = taskList.filter((task) => task.status === "COMPLETED").length;
    setCompleted(completedCount);
  }, [taskList]);

  const onChange = (e) => {
    setNewTask(e.target.value);
    if (e.target.value.length > 0) {
      setError(false); 
    }
  };

  const handleAddTaskButton = () => {
    if (newTask.length === 0) {
      setError(true);
    } else {
      setError(false);
      setTaskList([
        ...taskList,
        { description: newTask, status: "ACTIVE", id: uuidv4() },
      ]);
      setNewTask("");
    }
  };

  const handleFilterStateChange = (state) => {
    setFilterState(state);
  };

  const handleTaskStatusChange = (id) => {
    setTaskList((prevList) => {
      const updatedList = prevList.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "ACTIVE" ? "COMPLETED" : "ACTIVE" }
          : task
      );

      const completedCount = updatedList.filter((task) => task.status === "COMPLETED").length;
      setCompleted(completedCount); 

      return updatedList; 
    });
  };
  const handleClearCompleted = () => {
    setTaskList((prevList) => prevList.filter((task) => task.status !== "COMPLETED"));

  }

  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTaskList(taskList.filter((task) => task.id !== id));
    }
  };

  const filteredTasks = taskList.filter((task) => {
    if (filterState === "ALL") {
      return true;
    }
    return filterState === task.status;
  });

  return (
    <>
      <div className="app">
        <div className="content">
          <b className="toDoList">To-Do list</b>
          {error && <div style={{ color: "black" }}>Please enter a task!</div>}
          <div className="flex">
            <input
              className="taskInput"
              type="text"
              placeholder="Add a new task..."
              value={newTask}
              onChange={onChange}
            />
            <div className="taskButton" onClick={handleAddTaskButton}>
              Add
            </div>
          </div>

          <div className="taskDiv">
            <div
              className="button1"
              onClick={() => handleFilterStateChange("ALL")}
              style={{
                background: filterState === "ALL" ? "#3C82F6" : "#F3F4F6",
                color: filterState === "ALL" ? "#FFF" : "#000",
              }}
            >
              All
            </div>
            <div
              className="button2"
              onClick={() => handleFilterStateChange("ACTIVE")}
              style={{
                background: filterState === "ACTIVE" ? "#3C82F6" : "#F3F4F6",
                color: filterState === "ACTIVE" ? "#FFF" : "#000",
              }}
            >
              Active
            </div>
            <div
              className="button3"
              onClick={() => handleFilterStateChange("COMPLETED")}
              style={{
                background: filterState === "COMPLETED" ? "#3C82F6" : "#F3F4F6",
                color: filterState === "COMPLETED" ? "#FFF" : "#000",
              }}
            >
              Completed
            </div>
          </div>

          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div className="taskList" key={task.id} style={{ display: "flex", alignItems: "center" }}>
                <div className="location">
                  <input
                    type="checkbox"
                    checked={task.status === "COMPLETED"}
                    onChange={() => handleTaskStatusChange(task.id)}
                  />
                  <p className="task"
                    style={{
                      textDecoration: task.status === "COMPLETED" ? "line-through" : "none",
                    }}
                  >
                    {task.description}
                  </p>
                </div>
                <div className="deleteButton" onClick={() => handleDeleteTask(task.id)}>Delete</div>
              </div>
            ))
          ) : (
            <p className="noTask">No tasks yet. Add one above!</p>
          )}

          {filteredTasks.length > 0 && (
            <div className="complet">
            <div className="taskCompleted">
              {completed} of {taskList.length} tasks completed
            </div>
            <div className="clearCompleted"onClick={handleClearCompleted}>Clear Completed</div>
            </div> 
          )}

          <div className="pinecone">
            <p className="powered">Powered by</p>
            <a className="pineLink" href="https://pinecone.mn/">
              Pinecone academy
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;