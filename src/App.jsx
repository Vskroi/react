import { useState } from "react";
import "./App.css";

function App() {
  const [newTask, setNewTask] = useState("")
  const [taskList, setTaskList] = useState([])
  const onClick = () => {
    setTaskList([...taskList, newTask])
  }
  const onChange = (e) => {
    setNewTask(e.target.value);
  }
  return (
    <>
      <div className="app">
        <div className="content">
          <p className="toDoList">To-Do list</p>
          <div className="flex">
            <input className="taskInput" type="text" placeholder="Add a new task..." id="input" onChange={onChange} />
            <button className="taskButton" onClick={onClick} >
              <p className="buttonText">Add</p>
            </button>
            </div>

          <div className="taskDiv">
            <button className="button1"><p>All</p></button>
            <button className="button2"><p>Active</p></button>
            <button className="button3"><p>Completed</p></button>
          </div>
          {taskList.map((task, index) => (
            <div key={index}>
              <p style={{ color: "black" }}>{task}</p>
            </div>
          ))
          }
          <p className="noTask">No tasks yet. Add one above!</p>
          <div className="pinecone">
            <p className="powered">Powered by</p>
            <a className="pineLInk" href="https://pinecone.mn/">Pinecone academy</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;