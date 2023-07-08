import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../components/Firebase";
import { countries } from "countries-list";
import "./admin.css";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const mdParser = new MarkdownIt();

const AdminReviewEditor = () => {
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalImage, setHospitalImage] = useState("");
  const [hospitalCountry, setHospitalCountry] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [hospitalState, setHospitalState] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const isAdminUser = user.email === "ugochiori@gmail.com"; 
        setIsAdmin(isAdminUser);
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleHospitalSubmit = async () => {
    try {
      if (!isAdmin) {
        // Redirects non-admin users to a different page
        navigate("/unauthorized");
        return;
      }

      const hospitalData = {
        Name: hospitalName,
        Country: hospitalCountry,
        Image: hospitalImage,
        Address: hospitalAddress,
        State: hospitalState,
      };

      await addDoc(collection(db, "addhospitals"), hospitalData);

      alert("Hospital added successfully to the database!");

      setHospitalName("");
      setHospitalCountry("");
      setHospitalImage("");
      setHospitalAddress("");
      setHospitalState("");
      navigate("/admin");
    } catch (error) {
      console.error("Error adding hospital to the database", error);
      alert("Error adding hospital to the database");
    }
  };

  if (!isAdmin) {
    // Redirects non-admin users to a "/unauthorized" page
    navigate("/unauthorized");
    return null;
  }

  return (
    <div>
      {isAdmin ? (
        <div className="admin-page">
          <h3>Welcome, Admin!</h3>
          <div className="admin-review-container">
            {/* ... rest of the code */}
            <div className="review-inputs-container">
              <h2 className="review-heading">Add a new hospital</h2>
              <div className="review-input">
                <label htmlFor="hospitalName">Hospital Name</label>
                <input
                  type="text"
                  id="hospitalName"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                />
              </div>
                      <div className="review-input">
          <label htmlFor="hospitalCountry">Hospital Country</label>
           <select
            id="hospitalCountry"
            value={hospitalCountry}
            onChange={(e) => setHospitalCountry(e.target.value)}
          >
            <option value="">Select Country</option>
             {Object.keys(countries).map((key) => (
               <option key={key} value={key}>
                 {countries[key as keyof typeof countries].name}
              </option>
            ))}
         </select>
        </div>
              <div className="review-input">
                <label htmlFor="hospitalImage">Hospital Image</label>
                <input
                  type="file"
                  id="hospitalImage"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setHospitalImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              <div className="review-input">
                <label htmlFor="hospitalAddress">Hospital Address</label>
                <MdEditor
                  id="hospitalAddress"
                  value={hospitalAddress}
                  onChange={({ text }) => setHospitalAddress(text)}
                  renderHTML={(text) => mdParser.render(text)}
                  style={{ height: "200px" }}
                />
              </div>
              <div className="review-input">
                <label htmlFor="hospitalState">Hospital State</label>
                <input
                  type="text"
                  id="hospitalState"
                  value={hospitalState}
                  onChange={(e) => setHospitalState(e.target.value)}
                />
              </div>
              <button
                id="submit-review-btn"
                onClick={handleHospitalSubmit}
              >
                Submit
              </button>
            </div>
            
            
          </div>
        </div>
      ) : (
        <div className="unauthorized-access">
          <h2>Unauthorized Access</h2>
          <p>You must be logged in as an admin to access this page.</p>
        </div>
      )}
    </div>
  );
};

export default AdminReviewEditor;
