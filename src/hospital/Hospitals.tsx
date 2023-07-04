import React, { useState, useEffect } from "react";
import axios from "axios";
import HospitalCard from "../hospital/HospitalCard";
import "./hospitals.css";
import { AiOutlineSearch } from "react-icons/ai";
import { FaWhatsapp, FaEnvelope, FaLink } from "react-icons/fa";
// import StreetViewMap from "../pages/MapContainer";
import MapContainer from "../pages/MapContainer";


interface HospitalProps {
  handleDetails: (place_id: string) => void;
}

const Hospitals: React.FC<HospitalProps> = ({ handleDetails }) => {
  const [testHospitals, setTestHospitals] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nextTokens, setNextTokens] = useState<any[]>([]);
  const [nextState, setNextState] = useState<boolean>(false);
  const [pageUrl] = useState<string[]>([
    `https://ugomedicareserver-gmkphvvg6-ugochiori.vercel.app/api/maps/place?latitude=6.468137&longitude=3.638487&radius=100000`,
    `https://ugomedicareserver-gmkphvvg6-ugochiori.vercel.app/api/maps/place/next?nextpage=`,
  ]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredHospitals, setFilteredHospitals] = useState<any[]>([]);
  // const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [latitude, setLatitude] = useState(6.5095);
  const [longitude, setLongitude] = useState(3.3711);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const previousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    const filteredHospitals = testHospitals.filter((hospital) =>
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredHospitals(filteredHospitals);
  }, [searchQuery, testHospitals]);

  useEffect(() => {
    const fetchData = async () => {
      let pageToCall: string | undefined;
      if (currentPage === 1) {
        setLoading(true);
        try {
          const res = await axios.get(pageUrl[0]);
          setTestHospitals(res.data.results);
          if (res.data.next_page_token) {
            setNextState(true);
          }
          const nextPage = { page: 2, token: res.data.next_page_token };
          setNextTokens([...nextTokens, nextPage]);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      } else if (currentPage > 1) {
        nextTokens.forEach((page) => {
          if (page.page === currentPage) {
            pageToCall = page.token;
          }
        });
        setLoading(true);
        try {
          const res = await axios.get(`${pageUrl[1]}${pageToCall}`);
          setTestHospitals(res.data.results);
          if (res.data.next_page_token) {
            const nextPage = {
              page: currentPage + 1,
              token: res.data.next_page_token,
            };
            setNextTokens([...nextTokens, nextPage]);
          } else {
            setNextState(false);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      const nearbyHospitalsUrl = `https://ugomedicareserver-gmkphvvg6-ugochiori.vercel.app/api/maps/place?latitude=${latitude}&longitude=${longitude}&radius=50000&type=hospitals`;

      try {
        const res = await axios.get(nearbyHospitalsUrl);
        setTestHospitals(res.data.results);
        if (res.data.next_page_token) {
          setNextState(true);
        }
        const nextPage = { page: 2, token: res.data.next_page_token };
        setNextTokens([...nextTokens, nextPage]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [latitude, longitude]);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        alert("Geolocation is not available");
      }
    };

    getLocation();
  }, []);

  const handleShare = () => {
    const hospitalData = testHospitals
      .map((hospital) => hospital.name)
      .join("\n");
    const message = `Check out these hospitals: \n${hospitalData}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShareEmail = () => {
    const hospitalData = testHospitals
      .map((hospital) => hospital.name)
      .join("\n");
    const shareBody = `Check out these hospitals: \n${hospitalData}`;

    const emailUrl = `mailto:?subject=${encodeURIComponent(
      "Check out these hospitals"
    )}&body=${encodeURIComponent(shareBody)}`;
    window.open(emailUrl, "_blank");
  };

  const handleGenerateLink = () => {
    const hospitalData = testHospitals
      .map((hospital) => hospital.name)
      .join("\n");
    const shareBody = `Check out these hospitals: \n${hospitalData}`;

    const linkUrl = `https://hospital-carefinder.vercel.app/hospitals?subject=${encodeURIComponent(
      "Check out these hospitals"
    )}&body=${encodeURIComponent(shareBody)}`;
    window.open(linkUrl, "_blank");
  };

  return (
    <div>
      <div className="container">
        <div id="careheader_input">
          <AiOutlineSearch className="careheader_input_icon" />
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="hospitals-cover">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <>
            {filteredHospitals.length === 0 ? (
              <p>No hospitals found</p>
            ) : (
              <div className="hospitals-grid">
                {filteredHospitals.map((_hospital, index) => (
                  <HospitalCard
                    key={index}
                    name={_hospital.name}
                    status={_hospital.business_status}
                    rating={_hospital.rating}
                    details={_hospital}
                    formatted_address={_hospital.vicinity}
                    handleDetails={handleDetails}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <div className="pagination-buttons">
        <button disabled={currentPage === 1} onClick={previousPage}>
          Prev
        </button>
        <button disabled={!nextState} onClick={nextPage}>
          Next
        </button>
        <div className="share-button-container">
          <FaWhatsapp className="share-button" onClick={handleShare} />
          <FaEnvelope className="share-button" onClick={handleShareEmail} />
          <FaLink className="share-button" onClick={handleGenerateLink} />
        </div>
      </div>
      <div>

       
        <MapContainer hospitals={[...filteredHospitals]}        

         />
        
        
      </div>
    </div>
  );
};

export default Hospitals;
