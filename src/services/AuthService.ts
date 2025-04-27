import { AuthData, AuthResponse } from "../models/authModel";

const API_BASE_URL = "https://guide-tour-api.vercel.app/auth";

export const authService = {
  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Login failed");
    }
    return responseData;
  },

  register: async (data: AuthData): Promise<AuthResponse> => {
    if (data.profile_photo) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("address_id", data.address_id.toString());
      formData.append("user_type", data.user_type);

      if (data.profile_photo) {
        formData.append("profile_photo", data.profile_photo);
      }

      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Signup failed");
      }
      return responseData;
    } else {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Signup failed");
      }
      return responseData;
    }
  },
};
