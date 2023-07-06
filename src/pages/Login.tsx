import React, { useState, useEffect, FormEvent } from "react";
import { auth } from "../components/Firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./login.css";

interface SigninFormProps {
  signIn: () => void;
}

const Login: React.FC<SigninFormProps> = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    // Check if the user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setName(user.displayName || null);
      } else {
        setLoggedIn(false);
        setName(null);
      }
    });

    return () => {
      // Unsubscribe from the auth state listener when component unmounts
      unsubscribe();
    };
  }, []);

  const validateForm = (): boolean => {
    let isValid = true;

    if (!email) {
      setEmailError("Please enter your email");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Please enter your password");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      navigate("/hospitals");
      setLoggedIn(true);
      setName(auth.currentUser?.displayName || null);
    } catch (error) {
      console.log("Login failed:", error);
      setPasswordError("Password is incorrect, please try again");
    }
  };

  const handleSignIn = async (provider: GoogleAuthProvider) => {
    try {
      await signInWithPopup(auth, provider);

      navigate("/hospitals");
      setLoggedIn(true);
      setName(auth.currentUser?.displayName || null);
    } catch (error) {
      setPasswordError("Login failed");
    }
  };

  const handleResetPasssword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Sending password reset email, please check your email");
      setPasswordError(" Password reset email sent, please check your email");
    } catch (error) {
      console.log("Sending password reset email failed, please try again");
      setPasswordError(" Password reset email failed, please try again");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logout successful");
      navigate("/");
      setLoggedIn(false);
      setName(null);
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <div className="login-form-wrapper">
      <div className="login-form">
        {loggedIn ? (
          <div className="welcome-container">
            <h1 className="welcome">Welcome, {name || ""}!</h1>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <h1 className="login">Log In</h1>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <span className="error">{emailError}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordError && (
                <span className="error" style={{ color: "red" }}>
                  {passwordError}
                </span>
              )}
            </div>
            <div className="login-methods">
              <button type="submit">Sign In</button>
            </div>
          </form>
        )}

        {!loggedIn && (
          <div className="login-methods">
            <button onClick={() => handleSignIn(new GoogleAuthProvider())}>
              Sign in with Google
            </button>
          </div>
        )}
        <a
          href=""
          style={{
            border: "none",
            textDecoration: "none",
            fontSize: "0.8rem",
            color: "darkturquoise",
          }}
          className="reset-password"
          onClick={handleResetPasssword}
        >
          Reset Password
        </a>
        {!loggedIn && (
          <p className="linkback" onClick={() => navigate("/register")}>
            Need an account? Sign Up
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
