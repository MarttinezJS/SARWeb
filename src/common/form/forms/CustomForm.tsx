import { Button, type ButtonProps } from "@nextui-org/react";
import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type Path,
  type RegisterOptions,
  type SubmitHandler,
  type UseFormGetValues,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { SubmitButton } from "../buttons";
import { InputForm } from "../input";

interface CustomButtonProps {
  label: string;
  submitIcon?: ReactNode;
}

interface FormField<T extends FieldValues> {
  field: Path<T>;
  label: string;
  validations?: RegisterOptions<T, Path<T>>;
  visibleIf?: (fields: UseFormGetValues<T>) => void;
  variant: "input";
}

interface CustomFormProps<REQ extends FieldValues> {
  onSubmit: SubmitHandler<REQ>;
  submitButtonProps?: ButtonProps & CustomButtonProps;
  children: (
    register: (
      name: Path<REQ>,
      options?: RegisterOptions<REQ, Path<REQ>> | undefined
    ) => UseFormRegisterReturn<Path<REQ>>
  ) => ReactNode;
}

export const CustomForm = <REQ extends FieldValues>({
  onSubmit,
  submitButtonProps,
  children,
}: CustomFormProps<REQ>) => {
  const customForm = useForm<REQ>({
    reValidateMode: "onChange",
    mode: "all",
  });

  return (
    <FormProvider {...customForm}>
      <form onSubmit={customForm.handleSubmit(onSubmit)}>
        {children(customForm.register)}
        <div className="flex justify-end mt-5">
          <SubmitButton
            label={submitButtonProps?.label}
            submitButtonProps={submitButtonProps}
            icon={submitButtonProps?.submitIcon}
          />
        </div>
      </form>
    </FormProvider>
  );
};
