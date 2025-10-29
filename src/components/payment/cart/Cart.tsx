"use client";
import {
  useDeleteCartMutation,
  useGetCartByIdQuery,
} from "@/redux/features/api/prouductApi";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import CartSkeleton from "./CartSkeleton";
import MYForm from "@/components/form/MyForm";
import MYInput from "@/components/form/MyInput";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import CartItemData from "./CartItem";



const Cart = ({ onCheckout }: { onCheckout: () => void }) => {
  const user = useAppSelector((state) => state.auth.user);
  const {
    data: cartData,
    isLoading,
    refetch,
  } = useGetCartByIdQuery(user?.id ?? "");
  const [deleteCart] = useDeleteCartMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCoupCode = () => {
  
  };

  const handleDelete = async (productId: string | undefined) => {
    try {
      const response = await deleteCart({
        userId: user?.id,
        productId: productId,
      }).unwrap();

      if (response.success) {
        toast.success(response.message);
        refetch();
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error("Error when deleting cart item", err);
      toast.error("Failed to delete item.");
    }
  };
  const handleCheckout=()=>{
    onCheckout();
  }




  return (
    <div>
      <div className="mb-[64px]">
        {isLoading ? (
          <CartSkeleton />
        ) : !cartData?.length ? (
          <div className="text-2xl min-h-[300px] flex justify-center items-center text-title">
            <h2>No Data Found</h2>
          </div>
        ) : (
          <div>
            {cartData.map((item, idx) => (
              <CartItemData
                key={idx}
                idx={idx}
                item={item}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
      <div>
        <MYForm
          className="flex items-center sm:flex-row flex-col sm:w-[500px] gap-4 justify-start"
          onSubmit={handleCoupCode}
        >
          <MYInput placeholder="Enter coupon code" name="coupon" type="text" />
          <Button className="py-6" type="submit">
            Submit Code
          </Button>
        </MYForm>
      </div>

      <div className="mt-8">
        <div className="space-y-6">
          <div className="w-full">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="py-2 font-medium">SL.</th>
                  <th className="py-2 font-medium">Product Name</th>
                  <th className="py-2 font-medium">Qty</th>
                  <th className="py-2 font-medium text-[#000080]">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartData?.map((product, idx) => (
                  <tr key={idx}>
                    <td className="py-2">{idx + 1}</td>
                    <td className="py-2">{product.product?.title}</td>
                    <td className="py-2">{product.quantity}</td>
                    <td className="py-2 text-[#000080]">
                      $
                      {(
                        (product?.product?.price ?? 0) * product.quantity
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="border-t">
                  <td className="py-4 font-medium">Sub_Total</td>
                  <td></td>
                  <td className="py-4"></td>
                  <td className="py-4 text-[#000080]">
                    $
                    {cartData
                      ?.reduce(
                        (total, product) =>
                          total +
                          (product?.product?.price ?? 0) * product.quantity,
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Button onClick={handleCheckout}  className="w-full text-white py-6" size="lg">
            Check Out $
            {cartData
              ?.reduce(
                (total, product) =>
                  total + (product?.product?.price ?? 0) * product.quantity,
                0
              )
              .toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
