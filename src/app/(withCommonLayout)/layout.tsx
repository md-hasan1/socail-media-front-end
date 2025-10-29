import Footer from "@/components/ui/shared/footer/Footer";
import Navbar from "@/components/ui/shared/navbar/Navbar";
import React, { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white flex flex-col">
      <Navbar />

      <div>{children}</div>

      <Footer />
    </div>
  );
};

export default CommonLayout;
