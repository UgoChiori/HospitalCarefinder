import React, { useEffect, useState } from "react";
import { auth } from "../components/Firebase";
import "./profile.css";
import HospitalCard from "../hospital/HospitalCard";

const Profile = (details: any) => {
  const [user, setUser] = useState<any>(null);
  const [savedHospitals, setSavedHospitals] = useState<any[]>([]);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);

        // Retrieve saved hospital details from local storage
        const storedHospitalDetails = localStorage.getItem(
          "savedHospitalDetails"
        );
        if (storedHospitalDetails) {
          const parsedHospitalDetails = JSON.parse(storedHospitalDetails);
          setSavedHospitals(parsedHospitalDetails);
        } else {
          setSavedHospitals([]);
        }
      } else {
        setUser(null);
        setSavedHospitals([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleProfilePictureUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page-container">
      <h1>Profile</h1>
      <div className="profile-details">
        <h2>User Details</h2>
        {user ? (
          <>
            <div className="profile-picture-container">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="profile"
                  className="profile-picture"
                />
              ) : user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="profile-picture"
                />
              ) : (
                <div className="default-profile-picture"></div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureUpload}
              />
            </div>
            <p>Name: {user.displayName}</p>
            <p>Email: {user.email}</p>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
      <div className="saved-hospitals">
        <h2>Saved Hospitals</h2>
        {user ? (
          savedHospitals.length > 0 ? (
            savedHospitals.map((hospital, index) => (
              <HospitalCard
                key={index}
                name={hospital.name}
                status={hospital.business_status}
                rating={hospital.rating}
                details={hospital}
                formatted_address={hospital.vicinity}
                handleDetails={details}
              />
            ))
          ) : (
            <p>No hospitals saved</p>
          )
        ) : (
          <p>Please sign in to view saved hospitals</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
