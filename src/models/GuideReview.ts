import { AuthData } from "./authModel";

export interface GuideReview {
  resumeId: number;
  tourist: AuthData;
  description: string;
  rating: number;
  reviewId: number;
}

export function mapGuideReview(data: any): GuideReview {
  return {
    resumeId: data.resume_id,
    tourist: data.tourist,
    description: data.description,
    rating: data.rating,
    reviewId: data.review_id,
  };
}
