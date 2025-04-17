const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || "https://demo.esportx.co.in/api";

export class AboutService {
  static async contactUs(credentials: { user_id: string; name: string; email: string; phone: string; subject: string; message: string }) {
    const response = await fetch(`${BASE_URL}/contactUs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  static async sendFeedback(credentials: { user_id: string; name: string; email: string; phone: string; subject: string; message: string }) {
    const response = await fetch(`${BASE_URL}/sendFeedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  }
  static async termsAndConditions() {
    const response = await fetch(`${BASE_URL}/termsAndConditions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
}
