import{ useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

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
    lat: 6.5244,
    lng: 3.3792,
  };

  useEffect(() => {
    if (map && hospitals.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      hospitals.forEach((hospital: {
        geometry: { location: { lat: any; lng: any } };
      }) => {
        const { lat, lng } = hospital.geometry.location;
        bounds.extend(new window.google.maps.LatLng(lat, lng));
      });
      (map as google.maps.Map).fitBounds(bounds);
    }
  }, [map, hospitals]);

  const googleMapsApiKey = import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

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
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapContainer;


