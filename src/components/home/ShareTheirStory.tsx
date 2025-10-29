import { shareTheStory } from "@/utils/shareTheStory";
import Image from "next/image";

const ShareTheirStory = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container">
        <div className="space-y-4 flex flex-col text-center justify-center mb-12">
          <h2 className="section-title">Share their story.</h2>
          <p className="section-description sm:w-[72%] mx-auto">
            Every loved one deserves to have their story shared and remembered.
            Explore the cherished memories and legacies that live on below.
          </p>
        </div>
        <div className="space-y-6">
          {shareTheStory?.map((item) => (
            <div key={item.id} className="flex items-center lg:flex-row flex-col gap-6">
              <div className="flex-1">
                <Image
                  className="w-full rounded-[8px]"
                  src={item.image ?? ""}
                  alt={`image of ${item.title}`}
                />
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="text-title text-2xl sm:text-[32px] underline leading-[120%]">
                  {item.title}
                </h3>
                <p className="text-paragraph text-xl leading-[160%]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShareTheirStory;
