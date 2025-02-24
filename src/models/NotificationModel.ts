export interface TouristGuideBooking {
  guide_id: number;
  tour_date: string;
  reserve_count: number;
  language_id: number;
  message: string;
  book_id: number;
  confirmed: boolean;
  guide_name: string;
}

export interface TouristTourBooking {
  tour_id: number;
  reserve_count: number;
  language_id: number;
  message: string;
  book_id: number;
  confirmed: boolean;
  tour_title: string;
}

export interface GuideGuideBooking {
  guide_id: number;
  tour_date: string;
  reserve_count: number;
  language_id: number;
  message: string;
  book_id: number;
  confirmed: boolean;
}

export interface GuideTourBooking {
  tour_id: number;
  reserve_count: number;
  language_id: number;
  message: string;
  book_id: number;
  confirmed: boolean;
}
