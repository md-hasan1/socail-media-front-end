import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md";
}

export default function StarRating({ rating, size = "sm" }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          } 
            ${size === "sm" ? "w-4 h-4" : "w-5 h-5"}`}
        />
      ))}
      <span className=" text-gray-700 ml-2 text-xl">({rating} .0)</span>
    </div>
  );
}
