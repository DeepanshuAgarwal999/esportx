const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || "https://demo.esportx.co.in/api";

export class AuthService {
  static async login(username: string, password: string) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    return response.json();
  }

  static async signUp(credentials: { username_bgmi: string; userid_bgmi: string; upi_id: string; phone: string }) {
    const response = await fetch(`${BASE_URL}/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  }

  static async getOTP(phone: string) {
    const response = await fetch(`${BASE_URL}/getOTP`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone }),
    });
    return response.json();
  }

  static async verifyOTP(phone: string, otp: string) {
    const response = await fetch(`${BASE_URL}/verifyOTP`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, otp }),
    });
    return response.json();
  }
}
