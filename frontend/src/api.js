import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

api.interceptors.request.use(
  (config) => {
    // This function is executed before making a request.
    // It receives the request configuration object as a parameter (config).
    const token = localStorage.getItem(ACCESS_TOKEN);
    // Retrieve the access token from the localStorage.

    if (token) {
      // If a token is found in the localStorage, add it to the request headers.
      config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header with the token.
    }
    return config;
    // Return the modified request configuration object.
  },
  (error) => {
    // This function is executed if an error occurs during the request.
    // It receives the error object as a parameter (error).
    return Promise.reject(error);
    // Return a rejected Promise with the error object.
  }
);

export default api;
