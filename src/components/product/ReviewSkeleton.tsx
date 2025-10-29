import { Skeleton } from "../ui/skeleton";

const ReviewSkeleton = () => {
  return (
    <div className="mb-8 animate-pulse">
      <div className="flex items-center gap-2">
        <Skeleton className="rounded-full w-10 h-10" />
        <div className="flex-1">
          <Skeleton className="h-4 w-1/2 rounded" />
          <Skeleton className="h-3 w-full mt-1 rounded" />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Skeleton className="h-4 w-1/4 rounded" />
      </div>
    </div>
  );
};

export default ReviewSkeleton;
