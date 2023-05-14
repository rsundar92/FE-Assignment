import { FieldInputProps, FormikValues } from "formik";
import { ChangeEvent } from "react";

type TextFieldProps = {
  form: FormikValues;
  field: FieldInputProps<string>;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  required: boolean;
};

export const TextField: React.FC<TextFieldProps> = ({
  form: { errors, setFieldValue },
  field: { name, value },
  label,
  disabled,
  placeholder = "",
  type = "text",
  required = false,
  ...props
}) => {
  const error = errors[name];

  return (
    <div className="mb-6">
      <div className="mb-1 h-6 font-medium">
        {label}
        <span className="text-red-500">{required && <span>&#42;</span>}</span>
      </div>

      <div className="border border-[#E6E6E6] rounded-md overflow-hidden text-sm">
        <input
          placeholder={placeholder}
          className={"w-full h-8 p-1"}
          disabled={disabled}
          type={type}
          value={value}
          onChange={(evt: ChangeEvent<HTMLInputElement>) =>
            setFieldValue(name, evt.target.value)
          }
          {...props}
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};
