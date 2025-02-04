import axios from "axios";

const googleBooksApi = axios.create({
    baseURL: "https://www.googleapis.com/books/v1/volumes",
    timeout: 10000,
    validateStatus: status => status < 400,
});

export default googleBooksApi;