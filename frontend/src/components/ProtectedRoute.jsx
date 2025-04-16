import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    // Retrieve the refresh token from local storage
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      // Send a POST request to the "/api/token/refresh/" endpoint with the refresh token
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        // If the request is successful (status code 200), update the access token in local storage
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        // Set the "isAuthorized" state to true
        setIsAuthorized(true);
      } else {
        // If the request is not successful, set the "isAuthorized" state to false
        setIsAuthorized(false);
      }
    } catch (error) {
      // If an error occurs during the request, log the error and set the "isAuthorized" state to false
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    // Retrieve the access token from local storage
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      // If the access token is not present, set the "isAuthorized" state to false and return
      setIsAuthorized(false);
      return;
    }
    // Decode the access token to get the expiration time
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      // If the token has expired, call the "refreshToken" function to get a new access token
      await refreshToken();
    } else {
      // If the token is still valid, set the "isAuthorized" state to true
      setIsAuthorized(true);
    }
  };

  if (isAuthorized === null) {
    // If the "isAuthorized" state is null, render a loading message
    return <div>Loading...</div>;
  }

  // If the "isAuthorized" state is true, render the children components
  // Otherwise, redirect to the login page
  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
