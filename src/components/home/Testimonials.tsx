import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { testimonials } from "@/utils/reviews";
import ReviewCard from "../card/ReviewCard";

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-300">
      <div className="container">
        <div className="flex sm:items-center gap-6 sm:flex-row flex-col sm:justify-between mb-12">
          <div className="space-y-4 ">
            <h2 className="section-title">Testimonials</h2>
            <p className="section-description sm:w-[80%]">
              We pride ourselves on building strong, lasting relationships with
              our clients. Here’s what healthcare and education leaders have to
              say about partnering!
            </p>
          </div>
          <Link
            href={"/testimonial"}
            className={cn(buttonVariants({ variant: "link" }), "text-primary")}
          >
            See All
          </Link>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {testimonials.map((testimonial) => (
            <ReviewCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
