import Cookies from "js-cookie";

const ACCESS_TOKEN = "ACCESS_TOKEN";

import { useEffect } from "react";

const useSpotifyAuth = () => {
  useEffect(() => {
    const hash = window.location.hash;
    const tokenMatch = hash.match(/access_token=([^&]*)/);
    if (tokenMatch) {
      const token = tokenMatch[1];
      localStorage.setItem("spotifyToken", token);
      window.location.hash = ""; // Clear hash
    }
  }, []);
};

export const getAccessToken = () => {
  return localStorage.getItem("spotifyToken");
};

export const setAccessToken = (token: string) => {
  localStorage.setItem("spotifyToken", token);
};

export const removeAccessToken = () => Cookies.remove(ACCESS_TOKEN);

export const hasAccessToken = () => !!Cookies.get(ACCESS_TOKEN);
export const getTokenFromUrl = () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get("access_token");
};
