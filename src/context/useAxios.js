import { useContext } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import { BASE_URL } from "../data/Api";

const url = BASE_URL;

function useAxios() {
  const [auth] = useContext(AuthContext);

  const apiClient = axios.create({
    baseURL: url,
  });

  apiClient.interceptors.request.use(function (config) {
    const token = auth.accessToken;
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return apiClient;
}

export default useAxios;
