"use client";
import Cart from "@/components/payment/cart/Cart";
import Checkout from "@/components/payment/checkout/Checkout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Pay from "@/components/payment/checkout/Pay";
import {
  useGenerateClientSecreteMutation,
  useGetAddressQuery,
  useGetCartByIdQuery,
} from "@/redux/features/api/prouductApi";
import { useAppSelector } from "@/redux/hooks";
// import { useAppSelector } from "@/redux/hooks";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
);

const Payment = () => {
  const [activeTab, setActiveTab] = useState("Your Cart");
  const [clientSecret, setClientSecret] = useState("");
  const [generateClientSecrete] = useGenerateClientSecreteMutation();
  // const user = useAppSelector((state) => state.auth.user)
  const { data: address } = useGetAddressQuery("");
  const user = useAppSelector((state) => state.auth.user);
  const {
    data: cartData,
    isLoading: cartLoading,
   
  } = useGetCartByIdQuery(user?.id ?? "", { skip: !user });
  const price = cartData
    ?.reduce(
      (total, product) =>
        total + (product?.product?.price ?? 0) * product.quantity,
      0
    )
    .toFixed(2);


  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await generateClientSecrete({
          amount: Number(price),
        }).unwrap();

        if (res?.data) {
          setClientSecret(res.data);
        } else {
          throw new Error("Invalid clientSecret returned from API");
        }
      } catch (error) {
        
      }
    };

    createPaymentIntent();
  }, [generateClientSecrete, price]);

  const appearance = {
    theme: "stripe" as const,
  };

  // Display a loader until `clientSecret` is available
  if (!clientSecret||cartLoading) {
    return <p className="text-2xl bg-slate-300 text-center ">Not Found Data</p>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      <main className="py-20">
        <section className="container min-h-[50vh] border shadow-sm p-6 rounded-[8px]">
          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className=" h-auto bg-white w-full justify-start flex border-b p-0">
              <TabsTrigger
                value="Your Cart"
                className="font-inter border-b-[2px] border-b-transparent text-xl font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-black"
              >
                Your Cart
              </TabsTrigger>
              <TabsTrigger
                value="Check Out"
                className="font-inter border-b-[2px] border-b-transparent text-xl font-medium data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-black"
              >
                Check Out
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Your Cart">
              <Cart onCheckout={() => setActiveTab("Check Out")} />
            </TabsContent>
            <TabsContent value="Check Out">
              <div className="grid grid-cols-2">
                <Checkout address={address.data} />
                <Pay address={address.data} />
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </Elements>
  );
};

export default Payment;
