import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Error 404</h1>
      <p style={{ fontSize: "24px", marginBottom: "40px" }}>Page Not Found</p>
      <img
        src="https://media.tenor.com/q67xUnEYzicAAAAd/error404.gif" // Replace with your own custom image URL
        alt="Error 404"
        style={{ maxWidth: "400px", marginBottom: "40px" }}
      />
      <p style={{ fontSize: "18px" }}>Oops! It seems like you're lost.</p>
      <p style={{ fontSize: "18px" }}>The page you're looking for does not exist.</p>
      <p style={{ fontSize: "18px" }}>Please check the URL or go back to the homepage.</p>
      <div>
      <Link to="/">Home Page</Link>
      </div>
    </div>
   
  );
};

export default NotFoundPage;