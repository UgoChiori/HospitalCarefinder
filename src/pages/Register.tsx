import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../components/Firebase";
import "./register.css";
import { useNavigate } from "react-router-dom";


const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registration successful");
      setRegistered(true);
      navigate("/hospitals");
    } catch (error) {
      console.log("Registration failed:", error);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");

    try {
      await signInWithPopup(auth, provider);
      console.log("Google sign up successful");
      setRegistered(true);
    } catch (error) {
      console.log("Google sign up failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logout successful");
      window.location.href = "/";
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <div className="registration-form-wrapper">
      <div className="registration-form">
        <h1>Registration</h1>
       {error && {error} }
        {registered ? (
          <div>
            <h1>Welcome, {name || ""}!</h1>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {name.length < 3 && <p>Name must be at least 3 characters</p>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {email.length < 3 && <p>Email must be at least 3 characters</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {password.length < 6 && (
                <p>Password must be at least 6 characters</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPassword !== password && <p>Passwords must match</p>}
            </div>
            <button
              onClick={handleSubmit}
              className="signup-methods"
              type="submit"
            >
              Register
            </button>
          </form>
        )}
        {!registered && (
          <div className="signup-methods">
            <button onClick={handleGoogleSignUp}>Sign up with Google</button>
          </div>
        )}

        {!registered && (
          <p onClick={() => navigate("/signin")} className="linkback">
            Already have an account? Login
          </p>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
