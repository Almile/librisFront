import axios from "axios";

const backendApi = axios.create({
  baseURL: "http://localhost:8080/libris", // Base URL for the backend
  withCredentials: true, // Include credentials (if needed)
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

export default backendApi;