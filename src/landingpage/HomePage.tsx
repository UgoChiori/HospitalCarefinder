import React from "react";
import "./homepage.css";
import { AiOutlineSearch } from "react-icons/ai";
// import { GiDoctorFace } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
// import { AiOutlinePlus } from "react-icons/ai";
import { healthtips } from "../Healthtips";

const HomePage: React.FC = () => {
  const randomNum = Math.floor(Math.random() * Math.floor(healthtips.length));

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
              {/* <GiDoctorFace className="careheader_select_icon" /> */}

              <a href="/reviews">Reviews</a>
            </div>
            <div className="careheader_item">
              {/* <AiOutlinePlus className="careheader_select_icon" /> */}

              <a href="/addreview">Add Review</a>
            </div>
          </div>
        </div>
      </div>
      <div className="careheader_healthtips">
        <p>{healthtips[randomNum].title}</p>
      </div>
    </div>
  );
};

export default HomePage;
