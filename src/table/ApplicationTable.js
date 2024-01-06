import React from "react";
import data from "./data";
import Badge from "react-bootstrap/Badge";
import "./table.css";
import CustomBadge from "../badge/CustomBadge";

export default function ApplicationTable() {
  return (
    <div className="container">
      <div className="header">
        <h3>Medical practitioner PSV Applications</h3>
        <div className="buttons">
          <button className="custom-button">
            All <span className="arrow">&#x25BC;</span>
          </button>
          <button className="custom-button-1">
            Last 6 Months <span className="arrow">&#9660;</span>
          </button>
        </div>
      </div>

      <table className="table">
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
              <td>{item.docVerified}</td>
              <td>
                <CustomBadge status={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
