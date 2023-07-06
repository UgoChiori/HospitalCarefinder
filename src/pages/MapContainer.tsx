import { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker, StreetViewPanorama } from "@react-google-maps/api";

interface Hospital {
  place_id: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

const MapContainer = ({ hospitals }: { hospitals: Hospital[] }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const defaultCenter = {
    lat: 6.5095,
    lng: 3.3711,
  };

  const streetViewOptions = {
    position: { lat: 6.5244, lng: 3.3792 },
    pov: { heading: 100, pitch: 0 },
    zoom: 1,
  };

    
  useEffect(() => {
    if (map && hospitals.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      hospitals.forEach((hospital: Hospital) => {
        const { lat, lng } = hospital.geometry.location;
        bounds.extend(new window.google.maps.LatLng(lat, lng));
      });
      map.fitBounds(bounds);

      const streetView = map.getStreetView();
      streetView?.setOptions(streetViewOptions);
    }
  }, [map, hospitals]);

  const googleMapsApiKey = "AIzaSyDYL048QSsNPEHs_crrIeZfrYH5_Qsh2Nk";


  // const googleMapsApiKey = import.meta.env.VITE_API_KEY;


  


  return (
    <div>
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
          onLoad={(map) => setMap(map)}
        >
          {hospitals &&
            hospitals.map((hospital: Hospital) => (
              <Marker
                key={hospital.place_id}
                position={hospital.geometry.location}
                
              />
            ))}
          {map && (
            <StreetViewPanorama options={streetViewOptions} />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapContainer;


// import { useState, useEffect } from "react";
// import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

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
//       hospitals.forEach((hospital: {
//         geometry: { location: { lat: any; lng: any } };
//       }) => {
//         const { lat, lng } = hospital.geometry.location;
//         bounds.extend(new window.google.maps.LatLng(lat, lng));
//       });
//       (map as google.maps.Map).fitBounds(bounds);
//     }
//   }, [map, hospitals]);

//   const googleMapsApiKey = "AIzaSyDYL048QSsNPEHs_crrIeZfrYH5_Qsh2Nk";

//   const markerIcon = {
//     path: "M10 2C5.032 2 1 6.032 1 11c0 4.969 4.032 9 9 9 4.969 0 9-4.031 9-9 0-4.968-4.031-9-9-9zm0 16c-3.859 0-7-3.14-7-7 0-3.858 3.141-7 7-7 3.86 0 7 3.142 7 7 0 3.86-3.14 7-7 7z",
//     fillColor: "#FF0000",
//     fillOpacity: 1,
//     strokeWeight: 0,
//     scale: 1.5,
//     labelOrigin: new window.google.maps.Point(10, 10),
//   };

//   return (
//     <div>
//       <LoadScript googleMapsApiKey={googleMapsApiKey}>
//         <GoogleMap
//           mapContainerStyle={mapStyles}
//           zoom={13}
//           center={defaultCenter}
//           onLoad={(map) => setMap(map)}
//         >
//           {hospitals &&
//             hospitals.map((hospital: Hospital) => (
//               <Marker
//                 key={hospital.place_id}
//                 position={hospital.geometry.location}
//                 icon={markerIcon}
//                 label="H"
//               />
//             ))}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default MapContainer;

