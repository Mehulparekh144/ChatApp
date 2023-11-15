import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control } from "react-hook-form";

interface InputProps {
  id: string;
  type: string;
  title: string;
  placeholder: string;
  control: Control;
  required: boolean;
  disabled: boolean;
}

const FormInput: React.FC<InputProps> = ({
  control,
  title,
  type,
  id,
  placeholder,
  required,
  disabled,
}) => {
  return (
    <FormField
      name={id}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={id}>{title}</FormLabel>
          <FormControl>
            <Input
              className="mt-2"
              id={id}
              type={type}
              required={required}
              placeholder={placeholder}
              {...field}
              disabled={disabled}

            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
