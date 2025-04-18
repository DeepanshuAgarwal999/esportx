import axiosInstance from "../../config/axios.config";

export class ProfileService {
  static async getProfile(username: string) {
    const response = await axiosInstance.get(`/profile/${username}`);
    return response.data;
  }

  static async updateProfileByName(credentials: { user_id: string; first_name: string; last_name: string }) {
    const response = await axiosInstance.put("/updateProfileName", credentials);
    return response.data;
  }

  static async updateGender(credentials: { user_id: string; gender: string }) {
    const response = await axiosInstance.put("/updateGender", credentials);
    return response.data;
  }

  static async updateDob(credentials: { user_id: string; dob: string }) {
    const response = await axiosInstance.put("/updateDob", credentials);
    return response.data;
  }

  static async getEmailVerificationCode(credentials: { email: string; user_id: string }) {
    const response = await axiosInstance.post("/getEmailVerificationCode", credentials);
    return response.data;
  }

  static async verifyEmail(credentials: { email: string; user_id: string; code: string }) {
    const response = await axiosInstance.post("/verifyEmail", credentials);
    return response.data;
  }
}
