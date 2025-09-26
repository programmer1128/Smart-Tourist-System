import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

// --- Axios Instance ---
// It's good practice to define a base URL for your API calls.
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

const LoginPage = () => {
  // State to toggle between Login and Register forms
  const [isRegistering, setIsRegistering] = useState(false);

  // Common state for loading and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // State for Login form
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // State for Register form
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');


  // --- LOGIN HANDLER (Corrected for HTTP Basic Auth) ---
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      // With Basic Auth, we try to access a protected resource.
      // If credentials are correct, we get a 200 OK. If not, a 401 Unauthorized.
      // A tourist-only endpoint is a good, simple page to test against.
      const response = await api.get('/api/tourist/attractions', {
        auth: {
          username: loginUsername,
          password: loginPassword,
        },
      });

      setLoading(false);
      // If the request was successful, the login is valid.
      alert(`Login Successful! Server says: "${response.data}"`);
      // Here you would typically redirect the user or save their auth state.
      navigate("/dashboard");

    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 401) {
        setError('Invalid username or password.');
      } else {
        setError('Login failed. Please check your connection and try again.');
      }
    }
  };

  // --- REGISTER HANDLER (Corrected API path) ---
  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      // This calls your backend's public registration endpoint.
      const response = await api.post('/api/auth/register', {
        username: registerUsername,
        password: registerPassword,
      });
      setLoading(false);
      alert(response.data); // The backend returns a success string.
      
      // --- EDITED SECTION ---
      // Auto-fill the login form with the new username
      setLoginUsername(registerUsername);
      // Clear the registration form fields
      setRegisterUsername('');
      setRegisterPassword('');
      // Switch to the login form
      setIsRegistering(false);

    } catch (err) {
      setLoading(false);
      // The backend returns an error message if the username already exists.
      setError(err.response?.data || 'Registration failed. Please try again.');
    }
  };
  
  const toggleForm = () => {
      setError('');
      setIsRegistering(!isRegistering);
  }

  return (
    <div className="login-container">
      {/* --- LEFT SECTION --- */}
      <div className="welcome-section">
        {isRegistering ? (
          <>
            <h1>Create Account</h1>
            <p>Join us and be a part of our community. Fill out the form to get started on your journey with us.</p>
          </>
        ) : (
          <>
            <h1>Welcome Back</h1>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </>
        )}
        <div className="social-icons">
          <a href="#" aria-label="Facebook"><FaFacebookF /></a>
          <a href="#" aria-label="Twitter"><FaTwitter /></a>
          <a href="#" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="YouTube"><FaYoutube /></a>
        </div>
      </div>

      {/* --- RIGHT SECTION (FORM) --- */}
      <div className="form-section">
        {isRegistering ? (
          // --- REGISTER FORM ---
          <>
            <h2>Sign Up</h2>
            <form onSubmit={handleRegister}>
              <div className="input-group">
                <label htmlFor="registerUsername">Username</label>
                <input type="text" id="registerUsername" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} required/>
              </div>
              <div className="input-group">
                <label htmlFor="registerPassword">Password</label>
                <input type="password" id="registerPassword" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required/>
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="signin-btn" disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up Now'}
              </button>
            </form>
            <div className="terms">
              <p>Already have an account? <a href="#" onClick={toggleForm}>Sign In</a></p>
            </div>
          </>
        ) : (
          // --- LOGIN FORM ---
          <>
            <h2>Sign In</h2>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="loginUsername">Username</label>
                <input type="text" id="loginUsername" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} required/>
              </div>
              <div className="input-group">
                <label htmlFor="loginPassword">Password</label>
                <input type="password" id="loginPassword" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required/>
              </div>
              {error && <p className="error-message">{error}</p>}
              <div className="form-options">
                <div className="remember-me">
                  <input type="checkbox" id="rememberMe" />
                  <label htmlFor="rememberMe">Remember Me</label>
                </div>
                <a href="#" className="forgot-password">Lost your password?</a>
              </div>
              <button type="submit" className="signin-btn" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign in now'}
              </button>
            </form>
            <div className="terms">
              <p>Don't have an account? <a href="#" onClick={toggleForm}>Sign Up</a></p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;

