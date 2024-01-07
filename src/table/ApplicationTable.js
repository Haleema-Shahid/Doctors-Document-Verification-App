import React from "react";
import data from "./data";
import "./table.css";
import CustomBadge from "../badge/CustomBadge";
import Header from "../header/header";
import { useNavigate } from "react-router-dom";

export default function ApplicationTable() {
  const navigate = useNavigate();

  const handleReferenceIdClick = (referenceId) => {
    // Add your logic here for handling the click event
    console.log(`Reference ID clicked: ${referenceId}`);
    navigate("/chatbox-verifier");
  };
  return (
    <>
      <Header />
      <div className="container-div">
        <div className="header-style"
        style={{
          paddingTop: "20px"
        }}>
          <h3 className="heading-3">Medical practitioner PSV Applications</h3>
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
              <th>Name</th>
              <th>EMAIL</th>
              <th>PASSPORT ID</th>
              <th>CATEGORY</th>
              <th>TYPE</th>
              <th>APPLIED ON</th>
              <th>DOC VERIFIED</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="table-id">
                  {item.status === "In Progress" ? (
                    <a href="#" onClick={() => handleReferenceIdClick(item.id)}>
                      {item.id}
                    </a>
                  ) : (
                    item.id
                  )}
                </td>
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
}
