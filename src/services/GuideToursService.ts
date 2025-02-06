import { Tour, mapTour } from "../models/Tour";

export async function fetchGuideTours(): Promise<Tour[]> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  try {
    const response = await fetch(
      "https://guide-tour-api.vercel.app/tours/me/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 400 && errorData.detail) {
        throw new Error(errorData.detail);
      }
      throw new Error(
        `Error fetching tours: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.map(mapTour);
  } catch (error: any) {
    console.error("FetchTours Error:", error);
    throw error;
  }
}
