import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import Button from "./components/Button";
import TaskList from "./components/Task-List";
import "./App.css";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [log, setLog] = useState([]);
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
      const AddTime = moment().format('LLLL');
      setTaskList((prevList) => [
        ...prevList,
        { description: newTask, status: "ACTIVE", id: uuidv4() },
      ]);
      setLog((prevLog) => [
        ...prevLog, 
        { description: newTask, status: "ACTIVE", id: uuidv4(), time: AddTime }
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
    setLog((prevLog) => {
      const updatedLog = prevLog.map((entry) => 
        entry.id === id
          ? { ...entry, status: taskList.find(task => task.id === id).status, time: moment().format('LLLL') }
          : entry
      );
      if (taskList.find(task => task.id === id).status !== "COMPLETED") {
        updatedLog.push({
          description:  taskList.find(task => task.id === id).description,
          status: "COMPLETED",
          id: uuidv4(),
          time: moment().format('LLLL')
        });
      }
      else{   updatedLog.push({
        description:  taskList.find(task => task.id === id).description,
        status: "ACTIVE",
        id: uuidv4(),
        time: moment().format('LLLL')
      });}
      return updatedLog;
    });
  };
  const handleClearCompleted = () => {
    if (window.confirm("Are you sure you want to delete completed tasks?")) {
      setTaskList((prevList) => {
        const tasksToDelete = prevList.filter((task) => task.status === "COMPLETED");
        tasksToDelete.forEach((task) => {
          setLog((prevLog) => [
            ...prevLog,
            {
              description: `Task deleted: ${task.description}`,
              status: "DELETED",
              id: uuidv4(),
              time: moment().format('LLLL'),
            },
          ]);
        });
        return prevList.filter((task) => task.status !== "COMPLETED");
      });
    }
  };
  const handleDeleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTaskList((prevList) => {
        const taskToDelete = prevList.find(task => task.id === id);
        const updatedList = prevList.filter((task) => task.id !== id);
        setLog((prevLog) => [
          ...prevLog,
          { description: `Task deleted: ${taskToDelete.description}`, status: "DELETED", id: uuidv4(), time: moment().format('LLLL') }
        ]);

        return updatedList;
      });  
    }
  };

  const filteredTasks = taskList.filter((task) => {
    if (filterState === "ALL") return true;
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
            <Button text="All" className="button1"
              onClick={() => handleFilterStateChange("ALL")}
              style={{
                background: filterState === "ALL" ? "#3C82F6" : "#F3F4F6",
                color: filterState === "ALL" ? "#FFF" : "#000",
              }} />

            <Button text="Active" className="button2"
              onClick={() => handleFilterStateChange("ACTIVE")}
              style={{
                background: filterState === "ACTIVE" ? "#3C82F6" : "#F3F4F6",
                color: filterState === "ACTIVE" ? "#FFF" : "#000",
              }} />

            <Button text="Completed" className="button3"
              onClick={() => handleFilterStateChange("COMPLETED")}
              style={{
                background: filterState === "COMPLETED" ? "#3C82F6" : "#F3F4F6",
                color: filterState === "COMPLETED" ? "#FFF" : "#000",
              }} />

            <Button text="Log" className="button1"
              onClick={() => handleFilterStateChange("LOG")}
              style={{
                background: filterState === "LOG" ? "#3C82F6" : "#F3F4F6",
                color: filterState === "LOG" ? "#FFF" : "#000",
              }} />
          </div>
          {filterState !== "LOG" && filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div className="taskList" key={task.id} style={{ display: "flex", alignItems: "center" }}>
                <div className="location">
                  <input
                    type="checkbox"
                    checked={task.status === "COMPLETED"}
                    onChange={() => handleTaskStatusChange(task.id)}
                  />
               
                    <TaskList className="task" text={task.description}     style={{
                      textDecoration: task.status === "COMPLETED" ? "line-through" : "none",
                      color: task.status === "COMPLETED" ? "#5f5f5f" : "#000",
                    }} />
               
                </div>

                <Button text="Delete" className="deleteButton" onClick={() => handleDeleteTask(task.id)} />
              </div>
            ))
          ) : (
            <p className="noTask">No tasks yet. Add one above!</p>
          )}
          {filterState === "LOG" && log.length > 0 && (
            <div>
              {log.map((entry) => (
              entry.status === "DELETED" ? (
                <div className="taskList task" style={{color:"red"}} key={entry.id}>
                
                  <TaskList className="logDescription" text={entry.description} />
                  <div className="logList">
                    <TaskList className="logText" text={"ID : " + entry.id} /> 
                    <TaskList className="logText" text= { "status : "+entry.status} />
                    <TaskList className="logText" text={" date and time : "+ entry.time} /> 
                  </div>
                </div>
              ) : (<div className="taskList task" key={entry.id}>
                <p className="logDescription">{entry.description}:</p>
                <div className="logList">
                  <p className="logText"> ID : {entry.id}</p>
                  <p className="logText"> status : {entry.status}</p>
                  <p className="logText"> date and time : {entry.time}</p>
                </div>
              </div>)
              ))}
            </div>
          )}
          {filteredTasks.length > 0 && (
            <div className="complet">
              <div className="taskCompleted">
                {completed} of {taskList.length} tasks completed
              </div>
              <Button text="Clear Completed" className="clearCompleted" onClick={handleClearCompleted} disabled={completed === 0} />
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
