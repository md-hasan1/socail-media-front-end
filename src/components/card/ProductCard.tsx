import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import ShoppingImage from "@/utils/images/shopping-image.png"
import Link from "next/link";
import { Product } from "@/types/productsDataTypes";
import { cn } from "@/lib/utils";
import StarRating from "../StarRating/StarRating";
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="border rounded overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-[400px] m-5 rounded">
          <Link href={`/shop/${product.id}`}>
            <Image
              src={product?.images[0]}
              alt={product?.title}
              className="object-cover rounded"
              fill
            />
          </Link>
        </div>
        <div className="p-6">
          <Link
            href={`/shop/${product?.id}`}
            className="text-4xl font-semibold mb-2 hover:text-primary"
          >
            {product.title}
          </Link>
          <div className="flex items-center mb-2">
            <StarRating reviews={product?.Review} />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500 line-through">
              ${product?.regularPrice}
            </span>
            <span className="text-2xl font-bold text-primary">
              ${product?.price}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link
          href={`/shop/${product?.id}`}
          className={cn(buttonVariants({ size: "lg" }), "flex w-full")}
        >
          Buy Now
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
