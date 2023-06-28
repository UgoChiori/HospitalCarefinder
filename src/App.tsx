import { useEffect, useContext, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./landingpage/HomePage";
import Login from "./pages/Login";
import Hospitals from "./hospital/Hospitals";
import HospitalDetails from "./hospital/HospitalDetails";
import Register from "./pages/Register";
import { ErrorFallback } from "./components/Errorboundary/ErrorFallBack";
import { ErrorBoundary } from "react-error-boundary";
import { AuthContext } from "./context/AuthContext";
import NavigationBar from "./navigation/NavigationBar";
import { auth, signOut, signInWithGoogle } from "./components/Firebase";
import NotFoundPage from "./components/NotFound";
import AddHospital from "./pages/AddHospital";
import AddDoctor from "./pages/AddDoctor";
// import PrivateRoute from "./components/PrivateRoute";

function App() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [details, setDetails] = useState();

  const navigate = useNavigate();

  let count = localStorage.getItem("page_views");
  if (count === null) {
    count = "1";
  } else {
    count = (parseInt(count) + 1).toString();
  }
  localStorage.setItem("page_views", count);

  // SET DETAILS
  const handleDetails = (details: any) => {
    setDetails(details);
  };

  // Google Signin
  const signIn = () => {
    signInWithGoogle();
  };

  // Google signup

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const signUp = () => {
    signUp();
  };

  // Google Signout
  const signOutUser = () => {
    signOut();
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const client = auth.currentUser;
        setCurrentUser(client);
      } else {
        setCurrentUser(null);
      }
    });
  }, [setCurrentUser]);

  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <NavigationBar signOut={signOutUser} user={currentUser} />

        <Routes>
          <Route path="/" element={<HomePage />} />
         
        
          <Route path="/hospitals" element={<Hospitals handleDetails={handleDetails}/>} />
        
        
      
          <Route
            path="/hospitaldetails"
            element={
              <HospitalDetails
                name={""}
                business_status={""}
                rating={""}
                details={details}
                vicinity={""}
                opening_hours={false}
              />
            }
          />
          <Route path="/signin" element={ <Login signIn={signIn} />} />
          <Route path="/register" element={ <Register />} />
          <Route path="/addhospital" element={<AddHospital />} />
          <Route path="/doctors" element={<AddDoctor />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
