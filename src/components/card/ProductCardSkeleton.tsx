import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-[400px] mx-5 mt-5 rounded-lg overflow-hidden">
        {/* Skeleton for the image */}
        <Skeleton className="h-full w-full" />
      </div>
      <div className="p-6">
        {/* Skeleton for the title */}
        <Skeleton className="h-6 w-3/4 mb-4" />
        {/* Skeleton for the rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-5 w-5 rounded-full" />
          ))}
        </div>
        {/* Skeleton for the price */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-6 w-1/3" />
        </div>
      </div>
      <div className="p-6 pt-0">
        {/* Skeleton for the button */}
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
