import type { ButtonProps } from "@nextui-org/react";
import type { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type Path,
  type RegisterOptions,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { SubmitButton } from "../buttons";
import { Response } from "../../../../models";

interface CustomButtonProps {
  label: string;
  submitIcon?: ReactNode;
}

interface CustomFormProps<REQ extends FieldValues> {
  onSubmit: (
    data: REQ,
    event?: React.BaseSyntheticEvent
  ) => Promise<Response<unknown>> | undefined;
  children: (
    register: (
      name: Path<REQ>,
      options?: RegisterOptions<REQ, Path<REQ>> | undefined
    ) => UseFormRegisterReturn<Path<REQ>>
  ) => ReactNode;
  submitButtonProps?: ButtonProps & CustomButtonProps;
  defaultValues?: REQ;
}

export const CustomForm = <REQ extends FieldValues>({
  onSubmit,
  submitButtonProps,
  children,
  defaultValues,
}: CustomFormProps<REQ>) => {
  const customForm = useForm<REQ>({
    reValidateMode: "onChange",
    mode: "all",
    values: defaultValues,
  });

  return (
    <FormProvider {...customForm}>
      <form
        onSubmit={customForm.handleSubmit(async (data, e) => {
          const resp = await onSubmit(data, e);
          if (resp && resp.error == false) {
            console.log("Reset");

            customForm.reset();
          }
        })}
        className="w-full"
      >
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
