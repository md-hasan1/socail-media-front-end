import { Controller, useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { Input } from "../ui/input";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string | number;
  className?: string;
};

const MYInput = ({
  type,
  name,
  label,
  disabled,
  required,
  placeholder,
  defaultValue,
  className,
}: TInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext(); // Access errors from react-hook-form context

  useEffect(() => {
    if (type === "number") {
      const inputElement = document.getElementById(name);
      if (inputElement) {
        inputElement.addEventListener("wheel", (e) => e.preventDefault(), {
          passive: false,
        });
      }
    }
  }, [name, type]);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-lg  text-paragraph">
          {label} {required && <span>*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? "This field is required" : false }}
        render={({ field }) => (
          <Input
            {...field}
            type={type}
            defaultValue={defaultValue}
            id={name}
            placeholder={placeholder}
            disabled={disabled}
            min={type === "number" ? 0 : undefined}
            step={type === "number" ? 0.01 : undefined}
            className={`w-full border   ${
              errors[name] ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm ${className}`}
          />
        )}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default MYInput;
