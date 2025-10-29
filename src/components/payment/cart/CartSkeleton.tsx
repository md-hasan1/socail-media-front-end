import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CartSkeleton = () => {
  return (
    <div className="flex items-center gap-6 mt-4">
      {/* Number placeholder */}
      <Skeleton className="h-8 w-12 rounded bg-gray-300" />

      <div className="flex items-center gap-6">
        {/* Image placeholder */}
        <Skeleton className="w-[180px] h-[157px] rounded bg-gray-300" />

        <div>
          {/* Title placeholder */}
          <Skeleton className="h-8 w-[300px] rounded bg-gray-300 mb-4" />

          {/* Paragraph placeholder */}
          <Skeleton className="h-6 w-[250px] rounded bg-gray-300 mt-4" />
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
