import axios from "axios";

export const liveMatchAxiosInstance = axios.create({
  baseURL: process.env.IPL_LIVE_DATA_ENDPOINT,
  timeout: 5000,
  withCredentials: true,
});
