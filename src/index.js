import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ChatBox from "./chat/chatbox";
import Login from "./login/login";
import ChatBoxVerifier from "./chat/chatbox-verifier";
import ApplicationTable from "./table/ApplicationTable";
import Dashboard from "./dashboard/Dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/chatbox" element={<ChatBox />} />
        <Route path="/" element={<Login />} />
        <Route path="/chatbox-verifier" element={<ChatBoxVerifier />} />
        <Route path="/application-table" element={<ApplicationTable />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
