import { BookingGuide } from "../models/BookingGuide";
import { BookingTour } from "../models/BookingTour";

const API_BASE_URL = "https://guide-tour-api.vercel.app";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const BookingService = {
  bookGuide: async (data: BookingGuide) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not registered or logged in yet");
      throw new Error("Not authenticated");
    }

    const response = await fetch(`${API_BASE_URL}/bookings/guides`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      if (response.status === 401) {
        alert("You are not registered or logged in yet");
      }
      const errorData = await response.json();
      throw new Error(errorData.message || "Booking failed");
    }
    return response.json();
  },
};

export const tourBookingService = {
  bookTour: async (data: BookingTour) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not registered or logged in yet");
      throw new Error("Not authenticated");
    }

    const response = await fetch(`${API_BASE_URL}/bookings/tours`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      if (response.status === 401) {
        alert("You are not registered or logged in yet");
      }
      const errorData = await response.json();
      throw new Error(errorData.message || "Booking failed");
    }
    return response.json();
  },
};
