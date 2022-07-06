import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("access_token") || "",
  },
});
