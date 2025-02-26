import axios from "axios";
const BASIC_URL = "https://full-stack-portolio.onrender.com";
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASIC_URL;
axiosInstance.defaults.withCredentials = true;
export default axiosInstance;
