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
    const response = await fetch(`${API_BASE_URL}/bookings/guides`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Booking failed");
    }
    return response.json();
  },
};

export const tourBookingService = {
  bookTour: async (data: BookingTour) => {
    const response = await fetch(`${API_BASE_URL}/bookings/tours`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Booking failed");
    }
    return response.json();
  },
};
