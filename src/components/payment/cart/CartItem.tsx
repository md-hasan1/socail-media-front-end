import StarRating from "@/components/StarRating/StarRating";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/redux/features/api/prouductApi";
import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";
import image1 from "@/assets/how-it-works.png";

const CartItemData = ({
  item,
  idx,
  onDelete,
}: {
  idx: number;
  item: CartItem;
  onDelete: (id: string | undefined) => void;
}) => {
 
  return  <div className="flex items-center gap-6 mt-4 border-b pb-3 relative">
  <h2 className="text-2xl font-medium text-primary w-max">
    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}.
  </h2>
  <div className="flex items-center sm:flex-row flex-col gap-6">
    <div className="sm:w-[180px] w-full h-[300px] sm:h-[157px] border rounded">
      <Image
        className="size-full object-cover"
        width={200}
        height={160}
        src={item.product?.images?.[0] || image1} // Dynamic Image
        alt={item.product?.title || "Product Image"}
      />
    </div>
    <div>
      <h2 className="text-[36px] font-semibold text-title mb-[21px]">
        {item?.product?.title}
      </h2>
      <StarRating reviews={item?.product?.Review} />
      <p className="mt-4 text-lg text-paragraph">
        {item?.product?.description}
      </p>
    </div>
  </div>
  <div className="absolute top-1/2 right-0 -translate-y-1/2">
    <Button
      onClick={() => onDelete(item.id)}
      className="rounded-full p-0 size-[30px] text-red-500 hover:text-red-500"
      variant={"ghost"}
    >
      <MdDeleteOutline />
    </Button>
  </div>
</div>
};

export default CartItemData;
