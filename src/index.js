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
import ApplicationTableClient from "./table/ApplicationTableClient";
import Dashboard from "./dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OnBoarding from "./onboarding/OnBoarding";
import DashboardVerifier from "./dashboard/DashboardVerifier";
import SuperAdminTable from "./table/SuperAdminTable";
import Email from "./email/email";
import Contact from "./contact/contact";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/chatbox" element={<ChatBox />} />
        <Route path="/" element={<Login />} />
        <Route path="/chatbox-verifier" element={<ChatBoxVerifier />} />
        <Route path="/application-table" element={<ApplicationTable />} />
        <Route
          path="/application-table-client"
          element={<ApplicationTableClient />}
        />
        <Route path="/admin-table" element={<SuperAdminTable />} />
        <Route path="/dashboard-verifier" element={<DashboardVerifier />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/email" element={<Email />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
