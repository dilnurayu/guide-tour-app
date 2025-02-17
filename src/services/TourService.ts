import { Tour, mapTour } from "../models/Tour";
import { fetchData } from "./api";

export interface ToursFilters {
  min_price?: number;
  max_price?: number;
  date_from?: string;
  date_to?: string;
  guide_id?: number;
  region_ids?: number[];
  language_ids?: number[];
  min_rating?: number;
  payment_type?: string;
  min_guest_count?: number;
  max_guest_count?: number;
  [key: string]: any;
}

export async function fetchTours(filters: ToursFilters = {}): Promise<Tour[]> {
  const queryParams = new URLSearchParams();

  for (const key in filters) {
    const value = filters[key];
    if (value != null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, String(v)));
      } else {
        queryParams.append(key, String(value));
      }
    }
  }

  const queryString = queryParams.toString();
  const endpoint = queryString ? `/tours/?${queryString}` : "/tours/";
  const data = await fetchData<any[]>(endpoint);
  return data.map(mapTour);
}

export async function fetchToursDetails(id: number): Promise<Tour> {
  const data = await fetchData<any>(`/tours/${id}/`);
  return mapTour(data);
}

export async function fetchToursByGuide(guideId: number): Promise<Tour[]> {
  const data = await fetchData<any>(`/tours/resume/${guideId}/tours`);
  return data.map(mapTour);
}
