import axios from "axios";
import { getAccessToken } from "./accessToken";

const apiUrl = "https://api.spotify.com";
const request = axios.create({
  baseURL: apiUrl,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

request.interceptors.request.use(
  (config) => {
    try {
      const accessToken = getAccessToken();
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      } else {
      }
    } catch (error) {
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
