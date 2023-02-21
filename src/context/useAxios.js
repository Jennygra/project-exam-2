import { useContext } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import { BASE_URL } from "../data/Api";

// A custom hook function that provides an Axios client with authentication headers, which contains the users access token for authentication
// If no token, the header is set to an empty string

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
