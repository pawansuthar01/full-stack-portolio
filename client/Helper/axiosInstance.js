import axios from "axios";
const BASIC_URL = "https://full-stack-portolio-1-0evy.onrender.com";
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASIC_URL;
axiosInstance.defaults.withCredentials = true;
export default axiosInstance;
