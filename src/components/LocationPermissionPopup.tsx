// import React from "react";

// type LocationPermissionPopupProps = {
//   onPermissionResponse: (allowPermission: boolean) => void;
// };

// const LocationPermissionPopup: React.FC<LocationPermissionPopupProps> = ({
//   onPermissionResponse,
// }) => {
//   const handleAllowPermission = () => {
//     onPermissionResponse(true);
//   };

//   const handleDenyPermission = () => {
//     onPermissionResponse(false);
//   };

//   return (
//     <div className="location-permission-popup">
//       <h2>Allow access to your location?</h2>
//       <p>We can find hospitals near you.</p>
//       <div className="popup-buttons">
//         <button onClick={handleAllowPermission}>Allow</button>
//         <button onClick={handleDenyPermission}>Deny</button>
//       </div>
//     </div>
//   );
// };

// export default LocationPermissionPopup;