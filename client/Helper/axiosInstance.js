import axios from "axios";
const BASIC_URL = "";
const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASIC_URL;
axiosInstance.defaults.withCredentials = true;
export default axiosInstance;
