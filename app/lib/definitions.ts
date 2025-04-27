export type Location = {
  id: string; // will be created on the database
  location: string;
  zipcode: string;
  date: string;
};

export type LocationForm = {
  id: string;
  location: string;
};
