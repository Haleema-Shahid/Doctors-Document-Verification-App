import React, { useEffect } from "react";
import data from "./data";
import "./table.css";
import CustomBadge from "../badge/CustomBadge";
import Header from "../header/header";
import { useNavigate } from "react-router-dom";

export default function SuperAdminTable() {
  const navigate = useNavigate();

  const handleReferenceIdClick = (referenceId) => {
    // Add your logic here for handling the click event
    console.log(`Reference ID clicked: ${referenceId}`);
    navigate("/dashboard");
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === null || role === "client") {
      navigate("/chatbox");
    }
  }, [navigate]);
  const role = localStorage.getItem("role");
  if (role !== null && role !== "client") {
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
            <h3 className="heading-3">Verifiers Record</h3>
            <div className="buttons-style">
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
                <th>ASSIGNED APPLICATIONS</th>
                <th>PROCESSED APPLICATIONS</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="table-id">
                    {item.status === "In Progress" ? (
                      <a
                        href="#"
                        onClick={() => handleReferenceIdClick(item.id)}
                      >
                        {item.id}
                      </a>
                    ) : (
                      item.id
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{"10"}</td>
                  <td>{"5"}</td>
                  <td><CustomBadge status="Current" /></td>
                  
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
