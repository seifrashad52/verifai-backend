import axios from "axios";
import { API_URL } from "../constants";
import { useAuthStore } from "../store/authStore";

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().session?.session.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
