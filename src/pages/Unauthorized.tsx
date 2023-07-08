import React from "react";
import { Link } from "react-router-dom";
import "./unauthorized.css";

const Unauthorized: React.FC = () => {
  return (
    <div className="unauthorized-container">
      <h1>UNAUTHORIZED!</h1>
      <p>You are not authorized to view this page. Admin user only</p>
        <Link to="/" className="unauthorized-link">Go back to home page</Link>
    </div>
  );
};

export default Unauthorized;
