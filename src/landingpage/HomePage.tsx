import React from "react";
import "./homepage.css";
import { AiOutlineSearch } from "react-icons/ai";
import { GiDoctorFace, GiHospital} from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";


const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
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
            <GiDoctorFace className="careheader_select_icon" />
            <p onClick={() => navigate("/reviews")}>Read Review</p>
          </div>
          <div className="careheader_item">
            <AiOutlinePlus className="careheader_select_icon" />
            <p onClick={() => navigate("/addreview")}>Add Review</p>
          </div>
          <div className="careheader_item">
            <GiHospital className="careheader_select_icon" />
            <p onClick={() => navigate("/addhospital")}>Add Hospital</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
