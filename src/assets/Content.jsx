import { useState } from "react";
export const Content = () => {
    const [count, setCount] = useState(0)
    const onClick = () => {
      setCount(count + 1)
    }
    return(
    <>
       <div className="card">
        <button onClick={onClick}>count is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
    );
}