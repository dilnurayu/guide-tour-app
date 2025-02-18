export interface GuideReview {
  resumeId: number;
  title: string;
  description: string;
  rating: number;
  reviewId: number;
}

export function mapGuideReview(data: any): GuideReview {
  return {
    resumeId: data.resume_id,
    title: data.title,
    description: data.description,
    rating: data.rating,
    reviewId: data.review_id,
  };
}
