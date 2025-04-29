export type Location = {
  id: number;
  zip: string;
  city: string;
  state: string;
};

export type LocationSearchResult = {
  id: number;
  zip: string;
  city: string;
  state: string;
  label: string; // Formatted display for the autocomplete
};

export type UserSavedLocation = {
  id: string; // will be created on the database
  nickname: string;
  location: string;
  zipcode: string;
  date: string;
};
