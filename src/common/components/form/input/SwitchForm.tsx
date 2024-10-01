import { Checkbox } from "@nextui-org/react";
import {
  Controller,
  FieldValues,
  Path,
  useFormContext,
  UseFormRegisterReturn,
} from "react-hook-form";

interface SwitchFormProps<T extends FieldValues> {
  label: string;
  registerReturn: UseFormRegisterReturn<Path<T>>;
}

export const SwitchForm = <T extends FieldValues>({
  label,
  registerReturn,
}: SwitchFormProps<T>) => {
  const { setValue } = useFormContext();
  return (
    <Controller
      name={registerReturn.name}
      disabled={registerReturn.disabled}
      render={({ field }) => (
        <div className="flex items-center mb-2 mt-5 px-2 border-gray-200 border-2 rounded-full">
          <Checkbox
            className=""
            classNames={{
              label: "text-secondary ",
            }}
            onValueChange={(isSelected) =>
              setValue(field.name, isSelected as any)
            }
          >
            {label}
          </Checkbox>
        </div>
      )}
    />
  );
};
