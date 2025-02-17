export interface Review {
  resumeId: number;
  title: string;
  description: string;
  rating: number;
  reviewId: number;
}

export function mapReview(data: any): Review {
  return {
    resumeId: data.resume_id,
    title: data.title,
    description: data.description,
    rating: data.rating,
    reviewId: data.review_id,
  };
}
