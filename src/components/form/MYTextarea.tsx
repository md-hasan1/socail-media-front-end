import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea"; // Import ShadCN Textarea

type TTextareaProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
};

const MYTextarea = ({
  name,
  label,
  disabled,
  required,
  placeholder,
  defaultValue,
  className,
}: TTextareaProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext(); // Access errors from react-hook-form context

  return (
    <div className={`w-full`}>
      {label && (
        <label className="block text-lg  text-paragraph">{label}</label>
      )}
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? "This field is required" : false }}
        render={({ field }) => (
          <Textarea
            {...field}
            defaultValue={defaultValue}
            id={name}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full border ${
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

export default MYTextarea;
