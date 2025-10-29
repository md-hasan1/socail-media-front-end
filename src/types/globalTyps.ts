import { StaticImageData } from "next/image";

export type reviewTypes = {
  id: number;
  rating: number;
};


export interface Reviews {
  id: string;
  author: string;
  avatar?: string | StaticImageData;
  rating: number;
  content: string;
  timestamp: string;
}

export type TestimonialType = {
    id: number;
    name: string;
    comments: string;
    image: string | StaticImageData; // Can be a URL or imported image
    reviews: reviewTypes[];
};
  

export interface TApiResponse<T> {
  status: number;
  message: string;
  success: boolean;
  error?: {message: string} | null;
  data: T;
}


