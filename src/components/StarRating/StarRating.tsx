/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

// Define the props for the StarRating component
interface StarRatingProps {
  reviews: any; // Array of reviews
}

const StarRating: React.FC<StarRatingProps> = ({ reviews }) => {
  // Total number of reviews
  const totalReviews = reviews?.length || 0;

  // Calculate average rating
  const averageRating =
    totalReviews > 0
      ? reviews!.reduce(
          (sum: any, review: any) => sum + (review.rating || 0),
          0
        ) / totalReviews
      : 0;

  // Round the rating to the nearest integer
  const roundedRating = Math.round(averageRating);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {/* Render Stars */}
      {[...Array(5)].map((_, index) =>
        index < roundedRating ? (
          <FaStar key={index} color="#FFC107" size={20} />
        ) : (
          <FaRegStar key={index} color="#E0E0E0" size={20} />
        )
      )}
      {/* Show Reviews Count */}
      <span>
        ({totalReviews} Review{totalReviews !== 1 ? "s" : ""})
      </span>
    </div>
  );
};

export default StarRating;
