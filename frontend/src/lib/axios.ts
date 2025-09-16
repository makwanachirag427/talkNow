import axios from "axios";

const  backendURL =  import.meta.env.MODE === "development"
      ? "http://localhost:5001/api"
      : "talknow-production.up.railway.app/api";

export const axiosInstance = axios.create({
  baseURL:
  backendURL ,
  withCredentials: true,
});
