import { mapTour, Tour } from "../models/Tour";

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
      throw new Error(
        errorData.detail || `Error fetching tours: ${response.status}`
      );
    }

    const data = await response.json();
    return data.map(mapTour);
  } catch (error) {
    console.error("FetchTours Error:", error);
    throw error;
  }
}

export async function createTour(formData) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  try {
    const response = await fetch("https://guide-tour-api.vercel.app/tours/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.trim()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error creating tour");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("CreateTour Error:", error);
    throw error;
  }
}

export async function updateTour(
  tourId: number,
  formData: FormData
): Promise<Tour> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Unauthorized: No token found");
  }
  try {
    const response = await fetch(
      `https://guide-tour-api.vercel.app/tours/${tourId}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
        body: formData,
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error updating tour");
    }
    const data = await response.json();
    return mapTour(data);
  } catch (error) {
    console.error("EditTour Error:", error);
    throw error;
  }
}

export async function deleteTour(tourId) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  try {
    const response = await fetch(
      `https://guide-tour-api.vercel.app/tours/${tourId}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.detail || `Error deleting tour: ${response.status}`
      );
    }
    return;
  } catch (error) {
    console.error("DeleteTour Error:", error);
    throw error;
  }
}
