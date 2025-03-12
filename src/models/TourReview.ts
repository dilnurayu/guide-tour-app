import { AuthData } from "./authModel";

export interface TourReview {
  tourId: number;
  tourist: AuthData;
  description: string;
  rating: number;
  reviewId: number;
  createdAt: string;
}

export function mapTourReview(data: any): TourReview {
  return {
    tourId: data.tour_id,
    description: data.description,
    tourist: data.tourist,
    rating: data.rating,
    reviewId: data.tour_review_id,
    createdAt: data.created_at,
  };
}
