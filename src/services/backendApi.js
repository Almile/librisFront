import axios from "axios";

const backendApi = axios.create({
  baseURL: "http://localhost:8080/libris",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default backendApi;