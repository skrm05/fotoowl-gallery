import axios from "axios";
const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

export const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${API_KEY}`,
  },
});
