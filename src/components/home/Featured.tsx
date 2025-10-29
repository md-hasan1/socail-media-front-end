/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import StarRating from "../StarRating/StarRating";
import Incrementor from "../incrementor/Incrementor";
import { Button } from "../ui/button";
import { Product } from "@/types/productsDataTypes";
import FeaturedSkeleton from "./FeaturedSkeleton";
import {
  useAddToCartMutation,
  useGetCartByIdQuery,
} from "@/redux/features/api/prouductApi";
import { useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Featured = ({
  productData,
  gallery,
  isLoading,
}: {
  productData: Product | undefined;
  gallery: boolean;
  isLoading?: boolean;
}) => {
  const [value, setValue] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | StaticImageData>(
    ""
  );
  const [addToCart, { isLoading: addToCartLoading }] = useAddToCartMutation();
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const { refetch } = useGetCartByIdQuery(user?.id ?? "");

  if (isLoading) {
    return <FeaturedSkeleton gallery={gallery} />;
  }

  if (!productData) {
    return <FeaturedSkeleton gallery={gallery} />;
  }

  const handleDisplayImage = (image: string | StaticImageData) => {
    setSelectedImage(image);
  };

  if (typeof window === "undefined") {
    return;
  }

  const handleAddToCart = async () => {
    try {
      const cart = {
        userId: user?.id,
        productId: productData.id,
        quantity: value,
      };


      const result = await addToCart(cart).unwrap();

      if (result.success) {
        toast.success("Product added to cart successfully!");
        refetch();
        router.push("/payment");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Error adding to cart", err);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container flex lg:flex-row flex-col items-center gap-6">
        <div className="slider-box flex flex-col items-center transition-all">
          <div className="w-full max-w-md lg:max-w-lg mb-4">
            <Image
              width={500}
              height={400}
              src={selectedImage || productData.images[0]}
              alt={productData?.title || "Product Image"}
              className="max-lg:mx-auto border border-primary shadow p-1 rounded-2xl w-[25rem] h-[16rem] sm:w-[38rem] sm:h-[25rem] object-cover"
            />
          </div>

          {gallery && productData.images && (
            <div className="nav-for-slider flex gap-4 justify-center mt-4">
              {productData?.images.map((img, index) => (
                <div key={index} className="w-12 h-12 sm:w-16 sm:h-16">
                  <Image
                    width={300}
                    height={200}
                    src={img}
                    alt={`Thumbnail ${index}`}
                    onClick={() => handleDisplayImage(img)}
                    className={`w-full h-full rounded bg-contain border-2 cursor-pointer transition-all duration-300 ${
                      img === selectedImage
                        ? "border-4 border-purple-600 shadow-md scale-105"
                        : "border-gray-300"
                    }`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 space-y-4">
          <h2 className="section-title md:text-[30px]">{productData.title}</h2>
          <p className="text-2xl font-medium leading-[120%] text-primary">
            ${productData.regularPrice}{" "}
            <del className="text-base text-paragraph">${productData.price}</del>
          </p>
          <StarRating reviews={productData.Review || []} />
          <div
            className="text-gray-500 product-description pl-5"
            dangerouslySetInnerHTML={{
              __html: productData.description || "No description available.",
            }}
          ></div>
          <div className="mt-[37px] flex items-center gap-4 mb-4">
            <Incrementor setValue={setValue} value={value} />
            {value && (
              <p className="flex items-center gap-2">
                <span className="font-semibold">
                  ${productData.regularPrice * value}
                </span>
                <del className="text-base leading-[120%] text-paragraph">
                  ${productData.price * value}
                </del>
              </p>
            )}
          </div>
          <Button
            loading={addToCartLoading}
            onClick={handleAddToCart}
            className="flex rounded w-full"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Featured;
