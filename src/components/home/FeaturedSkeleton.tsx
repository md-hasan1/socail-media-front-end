"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component

const FeaturedSkeleton = ({ gallery = false }: { gallery: boolean }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container flex lg:flex-row flex-col items-center gap-6">
        {/* Image Section */}
        <div className="slider-box flex flex-col items-center transition-all">
          <Skeleton className="w-full max-w-md lg:max-w-lg mb-4 h-[16rem] sm:w-[38rem] sm:h-[25rem] rounded-2xl" />
          {gallery && (
            <div className="nav-for-slider flex gap-4 justify-center mt-4">
              {[...Array(4)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded"
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="flex-1 space-y-4">
          <Skeleton className="h-8 w-3/4" /> {/* Title Skeleton */}
          <Skeleton className="h-6 w-1/2" /> {/* Price Skeleton */}
          <Skeleton className="h-6 w-1/4" /> {/* Discount Price Skeleton */}
          <Skeleton className="h-4 w-full" /> {/* Star Rating Skeleton */}
          <Skeleton className="h-4 w-full" /> {/* Description List Skeleton */}
          <Skeleton className="h-10 w-1/2" /> {/* Incrementor Skeleton */}
          <Skeleton className="h-12 w-full" /> {/* Button Skeleton */}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSkeleton;
