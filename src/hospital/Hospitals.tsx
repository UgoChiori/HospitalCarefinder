import React, { useState, useEffect } from "react";
import axios from "axios";
import HospitalCard from "../hospital/HospitalCard";
import "./hospitals.css";
import { AiOutlineSearch } from "react-icons/ai";
import "firebase/app";
import { FaWhatsapp, FaEnvelope, FaLink } from "react-icons/fa";
import MapContainer from "../pages/MapContainer";
// import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import LocationPermissionPopup from "../components/LocationPermissionPopup";

interface HospitalProps {
  handleDetails: any;
}
const Hospitals: React.FC<HospitalProps> = ({ handleDetails }) => {
  const [testHospitals, setTestHospitals] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nextTokens, setNextTokens] = useState<any[]>([]);
  const [nextState, setNextState] = useState<boolean>(false);
  const [pageUrl] = useState<string[]>([
    "https://hospital-carefinder-slui-i6gozcd8z-ugochiori.vercel.app/api/maps/place?latitude=6.468137&longitude=3.638487&radius=30000",
    "https://hospital-carefinder-slui-i6gozcd8z-ugochiori.vercel.app/api/maps/place/next?nextpage=",
  ]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Added loading state
  const [showLocationPopup, setShowLocationPopup] = useState<boolean>(false);

  // SHARE VIA WHATSAPP
  const handleShare = () => {
    const hospitalData = testHospitals
      .map((hospital) => hospital.name)
      .join("\n");
    const message = `Check out these hospitals: \n${hospitalData}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // SHARE VIA EMAIL
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

  // GENERATE SHAREABLE LINK
  const handleGenerateLink = () => {
    const hospitalData = testHospitals
      .map((hospital) => hospital.name)
      .join("\n");
    const shareBody = `Check out these hospitals: \n${hospitalData}`;

    const linkUrl = `https://mycarefinder.netlify.app/?subject=${encodeURIComponent(
      "Check out these hospitals"
    )}&body=${encodeURIComponent(shareBody)}`;
    window.open(linkUrl, "_blank");
  };

  const handleLocationPermissionResponse = (allowPermission: any) => {
    if (allowPermission) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(latitude, longitude);
          const url = `http://localhost:9090/api/maps/place?latitude=${latitude}&longitude=${longitude}&radius=30000`;
          axios.get(url).then((response) => {
            console.log(response);
            setTestHospitals(response.data.results);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      setShowLocationPopup(false);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setShowLocationPopup(false);
    } else {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(latitude, longitude);
                const url = `http://localhost:9090/api/maps/place?latitude=${latitude}&longitude=${longitude}&radius=30000`;
                axios.get(url).then((response) => {
                  console.log(response);
                  setTestHospitals(response.data.results);
                });
              },
              (error) => {
                console.log(error);
              }
            );
          } else if (permissionStatus.state === "prompt") {
            setShowLocationPopup(true);
          } else {
            setShowLocationPopup(false);
            console.log("Permission denied");
          }
        });
    }
  }, []);

  // SEARCH HOSPITALS
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);

    if (e.target.value === "") {
      setTestHospitals([]);
      setLoading(true);
      axios
        .get(pageUrl[0])
        .then((res) => {
          console.log(res.data.results);
          setTestHospitals(res.data.results);
          if (res.data.next_page_token) {
            setNextState(true);
          }
          const nextPage = { page: 2, token: res.data.next_page_token };
          setNextTokens([...nextTokens, nextPage]);
          console.log(typeof res.data.results[0].name);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  function nextPage(page: any) {
    if (page) {
      setCurrentPage(currentPage + 1);
      return;
    }
    setCurrentPage(currentPage - 1);
  }

  useEffect(() => {
    setLoading(true); // Start loading
    axios
      .get(pageUrl[0])
      .then((res) => {
        console.log(res.data.results);
        setTestHospitals(res.data.results);
        if (res.data.next_page_token) {
          setNextState(true);
        }
        const nextPage = { page: 2, token: res.data.next_page_token };
        setNextTokens([...nextTokens, nextPage]);
        console.log(typeof res.data.results[0].name);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Stop loading
      });
  }, []);

  useEffect(() => {
    let pageToCall: string | undefined;
    if (currentPage === 1) {
      setLoading(true); // Start loading
      axios
        .get(pageUrl[0])
        .then((res) => {
          console.log(res.data.results);
          setTestHospitals(res.data.results);
          if (res.data.next_page_token) {
            setNextState(true);
          }
          const nextPage = { page: 2, token: res.data.next_page_token };
          setNextTokens([...nextTokens, nextPage]);
          console.log(typeof res.data.results[0].name);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false); // Stop loading
        });
    } else if (currentPage > 1) {
      // eslint-disable-next-line array-callback-return
      nextTokens.map((page) => {
        if (page.page === currentPage) {
          pageToCall = page.token;
        }
      });
      setLoading(true); // Start loading
      axios
        .get(`${pageUrl[1]}${pageToCall}`)
        .then((res) => {
          // console.log(res.data.results);
          setTestHospitals(res.data.results);
          if (res.data.next_page_token) {
            const nextPage = {
              page: currentPage + 1,
              token: res.data.next_page_token,
            };
            setNextTokens([...nextTokens, nextPage]);
          }
          if (res.data.next_page_token) {
            setNextState(true);
          } else {
            setNextState(false);
          }
          console.log(typeof res.data.results[0].name);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false); // Stop loading
        });
    }
  }, [currentPage]);

  useEffect(() => {
    const filteredHospitals = testHospitals.filter((hospital) =>
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setTestHospitals(filteredHospitals);
  }, [searchQuery]);

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
        {showLocationPopup && (
          <div className="location-popup">
            <div className="location-popup-content">
              <p>
                Please enable location permissions to view hospitals near you
              </p>
              <button onClick={handleLocationPermissionResponse}>Enable</button>
            </div>
          </div>
        )}
        {loading ? (
          <div className="loader">Loading...</div> // Show loading state
        ) : (
          <div className="hospitals-grid">
            {testHospitals?.map((_hospital: any, index: number) => {
              return (
                <HospitalCard
                  key={index}
                  name={_hospital.name}
                  status={_hospital.business_status}
                  rating={_hospital.rating}
                  handleDetails={handleDetails}
                  details={_hospital}
                  formatted_address={_hospital.formatted_address}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="pagination-buttons">
        <button
          disabled={currentPage === 1}
          onClick={() => {
            nextPage(false);
          }}
        >
          Prev
        </button>
        <button
          disabled={!nextState}
          onClick={() => {
            nextPage(true);
          }}
        >
          Next
        </button>
        {/* ADD THE SHARE BUTTONS */}
        <FaWhatsapp
          className="share-button"
          onClick={() => {
            handleShare();
          }}
        />
        <FaEnvelope
          className="share-button"
          onClick={() => {
            handleShareEmail();
          }}
        />
        <FaLink
          className="share-button"
          onClick={() => {
            handleGenerateLink();
          }}
        />
      </div>
      <MapContainer hospitals={testHospitals} />
    </div>
  );
};

export default Hospitals;
