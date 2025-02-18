import { GuideReview, mapGuideReview } from "../models/GuideReview";
import { mapTourReview, TourReview } from "../models/TourReview";
import { fetchData } from "./api";

export async function fetchReviewsByGuide(
  guideId: number
): Promise<GuideReview[]> {
  const data = await fetchData<any[]>(`/reviews/resume/${guideId}/reviews`);
  return data.map(mapGuideReview);
}

export async function fetchReviewsByTours(
  tourId: number
): Promise<TourReview[]> {
  const data = await fetchData<any[]>(`/reviews/tour/${tourId}/reviews`);
  return data.map(mapTourReview);
}

export async function fetchGuideResumeReviews(): Promise<GuideReview[]> {
  const token = localStorage.getItem("token");
  const response = await fetch(
    "https://guide-tour-api.vercel.app/reviews/resume/me",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch guide resume reviews");
  }
  const data = await response.json();
  return data.map(mapGuideReview);
}
