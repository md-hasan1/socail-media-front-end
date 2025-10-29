/* eslint-disable @typescript-eslint/no-explicit-any */

import Featured from "@/components/home/Featured";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import ShareTheirStory from "@/components/home/ShareTheirStory";
import Testimonials from "@/components/home/Testimonials";


export default function Product() {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <ShareTheirStory />
      {/* <Featured productData={[{}]} gallery={false} /> */}
      <Testimonials />
    </div>
  );
}