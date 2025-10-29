import { PlusIcon } from "@/utils/Icons";
import { MinusIcon } from "lucide-react";
import React from "react";

const Incrementor = ({
  value,
  setValue,
}: {
  value: number;
  setValue: (value: number) => void;
}) => {
  const handleDecrement = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const handleIncrement = () => {
    setValue(value + 1);
  };

  return (
    <div className="p-4 rounded-[8px] overflow-hidden bg-title gap-6 items-center w-max flex">
      <button className="text-white" onClick={handleDecrement}>
        <MinusIcon />
      </button>
      <span className="text-white font-semibold font-inter leading-[26px] text-center">
        {value}
      </span>
      <button onClick={handleIncrement}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default Incrementor;
