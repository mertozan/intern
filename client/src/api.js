import axios from "axios";
// create axios instance
const api = axios.create({ baseURL: "http://localhost:8000/api" });
export default api;
