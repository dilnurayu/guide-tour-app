import { Review, mapReview } from "../models/Review";
import { fetchData } from "./api";

export async function fetchReviewsByGuide(guideId: number): Promise<Review[]> {
  const data = await fetchData<any[]>(`/reviews/resume/${guideId}`);
  return data.map(mapReview);
}
