export interface AuthData {
  name: string;
  email: string;
  password: string;
  address_id: number;
  user_type: string;
  profile_photo?: File | null;
}

export const INITIAL_FORM_STATE: AuthData = {
  name: "",
  email: "",
  password: "",
  address_id: 0,
  user_type: "",
  profile_photo: null,
};

export interface User {
  token: string;
  role: string | null;
}

export interface AuthResponse {
  access_token: string;
}
