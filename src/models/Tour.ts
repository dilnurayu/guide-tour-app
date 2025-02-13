export interface Tour {
  title: string;
  guestCount: number;
  price: number;
  priceType: string;
  paymentType: string;
  date: string;
  departureTime: string;
  returnTime: string;
  duration: number;
  dressCode: string;
  notIncluded: string;
  included: string;
  photoGallery: string[];
  about: string;
  tourId: number;
  destinationIds: number[];
  languageIds: number[];
  averageRating: number[];
}

export function mapTour(data: any): Tour {
  return {
    title: data.title,
    guestCount: data.guest_count,
    price: data.price,
    priceType: data.price_type,
    paymentType: data.payment_type,
    date: data.date,
    departureTime: data.departure_time,
    returnTime: data.return_time,
    duration: data.duration,
    dressCode: data.dress_code,
    notIncluded: data.not_included,
    included: data.included,
    photoGallery: data.photo_gallery,
    about: data.about,
    tourId: data.tour_id,
    destinationIds: data.destination_ids,
    languageIds: data.language_ids,
    averageRating: data.average_rating,
  };
}
