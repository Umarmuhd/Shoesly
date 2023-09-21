export type Review = {
  id: string;
  user: {
    name: string;
    avatar: any;
  };
  content: string;
  rating: number;
  date_time: string;
};
