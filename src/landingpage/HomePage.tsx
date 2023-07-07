import React from "react";
import "./homepage.css";
import { AiOutlineSearch} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { CgGirl } from "react-icons/cg";
// import { healthtips } from "../Healthtips";



const HomePage: React.FC = () => {
  // const randomNum = Math.floor(Math.random() * Math.floor(healthtips.length));

  const navigate = useNavigate();

  return (
    <div>
      <div className="careheader_container">
        <div className="careheader_wrapper">
          <div className="careheader_head">
            <h1 className="careheader_heading">
              Search Your <span className="careheader_heading_span">Care</span>{" "}
              Provider
            </h1>

            <div className="careheader_input">
              <AiOutlineSearch className="careheader_input_icon" />
              <input
                type="text"
                placeholder="Search"
                className="careheader_input_element"
                onClick={() => {
                  navigate("/register");
                }}
              />
            </div>
          </div>
          <div className="careheader_select">
            <div className="careheader_item">
              <a href="/reviews" className="reviews">Reviews</a>
            </div>
            <div className="careheader_item">
              <a href="/addreview" className="reviews">Add Review</a>
            </div>
          </div>
        </div>
      </div>
      <CgGirl className="admin" />
      <a href="/admin" className="admin">Admin</a>
      {/* <div className="careheader_healthtips">
        <p>{healthtips[randomNum].title}</p>
      </div> */}
    </div>
  );
};

export default HomePage;
