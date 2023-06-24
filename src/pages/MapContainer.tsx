import React, { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
// import { useLoadScript } from "@react-google-maps/api";

interface Hospital{
  place_id: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  }

const MapContainer = ({ hospitals }: {hospitals: Hospital[]} ) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const defaultCenter = {
    lat: 6.5244,
    lng: 3.3792,
  };

  useEffect(() => {
    if (map && hospitals.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      hospitals.forEach((hospital: { geometry: { location: { lat: any; lng: any; }; }; }) => {
        const { lat, lng } = hospital.geometry.location;
        bounds.extend(new window.google.maps.LatLng(lat, lng));
      });
      (map as google.maps.Map).fitBounds(bounds);
    }
  }, [map, hospitals]);

  return (
    <div>
    <LoadScript googleMapsApiKey="AIzaSyDYL048QSsNPEHs_crrIeZfrYH5_Qsh2Nk">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
        onLoad={(map) => setMap(map)}
      >
        {hospitals.map((hospital: { place_id: React.Key | null | undefined; geometry: { location: google.maps.LatLng | google.maps.LatLngLiteral; }; }) => (
          <Marker
            key={hospital.place_id}
            position={hospital.geometry.location}
          />
        ))}
      </GoogleMap>
    </LoadScript>
    </div>
  );
};

export default MapContainer;

// import React, { useState, useEffect } from "react";
// import {
//   GoogleMap,
//   LoadScript,
//   Marker,
//   LoadScriptNext,
// } from "@react-google-maps/api";

// interface Hospital {
//   place_id: string;
//   geometry: {
//     location: {
//       lat: number;
//       lng: number;
//     };
//   };
// }

// const MapContainer = ({ hospitals }: { hospitals: Hospital[] }) => {
//   const [map, setMap] = useState<google.maps.Map | null>(null);

//   const mapStyles = {
//     height: "400px",
//     width: "100%",
//   };

//   const defaultCenter = {
//     lat: 6.5244,
//     lng: 3.3792,
//   };

//   useEffect(() => {
//     if (map && hospitals.length > 0) {
//       const bounds = new window.google.maps.LatLngBounds();
//       hospitals.forEach((hospital) => {
//         const { lat, lng } = hospital.geometry.location;
//         bounds.extend(new window.google.maps.LatLng(lat, lng));
//       });
//       map.fitBounds(bounds);
//     }
//   }, [map, hospitals]);

//   return (
//     <div>
//       <LoadScriptNext googleMapsApiKey="AIzaSyDYL048QSsNPEHs_crrIeZfrYH5_Qsh2Nk">
//         <GoogleMap
//           mapContainerStyle={mapStyles}
//           zoom={13}
//           center={defaultCenter}
//           onLoad={(map) => setMap(map)}
//         >
//           {hospitals.map((hospital) => (
//             <Marker
//               key={hospital.place_id}
//               position={hospital.geometry.location}
//             />
//           ))}
//         </GoogleMap>
//       </LoadScriptNext>
//     </div>
//   );
// };

// export default MapContainer;
