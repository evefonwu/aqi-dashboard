export type Location = {
  // matching us locations data
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
  label: string; // formatted display for autocomplete
};

export type UserLocations = {
  // matching user_locations data
  id: string;
  nickname: string;
  city: string;
  state: string;
  zipcode: string;
  created_at: string;
};
