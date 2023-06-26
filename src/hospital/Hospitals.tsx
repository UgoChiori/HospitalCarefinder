import React, { useState, useEffect } from "react";
import axios from "axios";
import HospitalCard from "../hospital/HospitalCard";
import "./hospitals.css";
import { AiOutlineSearch } from "react-icons/ai";
import { FaWhatsapp, FaEnvelope, FaLink } from "react-icons/fa";
import MapContainer from "../pages/MapContainer";

interface HospitalProps {
  handleDetails: any;
}

const Hospitals: React.FC<HospitalProps> = ({ handleDetails }) => {
  const [testHospitals, setTestHospitals] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nextTokens, setNextTokens] = useState<any[]>([]);
  const [nextState, setNextState] = useState<boolean>(false);
  const [pageUrl] = useState<string[]>([
    "http://localhost:9090/api/maps/place?latitude=6.468137&longitude=3.638487&radius=30000",
    "http://localhost:9090/api/maps/place/next?nextpage=",
  ]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

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
    setLoading(true);
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredHospitals = testHospitals.filter((hospital) =>
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setTestHospitals(filteredHospitals);
  }, [searchQuery]);

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
            setNextTokens([...nextTokens, nextPage as any]);
            setNextState(true);
            if (res.data.next_page_token) {
              setNextState(true);
            } else {
              setNextState(false);
            }
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

  const handleShare = () => {
    const hospitalData = testHospitals.map((hospital) => hospital.name).join("\n");
    const message = `Check out these hospitals: \n${hospitalData}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShareEmail = () => {
    const hospitalData = testHospitals.map((hospital) => hospital.name).join("\n");
    const shareBody = `Check out these hospitals: \n${hospitalData}`;

    const emailUrl = `mailto:?subject=${encodeURIComponent(
      "Check out these hospitals"
    )}&body=${encodeURIComponent(shareBody)}`;
    window.open(emailUrl, "_blank");
  };

  const handleGenerateLink = () => {
    const hospitalData = testHospitals.map((hospital) => hospital.name).join("\n");
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
            placeholder="Search for hospitals"
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="hospital-cover">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          <div className="hospitals-grid">
            {testHospitals.length > 0 ? (
              testHospitals?.map((_hospital: any, index: number) => (
                <HospitalCard
                  key={index}
                  name={_hospital.name}
                  status={_hospital.business_status}
                  rating={_hospital.rating}
                  handleDetails={handleDetails}
                  details={_hospital}
                  formatted_address={_hospital.formatted_address}
                />
              ))
            ) : (
              <p>No hospitals found.</p>
            )}
          </div>
        )}
      </div>
      <div className="pagination-buttons">
        <button disabled={currentPage === 1} onClick={previousPage}>
          Prev
        </button>
        <button disabled={!nextState} onClick={nextPage}>
          Next
        </button>
        <FaWhatsapp className="share-button" onClick={handleShare} />
        <FaEnvelope className="share-button" onClick={handleShareEmail} />
        <FaLink className="share-button" onClick={handleGenerateLink} />
      </div>
      <MapContainer hospitals={testHospitals} />
    </div>
  );
};

export default Hospitals;
