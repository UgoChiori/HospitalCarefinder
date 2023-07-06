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

