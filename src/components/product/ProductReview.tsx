"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { Rating as ReactRating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import MYForm from "../form/MyForm";
import MYTextarea from "../form/MYTextarea";
import {
  useCreateReviewMutation,
  useGetReviewsByProductIdQuery,
} from "@/redux/features/api/reviewApi";
import userImage from "@/assets/user.png";

import toast from "react-hot-toast";
import StarRating from "../StarRating/StarRating";
import ReviewSkeleton from "./ReviewSkeleton";
import NumberRating from "./StartRating";
import { ReviewTypes } from "@/types/ReviewTypes";

export default function ProductReview({
  id,
}: {
  reviews: ReviewTypes[];
  id: string;
}) {
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const {
    data: reviews,
    isLoading: allReviewLoading,
    refetch,
  } = useGetReviewsByProductIdQuery(id);
  const [rating, setRating] = useState<number>(0); // Initial rating state
  const user = useAppSelector((state) => state.auth.user);
  const [isShowMore, setIsShowMore] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (data: any) => {
    try {
      const newReview = {
        userId: user?.id,
        productId: id,
        rating: rating,
        comment: data.comment,
      };

      if (rating === 0) {
        toast.error("Please select a rating");
        return;
      } else {
        const result = await createReview(newReview).unwrap();
        if (result.id) {
          refetch();
          toast.success("Review submitted successfully");
        }
      }
    } catch (err) {
      console.error("Failed to create review:", err);
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="mb-8 border-b pb-5">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <div className="flex items-center gap-2 mb-4">
          <StarRating reviews={reviews} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ReactRating
              style={{ maxWidth: 100 }}
              value={rating}
              onChange={setRating}
            />
            <span>{rating}</span>
          </div>
          <MYForm onSubmit={handleSubmit}>
            <div className="space-y-4 flex flex-col">
              <MYTextarea
                required={true}
                className="rounded-[8px] min-h-[150px]"
                name="comment"
                placeholder="Share your thoughts"
              />
              <Button loading={isLoading} type="submit" className="self-end">
                Send Review
              </Button>
            </div>
          </MYForm>
        </div>
      </div>

      <p className="text-gray-800 text-base font-inter mb-10">
        ({reviews?.length} Reviews)
      </p>
      <div className="grid grid-cols-1 gap-6">
        {allReviewLoading ? (
          <ReviewSkeleton />
        ) : isShowMore ? (
          reviews?.map((review) => (
            <div key={review.id} className="mb-8 border-b pb-3">
              <div className="flex  gap-10">
                <Image
                  src={userImage}
                  alt="User"
                  width={72}
                  height={72}
                  className="rounded-full self-start"
                />
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">
                      {review.user?.firstName}
                    </h3>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <NumberRating rating={review?.rating} />
                  </div>
                  <p className="text-base text-paragraph">{review.comment}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          reviews?.slice(0, 4).map((review) => (
            <div key={review.id} className="mb-8 border-b pb-3">
              <div className="flex  gap-10">
                <Image
                  src={userImage}
                  alt="User"
                  width={72}
                  height={72}
                  className="rounded-full self-start"
                />
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">
                      {review.user?.firstName}
                    </h3>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <NumberRating rating={review?.rating} />
                  </div>
                  <p className="text-base text-paragraph">{review.comment}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center items-center">
        <Button
          className="text-primary"
          onClick={() => setIsShowMore(!isShowMore)}
          variant={"link"}
        >
          {isShowMore ? <span>See Less</span> : <span>See More</span>}
        </Button>
      </div>
    </div>
  );
}
