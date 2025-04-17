const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || "https://demo.esportx.co.in/api";

export class ProfileService {
  static async getProfile(username: string) {
    const response = await fetch(`${BASE_URL}/profile/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  static async updateProfileByName(credentials: { user_id: string; first_name: string; last_name: string }) {
    const response = await fetch(`${BASE_URL}/updateProfileName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  }

  static async updateGender(credentials: { user_id: string; gender: string }) {
    const response = await fetch(`${BASE_URL}/updateGender}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  }

  static async updateDob(credentials: { user_id: string; dob: string }) {
    const response = await fetch(`${BASE_URL}/updateDob}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  }

  static async getEmailVerificationCode(credentials: { email: string; user_id: string }) {
    const response = await fetch(`${BASE_URL}/getEmailVerificationCode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  }
  
  static async verifyEmail(credentials: { email: string; user_id: string; code: string }) {
    const response = await fetch(`${BASE_URL}/verifyEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  }
}
