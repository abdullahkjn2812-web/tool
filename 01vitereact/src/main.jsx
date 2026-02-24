// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client"; // ReactDOM import for React 18
import App from "./App"; // Import App component

const root = ReactDOM.createRoot(document.getElementById("root")); // Render to the root div in index.html
root.render(<App />); // Render App component inside the root div
