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
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form inputs
    let isValid = true;

    if (name.length < 3) {
      setNameError("Name must be at least 3 characters");
      isValid = false;
    } else {
      setNameError("");
    }

    if (email.length < 3) {
      setEmailError("Email must be at least 3 characters");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords must match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!isValid) {
      return;
    }

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
        <h1>Register</h1>
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
              {nameError && <p>{nameError}</p>}
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
              {emailError && <p>{emailError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                 {showPassword ? (
                  <FaEyeSlash className="eye-icon" onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye className="eye-icon" onClick={() => setShowPassword(!showPassword) } />
                )}
              </div>
              {passwordError && (
                <span className="error" style={{ color: "red" }}>
                  {passwordError}{" "}
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <div className="password-input-wrapper">
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              
               
              </div>
              {confirmPasswordError && <p>{confirmPasswordError}</p>}
            </div>
            <button className="signup-methods" type="submit">
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
