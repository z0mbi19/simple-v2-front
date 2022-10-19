import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4001/",
});
console.log(process.env.API_URL);

export default api;
