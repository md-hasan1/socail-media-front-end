"use client";
import ProductCard from "@/components/card/ProductCard";
import ProductCardSkeleton from "@/components/card/ProductCardSkeleton";
import { useGetAllProductsQuery } from "@/redux/features/api/prouductApi";

export default function ShopPage() {
  const { data, isLoading } = useGetAllProductsQuery();

  return (
    <div className=" bg-[#F2F4F7]">
      <div className="container px-4 py-12 mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Shop Product</h1>

        {data?.length === 0 ? (
          <div className="flex justify-center items-center">
            <h2 className="text-3xl font-bold text-title">No Data Found</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading
              ? [...Array(4)].map((_, i) => <ProductCardSkeleton key={i} />)
              : data?.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
          </div>
        )}
      </div>
    </div>
  );
}
