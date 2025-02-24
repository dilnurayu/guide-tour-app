import {
  TouristGuideBooking,
  TouristTourBooking,
  GuideGuideBooking,
  GuideTourBooking,
} from "../models/NotificationModel";

const API_BASE_URL = "https://guide-tour-api.vercel.app";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const NotificationService = {
  getTouristGuideBookings: async (): Promise<TouristGuideBooking[]> => {
    const response = await fetch(`${API_BASE_URL}/bookings/guides/tourist/me`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch tourist guide bookings");
    }
    return response.json();
  },

  getTouristTourBookings: async (): Promise<TouristTourBooking[]> => {
    const response = await fetch(`${API_BASE_URL}/bookings/tours/tourist/me`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch tourist tour bookings");
    }
    return response.json();
  },

  getGuideGuideBookings: async (): Promise<GuideGuideBooking[]> => {
    const response = await fetch(`${API_BASE_URL}/bookings/guides/guide/me`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch guide bookings");
    }
    return response.json();
  },

  getGuideTourBookings: async (): Promise<GuideTourBooking[]> => {
    const response = await fetch(`${API_BASE_URL}/bookings/tours/guide/me`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch tour bookings for guide");
    }
    return response.json();
  },

  confirmBooking: async (bookingId: number, type: "guide" | "tour") => {
    const endpoint =
      type === "guide"
        ? `/bookings/guides/${bookingId}/confirm`
        : `/bookings/tour/${bookingId}/confirm`;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      throw new Error("Failed to confirm booking");
    }
    return response.json();
  },
};
