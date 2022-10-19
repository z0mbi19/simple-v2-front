import axios from "axios";

const api = axios.create({
  baseURL: "https://simple-v2-back.vercel.app/",
});
console.log(process.env.API_URL);

export default api;
