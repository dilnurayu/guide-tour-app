import { Guide, mapGuide } from "../models/Guide";
import { fetchData } from "./api";

export async function fetchGuides(): Promise<Guide[]> {
  const data = await fetchData<any[]>("/resumes/");
  return data.map(mapGuide);
}

export async function fetchGuideDetails(id: number): Promise<Guide> {
  const data = await fetchData<any>(`/resumes/${id}/`);
  return mapGuide(data);
}
