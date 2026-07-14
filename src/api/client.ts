import axios from "axios";
import { API_URL } from "../constants";

export const apiClient = axios.create({
  baseURL: API_URL,
});

// Attach auth token from better-auth session (see src/store/authStore.ts)
apiClient.interceptors.request.use((config) => {
  // const token = useAuthStore.getState().token;
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
