import axios from "axios";
// import * as SecureStore from "expo-secure-store";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL || "https://demo.esportx.co.in/api",
  headers: {
    ["Content-Type"]: "multipart/form-data",
    ["api_key"]: process.env.EXPO_PUBLIC_API_KEY,
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try { 
      //   const token = await SecureStore.getItemAsync("token");
      //   if (token) {
      //     config.headers.Authorization = "Bearer " + token;
      //   }
      const formData = new FormData();
      if (config.data) {
        Object.entries(config.data).forEach(([key, value]) => {
          formData.append(key, value as string);
        });
        config.data = formData;
      }
    } catch (error) {
      console.log(error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
