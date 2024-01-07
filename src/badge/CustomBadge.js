// CustomBadge.js

import React from "react";
import Badge from "react-bootstrap/Badge";
import "./CustomBadge.css";

const CustomBadge = ({ status }) => {
  let variant;

  switch (status.toLowerCase()) {
    case "verified":
      variant = "success";
      break;
    case "rejected":
      variant = "danger";
      break;
    case "in progress":
      variant = "warning";
      break;
    case "irregular":
      variant = "purple";
      break;
    default:
      variant = "secondary";
  }
  

  return (
    <Badge className={`custom-badge custom-badge-${variant}`}>{status}</Badge>
  );
};

// CustomBadge.propTypes = {
//   status: PropTypes.string.isRequired,
// };

export default CustomBadge;
