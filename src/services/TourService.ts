import { Tour, mapTour } from "../models/Tour";
import { fetchData } from "./api";

export async function fetchTours(): Promise<Tour[]> {
  const data = await fetchData<any[]>("/tours/");
  return data.map(mapTour);
}

export async function fetchToursDetails(id: number): Promise<Tour> {
  const data = await fetchData<any>(`/tours/${id}/`);
  return mapTour(data);
}
