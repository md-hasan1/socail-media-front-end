import { ReviewTypes } from "./ReviewTypes";

// Define the API response structure
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Define the product type
export interface Product {
  id: string;
  title: string;
  images: string[];
  description: string;
  packageDetails: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  Review?: ReviewTypes[];
  regularPrice: number;
}
