import { Product } from "@/types/productsDataTypes";
import NumberRating from "./StartRating";

export default function AdditionalInfo({
  product,
}: {
  product: Product ;
}) {
  return (
    <div className=" mx-auto p-6 space-y-8">
      <div
        className="mt-6 text-xl"
        dangerouslySetInnerHTML={{ __html: product?.description }}
      ></div>

      <div className="space-y-4">
        <h2 className="text-2xl text-gray-700 font-semibold">
          Customer Reviews
        </h2>

        <div className="flex items-center gap-2 mt-3">
          <div className="flex text-sm">
            <NumberRating rating={5} />
          </div>
        </div>

        <p className="text-paragraph text-sm">Be the first to review</p>
        <div
          className="mt-6"
          dangerouslySetInnerHTML={{ __html: product?.packageDetails }}
        ></div>
      </div>
    </div>
  );
}
