export interface Review {
  id: string;
  name: string;
  avatar: string;
  content: string;
  rating: number;
  date_time: string;
}

export type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  brand: {
    name: string;
    logo: string;
  };
  reviews: Review[];
};
