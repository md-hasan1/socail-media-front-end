/* eslint-disable @typescript-eslint/no-explicit-any */

import ProductDetails from "@/components/product/ProductDetails";
import React from "react";

const page = async ({ params }: { params: any }) => {
  const { productid } = await params;

  return (
    <div>
      <ProductDetails productid={productid} />
    </div>
  );
};

export default page;
