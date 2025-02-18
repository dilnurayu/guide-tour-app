export interface TourReview {
  tourId: number;
  title: string;
  description: string;
  rating: number;
  reviewId: number;
}

export function mapTourReview(data: any): TourReview {
  return {
    tourId: data.tour_id,
    title: data.title,
    description: data.description,
    rating: data.rating,
    reviewId: data.tour_review_id,
  };
}
