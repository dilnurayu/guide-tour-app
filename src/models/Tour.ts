export interface Tour {
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
  destinationIds: number[];
  languageIds: number[];
}

export function mapTour(data: any): Tour {
  return {
    guestCount: data.guest_count ?? 0,
    price: data.price ?? 0,
    priceType: data.price_type ?? "N/A",
    paymentType: data.payment_type ?? "N/A",
    date: data.date ?? new Date().toISOString(),
    departureTime: data.departure_time ?? "00:00:00",
    returnTime: data.return_time ?? "00:00:00",
    duration: data.duration ?? 0,
    dressCode: data.dress_code ?? "Not specified",
    notIncluded: data.not_included ?? "Not specified",
    included: data.included ?? "Not specified",
    photoGallery: data.photo_gallery ?? [],
    about: data.about ?? "No description available",
    destinationIds: data.destination_ids ?? [],
    languageIds: data.language_ids ?? [],
  };
}
