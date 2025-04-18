import axiosInstance from "@/config/axios.config";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || "https://demo.esportx.co.in/api";

export class AboutService {
  static async contactUs(credentials: { user_id: string; name: string; email: string; phone: string; subject: string; message: string }) {
    const response = await axiosInstance.post(`/contactUs`, credentials);
    return response.data;
  }

  static async sendFeedback(credentials: { user_id: string; name: string; email: string; phone: string; subject: string; message: string }) {
    const response = await axiosInstance.post(`/sendFeedback`, credentials);
    return response.data;
  }
  static async termsAndConditions() {
    const response = await axiosInstance.get(`/termsAndConditions`);
    return response.data;
  }

  static async privacyPolicy() {
    const response = await axiosInstance.get(`/privacyPolicy`);
    return response.data;
  }
}
