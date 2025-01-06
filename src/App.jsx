import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";

function App() {
  const [taskList, setTaskList] = useState([])
  const [error, setError] = useState(false)
  const [newTask, setNewTask] = useState("")
  const [filterState, setFilterState] = useState("ALL")
  const onChange = (e) => {
    setNewTask(e.target.value);
  }
  const handleAddTaskButton = () =>{
    if (newTask.length === 0){
      setError(true);
    }else {
      setError(false);
      setTaskList([...taskList, {description:newTask, status:"ACTIVE", id: uuidv4()}]);
      setNewTask("");
    }
    console.log(taskList)
  }
  const handleFilterStateChange = (state) =>{
setFilterState(state)
  }
  return (
    <>
      <div className="app">
        <div className="content">
          <b className="toDoList" >To-Do list</b>
          {error && <div style={{color:"black"}}> Please enter a task!</div>}
          <div className="flex">
            <input className="taskInput" 
            type="text" 
            placeholder="Add a new task..." 
            onChange={(onChange)}/>
            
            <button className="taskButton" onClick={handleAddTaskButton} >
           Add
            </button>
            </div>

          <div className="taskDiv">
            <div className="button1" onClick={() => handleFilterStateChange("ALL")} style={{color:filterState === "ALL" ?  "#3C82F6;":"#F3F4F6"}}>All</div>
            <div className="button2" onClick={() => handleFilterStateChange("ACTIVE")} style={{background:filterState === "ACTIVE" ?  "#3C82F6;":"#F3F4F6"}}>Active</div>
            <div className="button3" onClick={() => handleFilterStateChange("COMPLATE")} style={{background:filterState === "COMPLATE" ?  "#3C82F6;":"#F3F4F6"}}>Completed</div>
          </div>
          {
          taskList.filter((task) => {
            if(filterState === "ALL"){
              return true;
            }
            else if (filterState === task.state){
              return true;
            }
          })
          .map((task,index) => {
return(
            <div key={index} style={{display:"flex"}}>
               <input type="checkBox" />
              <p style={{ color: "black" }}>
              {task.description}
                </p>
            </div>)

})
          }
     
          <p className="noTask">No tasks yet. Add one above!</p>
    
          <div className="pinecone">
            <p className="powered">Powered by</p>
            <a className="pineLink" href="https://pinecone.mn/">Pinecone academy</a>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;