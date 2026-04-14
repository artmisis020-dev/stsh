import axios from "axios";
import { API_CONFIG } from "../../constants/api";

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: API_CONFIG.timeoutMs,
});
