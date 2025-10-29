import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolver?: any;
  size?: string;
  className?: string;
  style?: React.CSSProperties; // Correct type for style
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

const MYForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
  size,
  style,
  className,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await onSubmit(data);
      // methods.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        style={{ width: size, ...style }} // Inline styles
        onSubmit={methods.handleSubmit(submit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default MYForm;
