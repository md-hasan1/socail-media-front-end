import React from "react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IoMdArrowForward } from "react-icons/io";
import heroImage1 from "@/assets/hero-image-1.jpg";
import heroImage2 from "@/assets/hero-image-2.jpg";
import Image from "next/image";
import { HeroShape1, HeroShape2 } from "@/utils/Icons";
import heroSpaeIcon from "@/assets/hero-icon-1.png";

const HeroSection = () => {
  return (
    <section className="bg-primary py-20 ">
      <div className="container flex gap-6 items-center">
        <div className="xl:flex-1 w-full lg:w-1/2">
          <h1 className="sm:text-[61px] text-4xl font-semibold leading-[130%] text-white mb-4">
            Keeping Memories Alive, One Scan at a Time
          </h1>
          <p className="text-gray-300 leading-[160%] mb-12">
            Honor the memory of your loved ones with a personalized Turning
            Hearts Medallion. Capture and share their life’s journey through
            photos, videos, and stories, accessible by scanning the medallion
            placed on their headstone. With our Discover feature, explore
            heartfelt memories from people worldwide and celebrate lives
            well-lived. Ensure that every story is preserved, and no legacy is
            ever forgotten.
          </p>
          <div className="flex items-center gap-6 flex-wrap">
            <Link
              href={"/shop-now"}
              className={buttonVariants({ variant: "secondary" })}
            >
              Shop Now
            </Link>
            <Link
              href={"/"}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "flex items-center gap-2 text-white hover:bg-white hover:text-primary"
              )}
            >
              Start a Tribute{" "}
              <span>
                <IoMdArrowForward />
              </span>
            </Link>
          </div>
        </div>
        <div className="xl:w-[40%] w-1/2 relative lg:block hidden">
          <div className="flex items-center">
            <Image
              className="xl:size-[402px] rounded-[8px] drop-shadow-md"
              src={heroImage1 ?? " "}
              alt="Hero Image 1"
            />
            <span className="xl:block hidden">
              <HeroShape1 />
            </span>
          </div>
          <div className="flex items-center justify-end -mt-[110px] relative">
            <span>
              <HeroShape2 />
            </span>
            <Image
              className="w-[317px] h-[306px] rounded-[8px] shadow-lg relative z-50 ml-4"
              src={heroImage2 ?? " "}
              alt="Hero Image 2"
            />
            <Image
              className="absolute -top-[80px] -left-[10px] xl:left-[100px] z-50 "
              src={heroSpaeIcon ?? " "}
              alt="Hero Icon"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
