import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button className="">
        <h1
          onClick={addvalue}
          className="bg-green-400 text-black p-4 rounded-xl"
        >
          tailwind test{" "}
        </h1>
      </button>
    </>
  );
}

export default App;
