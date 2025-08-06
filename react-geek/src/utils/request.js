import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router";

// create axios request object
const request = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});

// request interceptor
request.interceptors.request.use(
  (config) => {
    const token = getToken(); // get token from localstorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // set request header
    }
    return config; // return config, continue sending request
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.dir(error);

    // no auth, usually token expired
    if (error.response.status === 401) {
      removeToken(); // remove local token
      router.navigate("/login"); // to login page
      window.location.reload(); // reload page and reset redux status
    }
    return Promise.reject(error);
  }
);

export { request };
