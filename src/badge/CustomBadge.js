import React from "react";
import "./CustomBadge.css";

const CustomBadge = ({ status }) => {
  let badgeClass;

  switch (status.toLowerCase()) {
    case "verified":
      badgeClass = "custom-badge-success";
      break;
    case "rejected":
      badgeClass = "custom-badge-danger";
      break;
    case "in progress":
      badgeClass = "custom-badge-warning";
      break;
    case "irregular":
      badgeClass = "custom-badge-purple";
      break;
    default:
      badgeClass = "custom-badge-secondary";
  }

  return <div className={`custom-badge ${badgeClass}`}>{status}</div>;
};

export default CustomBadge;
