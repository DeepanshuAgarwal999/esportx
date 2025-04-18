import axiosInstance from "@/config/axios.config";

export class AuthService {
  static async login(username: string, password: string) {
    const response = await axiosInstance.post(`/login`, { username, password });
    return response.data;
  }

  static async signUp(credentials: { username_bgmi: string; userid_bgmi: string; upi_id: string; phone: string }) {
    const response = await axiosInstance.post(`/signUp`, credentials);
    return response.data;
  }

  static async getOTP(phone: string) {
    const response = await axiosInstance.post(`/getOTP`, { phone });
    return response.data;
  }

  static async verifyOTP(phone: string, otp: string) {
    const response = await axiosInstance.post(`/verifyOTP`, { phone, otp });
    return response.data;
  }
}
