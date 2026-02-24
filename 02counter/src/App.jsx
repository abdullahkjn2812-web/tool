import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// function App() {
//   function togglebutton() {
//     const [isOn, setisOn] = useState(false);
//     const toggle = () => {
//       setisOn(!isOn);
//     };
//     const backgroundColor = isOn ? "green" : "red";

//     return (
//       <div
//         style={{
//           backgroundColor: backgroundColor,
//           height: "100vh",
//           width: "100%",
//           padding: "20px",
//           textAlign: "center",
//           body: { margin: 0 },
//         }}
//       >
//         <h1>The Button Is {isOn ? "On" : "Of"}</h1>

//         <button onClick={toggle}>{isOn ? "On" : "Of"}</button>
//       </div>
//     );
//   }
//   return togglebutton();
// }

// function App() {
//   const [counter, setcounter] = useState(5);

//   const addvalue = () => {
//     setcounter(counter + 1);

//     console.log("value added ", counter + 1);
//   };
//   const removevalue = () => {
//     setcounter(counter - 1);
//     console.log("value removed ", counter - 1);
//   };
//   const resetvalue = () => {
//     setcounter(5);
//     console.log("value reset to 5");
//   };

//   return (
//     <>
//       <h1> Chai aur react </h1>
//       <h2> Counter value : {counter}</h2>
//       <button onClick={addvalue}>Add value </button>
//       <br />
//       <button onClick={removevalue}> Remove Value </button>
//       <button onClick={resetvalue}>Reset Value </button>
//     </>
//   );
// }

// function App() {
//   function lightstatus() {
//     const [isOn, useState] = useState(false);
//     return <div>{isOn ? <h1> Light Is On </h1> : <h1> Light Is Of</h1>}</div>;
//     <button onclick={() => setisOn(!isOn)}>Toggle </button>;
//   }
//   return lightstatus();
// }
// export default App;

function userstatus() {
  const [loggedin, setloggedin] = useState(false);
  return (
    <div>
      {loggedin ? <h2> welcome back </h2> : <h2>please log in </h2>}
      <button onClick={() => setloggedin(!loggedin)}>
        {loggedin ? " Log out  " : "log In "}
      </button>
    </div>
  );
}
export default userstatus;
