import React, { useEffect } from "react";
import data from "./dataClient";
import "./table.css";
import CustomBadge from "../badge/CustomBadge";
import Header from "../header/header";
import { useNavigate } from "react-router-dom";

export default function ApplicationTable() {
  const navigate = useNavigate();

  const handleNewApplicationClick = () => {
    // Add your logic here for handling the click event
    //console.log(`Reference ID clicked: ${referenceId}`);
    navigate("/chatbox");
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === null || role !== "client") {
      navigate("/chatbox-verifier");
    }
  }, [navigate]);
  const role = localStorage.getItem("role");
  if (role !== null && role !== "verifier") {
    return (
      <>
        <Header />
        <div className="container-div">
          <div
            className="header-style"
            style={{
              paddingTop: "20px",
            }}
          >
            <h3 className="heading-3">Medical practitioner PSV Applications</h3>
            <div className="buttons-style">
              <button
                className="custom-button-2"
                onClick={handleNewApplicationClick}
              >
                + New Application
              </button>
              <button className="custom-button">
                All <span className="arrow">&#x25BC;</span>
              </button>
              <button className="custom-button-1">
                Last 6 Months <span className="arrow">&#9660;</span>
              </button>
            </div>
          </div>

          <table className="table-style">
            <thead>
              <tr>
                <th>REFERENCE ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>PASSPORT ID</th>
                <th>CATEGORY</th>
                <th>TYPE</th>
                <th>APPLIED ON</th>
                <th>VERIFIER</th>
                <th>DOC VERIFIED</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="table-id">{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.passportId}</td>
                  <td>{item.category}</td>
                  <td>{item.type}</td>
                  <td>
                    {item.appliedOn
                      .toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      .replace(/\//g, "-")}
                  </td>
                  <td>{item.verifier}</td>
                  <td>{item.docVerified}</td>
                  <td>
                    <CustomBadge status={item.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  } else {
    navigate("/chatbox");
  }
}
