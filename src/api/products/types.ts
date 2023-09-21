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
};
