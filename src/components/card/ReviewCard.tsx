import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { TestimonialType } from "@/types/globalTyps";
import StarRating from "../StarRating/StarRating";
import { QuoteIcon } from "@/utils/Icons";

const ReviewCard = ({ name, reviews, comments, image }: TestimonialType) => {
  return (
    <Card className="relative">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative size-12 rounded-full">
            <Image
              src={image ?? " "}
              alt={`${name}'s profile picture`}
              fill
              className="rounded-full size-12 object-cover"
            />
          </div>
          <div className="border-b  w-full">
            <h3 className="font-semibold text-gray-900">{name}</h3>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed">{comments}</p>

        <div className="flex items-center gap-1">
          <StarRating reviews={reviews} />
        </div>
      </CardContent>
      <span className="absolute -top-2 -left-2 z-20">
        <QuoteIcon />
      </span>
    </Card>
  );
};

export default ReviewCard;
