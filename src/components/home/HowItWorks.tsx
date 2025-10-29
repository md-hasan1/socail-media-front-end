import React from "react";
import image from "@/assets/how-it-works.png";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { steps } from "@/utils/howItWorks";

const HowItWorks = () => {
  return (
    <section className="flex lg:flex-row flex-col-reverse items-center gap-[77px] py-20 container bg-white">
      <div className="flex-1">
        <Image className="w-full" src={image} alt="how it works image" />
      </div>
      <div className="flex-1">
        <div>
          <h2 className="section-title mb-6 ">How It Works</h2>
        </div>
        <Card className="w-full shadow-none border-none p-0">
          <CardContent className="p-0 ">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-gray-400" />

              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="relative pl-12">
                    {/* Blue dot */}
                    <div className="absolute left-0 top-0 w-8 h-8 flex items-center justify-center">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <div className="text-gray-300 text-3xl leading-[120%] font-medium">
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-medium text-gray-600 leading-[120%]">
                        {step.title}
                      </h3>
                      <p className="text-paragraph leading-relaxed ">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HowItWorks;
