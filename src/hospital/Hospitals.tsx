// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import HospitalCard from "../hospital/HospitalCard";
// import "./hospitals.css";
// import { AiOutlineSearch } from "react-icons/ai";
// import "firebase/app";
// import { FaWhatsapp, FaEnvelope, FaLink } from "react-icons/fa";
// import MapContainer from "../pages/MapContainer";
// // import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// // import LocationPermissionPopup from "../components/LocationPermissionPopup";

// interface HospitalProps {
//   handleDetails: any;
// }
// const Hospitals: React.FC<HospitalProps> = ({ handleDetails }) => {
//   const [testHospitals, setTestHospitals] = useState<any[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [nextTokens, setNextTokens] = useState<any[]>([]);
//   const [nextState, setNextState] = useState<boolean>(false);
//   const [pageUrl, setPageUrl] = useState<string[]>([
//     "http://localhost:9090/api/maps/place?latitude=6.468137&longitude=3.638487&radius=30000",
//     "http://localhost:9090/api/maps/place/next?nextpage=",
//   ]);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true); // Added loading state

//   const [userLocation, setUserLocation] = useState<any>({
//     latitude: 0,
//     longitude: 0,
//   });

//   useEffect(() => {
//     // Get user location
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setUserLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   }
//   , []);

//   // SHARE VIA WHATSAPP
//   const handleShare = () => {
//     const hospitalData = testHospitals
//       .map((hospital) => hospital.name)
//       .join("\n");
//     const message = `Check out these hospitals: \n${hospitalData}`;

//     const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
//     window.open(whatsappUrl, "_blank");
//   };

//   // SHARE VIA EMAIL
//   const handleShareEmail = () => {
//     const hospitalData = testHospitals
//       .map((hospital) => hospital.name)
//       .join("\n");
//     const shareBody = `Check out these hospitals: \n${hospitalData}`;

//     const emailUrl = `mailto:?subject=${encodeURIComponent(
//       "Check out these hospitals"
//     )}&body=${encodeURIComponent(shareBody)}`;
//     window.open(emailUrl, "_blank");
//   };

//   // GENERATE SHAREABLE LINK
//   const handleGenerateLink = () => {
//     const hospitalData = testHospitals
//       .map((hospital) => hospital.name)
//       .join("\n");
//     const shareBody = `Check out these hospitals: \n${hospitalData}`;

//     const linkUrl = `https://hospital-carefinder.vercel.app/hospitals?subject=${encodeURIComponent(
//       "Check out these hospitals"
//     )}&body=${encodeURIComponent(shareBody)}`;
//     window.open(linkUrl, "_blank");
//   };

//   // SEARCH HOSPITALS
//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);

//     if (e.target.value === "") {
//       setTestHospitals([]);
//       setLoading(true);
//       axios
//         .get(pageUrl[0])
//         .then((res) => {
//           console.log(res.data.results);
//           setTestHospitals(res.data.results);
//           if (res.data.next_page_token) {
//             setNextState(true);
//           }
//           const nextPage = { page: 2, token: res.data.next_page_token };
//           setNextTokens([...nextTokens, nextPage]);
//           console.log(typeof res.data.results[0].name);
//         })
//         .catch((err) => {
//           console.log(err);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   };

//   function nextPage(page: any) {
//     if (page) {
//       setCurrentPage(currentPage + 1);
//       return;
//     }
//     setCurrentPage(currentPage - 1);
//   }

//   useEffect(() => {
//     setLoading(true); // Start loading
//     axios
//       .get(pageUrl[0])
//       .then((res) => {
//         console.log(res.data.results);
//         setTestHospitals(res.data.results);
//         if (res.data.next_page_token) {
//           setNextState(true);
//         }
//         const nextPage = { page: 2, token: res.data.next_page_token };
//         setNextTokens([...nextTokens, nextPage]);
//         console.log(typeof res.data.results[0].name);
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(() => {
//         setLoading(false); // Stop loading
//       });
//   }, []);

//   useEffect(() => {
//     let pageToCall: string | undefined;
//     if (currentPage === 1) {
//       setLoading(true); // Start loading
//       axios
//         .get(pageUrl[0])
//         .then((res) => {
//           console.log(res.data.results);
//           setTestHospitals(res.data.results);
//           if (res.data.next_page_token) {
//             setNextState(true);
//           }
//           const nextPage = { page: 2, token: res.data.next_page_token };
//           setNextTokens([...nextTokens, nextPage]);
//           console.log(typeof res.data.results[0].name);
//         })
//         .catch((err) => {
//           console.log(err);
//         })
//         .finally(() => {
//           setLoading(false); // Stop loading
//         });
//     } else if (currentPage > 1) {
//       // eslint-disable-next-line array-callback-return
//       nextTokens.map((page) => {
//         if (page.page === currentPage) {
//           pageToCall = page.token;
//         }
//       });
//       setLoading(true); // Start loading
//       axios
//         .get(`${pageUrl[1]}${pageToCall}`)
//         .then((res) => {
//           // console.log(res.data.results);
//           setTestHospitals(res.data.results);
//           if (res.data.next_page_token) {
//             const nextPage = {
//               page: currentPage + 1,
//               token: res.data.next_page_token,
//             };
//             setNextTokens([...nextTokens, nextPage]);
//           }
//           if (res.data.next_page_token) {
//             setNextState(true);
//           } else {
//             setNextState(false);
//           }
//           console.log(typeof res.data.results[0].name);
//         })
//         .catch((err) => {
//           console.log(err);
//         })
//         .finally(() => {
//           setLoading(false); // Stop loading
//         });
//     }
//   }, [currentPage]);

//   useEffect(() => {
//     const filteredHospitals = testHospitals.filter((hospital) =>
//       hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setTestHospitals(filteredHospitals);
//   }, [searchQuery]);

//   return (
//     <div>
//       <div className="container">
//         <div id="careheader_input">
//           <AiOutlineSearch className="careheader_input_icon" />
//           <input
//             type="text"
//             placeholder="Search for hospitals"
//             onChange={handleSearch}
//           />
//         </div>
//       </div>

//       <div className="hospital-cover">
//         {loading ? (
//           <div className="loader">Loading...</div> // Show loading state
//         ) : (
//           <div className="hospitals-grid">
//             {testHospitals.length > 0 ? (
//               testHospitals?.map((_hospital: any, index: number) => (
//                 <HospitalCard
//                   key={index}
//                   name={_hospital.name}
//                   status={_hospital.business_status}
//                   rating={_hospital.rating}
//                   handleDetails={handleDetails}
//                   details={_hospital}
//                   formatted_address={_hospital.formatted_address}
//                 />
//               ))
//             ) : (
//               <p>No hospitals found.</p>
//             )}
//             {/* <textarea
//               className="share-textarea"
//               placeholder="Share this link"

//               readOnly
//             ></textarea> */}
//             {/* {testHospitals?.map((_hospital: any, index: number) => {
//               return (
//                 <HospitalCard
//                   key={index}
//                   name={_hospital.name}
//                   status={_hospital.business_status}
//                   rating={_hospital.rating}
//                   handleDetails={handleDetails}
//                   details={_hospital}
//                   formatted_address={_hospital.formatted_address}
//                 />
//               );
//             })} */}
//           </div>
//         )}
//       </div>
//       <div className="pagination-buttons">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => {
//             nextPage(false);
//           }}
//         >
//           Prev
//         </button>
//         <button
//           disabled={!nextState}
//           onClick={() => {
//             nextPage(true);
//           }}
//         >
//           Next
//         </button>
//         {/* ADD THE SHARE BUTTONS */}
//         <FaWhatsapp
//           className="share-button"
//           onClick={() => {
//             handleShare();
//           }}
//         />
//         <FaEnvelope
//           className="share-button"
//           onClick={() => {
//             handleShareEmail();
//           }}
//         />
//         <FaLink
//           className="share-button"
//           onClick={() => {
//             handleGenerateLink();
//           }}
//         />
//       </div>
//       <MapContainer hospitals={testHospitals} />
//     </div>
//   );
// };

// export default Hospitals;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import HospitalCard from "../hospital/HospitalCard";
// import "./hospitals.css";
// import { AiOutlineSearch } from "react-icons/ai";
// import "firebase/app";
// import { FaWhatsapp, FaEnvelope, FaLink } from "react-icons/fa";
// import MapContainer from "../pages/MapContainer";

// interface HospitalProps {
//   handleDetails: any;
// }

// const Hospitals: React.FC<HospitalProps> = ({ handleDetails }) => {
//   const [testHospitals, setTestHospitals] = useState<any[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [nextTokens, setNextTokens] = useState<any[]>([]);
//   const [nextState, setNextState] = useState<boolean>(false);
//   const [pageUrl, setPageUrl] = useState<string[]>([
//     "http://localhost:9090/api/maps/place?latitude=6.468137&longitude=3.638487&radius=30000",
//     "http://localhost:9090/api/maps/place/next?nextpage=",
//   ]);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const fetchHospitals = async (url: string) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(url);
//       setTestHospitals(response.data.results);
//       if (response.data.next_page_token) {
//         setNextState(true);
//         const nextPage = {
//           page: currentPage + 1,
//           token: response.data.next_page_token,
//         };
//         setNextTokens([...nextTokens, nextPage]);
//       } else {
//         setNextState(false);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCurrentPageHospitals = () => {
//     const url =
//       currentPage === 1
//         ? pageUrl[0]
//         : `${pageUrl[1]}${nextTokens[currentPage - 2].token}`;
//     fetchHospitals(url);
//   };

//   const nextPage = (isNext: boolean) => {
//     setCurrentPage((prevPage) => (isNext ? prevPage + 1 : prevPage - 1));
//   };

//   useEffect(() => {
//     fetchCurrentPageHospitals();
//   }, [currentPage]);

//   useEffect(() => {
//     fetchHospitals(pageUrl[0]);
//   }, []);

//   useEffect(() => {
//     const filteredHospitals = testHospitals.filter((hospital) =>
//       hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setTestHospitals(filteredHospitals);
//   }, [searchQuery, testHospitals]);

//   return (
//     <div>
//       <div className="container">
//         <div id="careheader_input">
//           <AiOutlineSearch className="careheader_input_icon" />
//           <input
//             type="text"
//             placeholder="Search for hospitals"
//             onChange={handleSearch}
//           />
//         </div>
//       </div>

//       <div className="hospital-cover">
//         {loading ? (
//           <div className="loader">Loading...</div>
//         ) : (
//           <div className="hospitals-grid">
//             {testHospitals.length > 0 ? (
//               testHospitals.map((hospital: any, index: number) => (
//                 <HospitalCard
//                   name={hospital.name}
//                   status={hospital.business_status}
//                   rating={hospital.rating}
//                   handleDetails={handleDetails}
//                   details={hospital}
//                   formatted_address={hospital.formatted_address}
//                 />
//               ))
//             ) : (
//               <div className="no-results">No hospitals found.</div>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="pagination">
//         {currentPage > 1 && (
//           <button className="prev-btn" onClick={() => nextPage(false)}>
//             Previous
//           </button>
//         )}
//         {nextState && (
//           <button className="next-btn" onClick={() => nextPage(true)}>
//             Next
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Hospitals;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import HospitalCard from "../hospital/HospitalCard";
// import "./hospitals.css";
// import { AiOutlineSearch } from "react-icons/ai";
// import "firebase/app";
// import { FaWhatsapp, FaEnvelope, FaLink } from "react-icons/fa";
// import MapContainer from "../pages/MapContainer";

// interface HospitalProps {
//   handleDetails: any;
// }

// const Hospitals: React.FC<HospitalProps> = ({ handleDetails }) => {
//   const [testHospitals, setTestHospitals] = useState<any[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [nextState, setNextState] = useState<boolean>(false);
//   const [pageUrl, setPageUrl] = useState<string>(
//     "http://localhost:9090/api/maps/place?latitude=6.468137&longitude=3.638487&radius=30000"
//   );
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(pageUrl)
//       .then((res) => {
//         console.log(res.data.results);
//         setTestHospitals(res.data.results);
//         setNextState(!!res.data.next_page_token);
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [pageUrl]);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   useEffect(() => {
//     const filteredHospitals = testHospitals.filter((hospital: any) =>
//       hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setTestHospitals(filteredHospitals);
//   }, [searchQuery]);

//   const nextPage = (isNext: boolean) => {
//     setCurrentPage((prevPage) => (isNext ? prevPage + 1 : prevPage - 1));
//   };

//   return (
//     <div>
//       <div className="container">
//         <div id="careheader_input">
//           <AiOutlineSearch className="careheader_input_icon" />
//           <input
//             type="text"
//             placeholder="Search for hospitals"
//             onChange={handleSearch}
//           />
//         </div>
//       </div>

//       <div className="hospital-cover">
//         {loading ? (
//           <div className="loader">Loading...</div>
//         ) : (
//           <div className="hospitals-grid">
//             {testHospitals.length > 0 ? (
//               testHospitals.map((hospital: any, index: number) => (
//                 <HospitalCard
//                   key={index}
//                   name={hospital.name}
//                   status={hospital.business_status}
//                   rating={hospital.rating}
//                   details={hospital}
//                   formatted_address={hospital.formatted_address}
//                   handleDetails={handleDetails}

//                   // address={hospital.vicinity}
//                   // handleDetails={() => handleDetails(hospital.place_id)}
//                 />
//               ))
//             ) : (
//               <div className="no-results">No hospitals found.</div>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="pagination">
//         {currentPage > 1 && (
//           <button className="prev-btn" onClick={() => nextPage(false)}>
//             Previous
//           </button>
//         )}
//         {nextState && (
//           <button className="next-btn" onClick={() => nextPage(true)}>
//             Next
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Hospitals

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
    "/api/maps/place?latitude=6.468137&longitude=3.638487&radius=30000",
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
