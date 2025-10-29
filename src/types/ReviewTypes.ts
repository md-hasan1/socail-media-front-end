// import { StaticImageData } from "next/image";

type User = {
  id: string; // Unique identifier for the user
  firstName: string; // User's first name
  lastName: string; // User's last name
  email: string; // User's email address
};

type Product = {
  id: string; // Unique identifier for the product
  title: string; // Name or title of the product
  price: number; // Price of the product
};

export interface ReviewTypes {
  id: string; // Unique identifier for the review
  userId: string; // ID of the user who made the review
  productId: string; // ID of the product being reviewed
  rating: number; // Rating given to the product (e.g., 1-5)
  comment: string; // Text comment provided by the user
  createdAt: string; // Timestamp when the review was created
  updatedAt: string; // Timestamp when the review was last updated
  user?: User; // Optional user object associated with the review (if available)
  Product?: Product; // Optional product object
}
