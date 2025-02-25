import axios from "axios";

const backendApi = axios.create({
    baseURL: "http://localhost:8080/libris",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Permite envio de cookies e credenciais
});

export default backendApi;
