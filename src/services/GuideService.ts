import { Guide, mapGuide } from "../models/Guide";
import { fetchData } from "./api";

export interface GuideFilters {
  min_rating?: number;
  max_rating?: number;
  min_price?: number;
  max_price?: number;
  language_ids?: number[];
  address_ids?: number[];
  price_type?: string;
  experience_start_date?: string;
  [key: string]: any;
}

export async function fetchGuides(
  filters: GuideFilters = {}
): Promise<Guide[]> {
  const queryParams = new URLSearchParams();

  for (const key in filters) {
    const value = filters[key];
    if (value != null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((val) => queryParams.append(key, String(val)));
      } else {
        queryParams.append(key, String(value));
      }
    }
  }
  const queryString = queryParams.toString();
  const endpoint = queryString ? `/resumes/?${queryString}` : "/resumes/";
  const data = await fetchData<any[]>(endpoint);
  return data.map(mapGuide);
}

export async function fetchGuideDetails(id: number): Promise<Guide> {
  const data = await fetchData<any>(`/resumes/${id}/`);
  return mapGuide(data);
}
