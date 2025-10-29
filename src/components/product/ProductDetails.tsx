"use client";
import { useState } from "react";
import Featured from "../home/Featured";
import ProductReview from "./ProductReview";

import AdditionalInfo from "./AdditionalInfo";
import { useGetProductByIdQuery } from "@/redux/features/api/prouductApi";

const ProductDetails = ({ productid }: { productid: string }) => {
  const { data, isLoading } = useGetProductByIdQuery(productid);
  const [activeTab, setActiveTab] = useState("reviews");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
   
  };

  

  return (
    <div>
      {/* <Featured productData={product as ProductDataTypes} gallery={true} /> */}

      <div>
        <Featured isLoading={isLoading} productData={data} gallery={true} />
      </div>

      <hr />
      {/* tabs */}
      <div className=" mt-8 ml-6">
        <div className="container mx-auto px-4">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {["reviews", "additionalInfo"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`border-b-2 px-1 pb-4 pt-2 text-2xl ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                <span className="capitalize">{tab}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* show outputs based on tabs */}
      <section className="container mx-auto px-4 py-8">
        {activeTab === "reviews" && (
          <ProductReview
            id={productid}
            reviews={data?.Review?.length ? data?.Review : []}
          />
        )}
        {activeTab === "additionalInfo" && data && (
          <AdditionalInfo product={data} />
        )}
      </section>
    </div>
  );
};

export default ProductDetails;
