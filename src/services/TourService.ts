// src/services/TourService.ts
import { Tour, mapTour } from "../models/Tour";

export async function fetchTours(): Promise<Tour[]> {
  const response = await fetch("https://guide-tour-api.vercel.app/tours/");
  if (!response.ok) {
    throw new Error("Failed to fetch tours");
  }
  const data = await response.json();
  return data.map(mapTour);
}
