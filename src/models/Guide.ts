export interface Guide {
  bio: string;
  experienceStartDate: string;
  languages: { language_id: number; name: string }[];
  addresses: { region_id: number; city_id: number; address_id: number }[];
  price: number;
  priceType: string;
  resumeId: number;
  guideId: number;
  rating: number;
  guideName: string;
  guidePhoto: string;
  tourPhotos: string[];
}

export function mapGuide(data: any): Guide {
  return {
    bio: data.bio || "",
    experienceStartDate: data.experience_start_date || "",
    languages: data.languages || [],
    addresses: data.addresses || [],
    price: data.price || 0,
    priceType: data.price_type || "",
    resumeId: data.resume_id || 0,
    guideId: data.guide_id || 0,
    rating: data.rating || 0,
    guideName: data.guide_name || "",
    guidePhoto: data.guide_photo || "",
    tourPhotos: Array.isArray(data.tour_photos) ? data.tour_photos : [],
  };
}
