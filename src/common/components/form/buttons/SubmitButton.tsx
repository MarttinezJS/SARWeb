import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

// interface SubmitButtonProps {
//   // submitButtonProps?: ButtonProps;
//   label?: string;
//   icon?: ReactNode;
// }

export const SubmitButton = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  useEffect(() => {}, [isSubmitting]);
  return (
    <></>
    // <Button
    //   type="submit"
    //   color="primary"
    //   startContent={isSubmitting ? <CircularProgress /> : icon ?? <FaRegSave />}
    //   {...submitButtonProps}
    //   isDisabled={submitButtonProps?.disabled == true || isSubmitting}
    //   isLoading={isSubmitting}
    // >
    //   {isSubmitting ? "Enviando..." : label ?? "Guardar"}
    // </Button>
  );
};
