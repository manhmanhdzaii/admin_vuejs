import axios from "axios";
import {BASE_URL} from "../config/baseurl";
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
});

export default axiosInstance;