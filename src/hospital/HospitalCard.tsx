
import "./hospitals.css";
import { useNavigate } from "react-router-dom";

type Props = {
  name: any;
  status: any;
  rating: any;
  details: any;
  handleDetails: any;
  formatted_address: any;

  // photo: any;
  // photo_reference: any;
};

export default function HospitalCard({
  name,
  status,
  rating,
  details,
  handleDetails,
  formatted_address,
}: // photo,
// photo_reference,
Props) {
  const navigate = useNavigate();
  return (
    <div className="hospital_card">
      <h1>{name}</h1>
      <h2>{status}</h2>
      <p>{formatted_address}</p>

      <h4>{rating}</h4>

      <button
        onClick={() => {
          navigate("/HospitalDetails");
          handleDetails(details);
          console.log({ name, status, rating, formatted_address });
        }}
        className="hospital-card-buttons"
      >
        Details
      </button>
    </div>
  );
}
