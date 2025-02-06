import { Guide, mapGuide } from "../models/Guide";
import { fetchData } from "./api";

export async function fetchGuides(): Promise<Guide[]> {
  const data = await fetchData<any[]>("/resumes/");
  return data.map(mapGuide);
}
