import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000", // el backend que ya tienes
});

export default API;