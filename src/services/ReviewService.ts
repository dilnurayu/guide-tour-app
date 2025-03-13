// src/services/ReviewService.ts
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

// post reviews:

export async function postGuideReview(review: {
  resume_id: number;
  title: string;
  description: string;
  rating: number;
}): Promise<GuideReview> {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You are not registered or logged in yet");
    throw new Error("Not authenticated");
  }

  const response = await fetch(
    "https://guide-tour-api.vercel.app/reviews/resume",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(review),
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      alert("You are not registered or logged in yet");
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to post guide review");
  }

  const data = await response.json();
  return mapGuideReview(data);
}

export async function postTourReview(review: {
  tour_id: number;
  title: string;
  description: string;
  rating: number;
}): Promise<TourReview> {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You are not registered or logged in yet");
    throw new Error("Not authenticated");
  }

  const response = await fetch(
    "https://guide-tour-api.vercel.app/reviews/tour",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(review),
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      alert("You are not registered or logged in yet");
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to post tour review");
  }

  const data = await response.json();
  return mapTourReview(data);
}
