"use client";
import React from "react";
import MYForm from "../form/MyForm";
import MYInput from "../form/MyInput";
import MYTextarea from "../form/MYTextarea";
import { Button } from "../ui/button";

export default function ContactForm() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = () => {

  };
  return (
    <div>
      <MYForm className="grid  grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <div className="sm:col-span-1 col-span-2">
          <MYInput
            name="name"
            label="Enter Name"
            type="text"
            placeholder="Enter Howard"
            required={true}
            className="px-[10px] py-5 rounded-[8px]"
          />
        </div>
        <div className="sm:col-span-1 col-span-2">
          <MYInput
            name="phone"
            label="Enter Name"
            type="number"
            placeholder="Enter Phone"
            className="px-[10px] py-5 rounded-[8px]"
          />
        </div>
        <div className="col-span-2">
          <MYInput
            name="email"
            label="Enter Email"
            type="email"
            placeholder="Enter Email"
            className="px-[10px] py-5 rounded-[8px]"
            required={true}
          />
        </div>
        <div className="col-span-2">
          <MYTextarea
            className="rounded-[8px] min-h-[165px]"
            name="message"
            label="Enter Message"
            placeholder="Write a message.."
          />
        </div>
        <Button size="lg" type="submit" className="col-span-2 uppercase">
          Submit Now
        </Button>
      </MYForm>
    </div>
  );
}
