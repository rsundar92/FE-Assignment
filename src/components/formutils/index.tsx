import { FieldInputProps, FormikValues } from "formik";
import { ChangeEvent, KeyboardEvent } from "react";

type TextFieldProps = {
  form: FormikValues;
  field: FieldInputProps<string>;
  label: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  datatestid?: string;
  maxLength?: number;
  showCharLength?: boolean;
  allowSpace?: boolean;
  required: boolean;
};

export const TextField: React.FC<TextFieldProps> = ({
  form: { errors, setTouched, touched, setFieldValue, ...form },
  field: { name, value },
  label,
  disabled,
  className = "",
  placeholder = "",
  type = "text",
  datatestid,
  allowSpace = true,
  maxLength = 1000,
  showCharLength = false,
  required = false,
  ...props
}) => {
  const error = errors[name];
  const inputStringLength = value?.length || 0;

  return (
    <div className="mb-6">
      <div className="mb-1 h-6 font-medium">
        {label}
        <span className="text-red-500">{required && <span>&#42;</span>}</span>
        {showCharLength && `${inputStringLength} / ${maxLength}`}
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
          onKeyUp={(evt: KeyboardEvent<HTMLInputElement>) => {
            if ((evt.target as HTMLInputElement).value.match(/\s/g)) {
              (evt.target as HTMLInputElement).value = (
                evt.target as HTMLInputElement
              ).value.replace(/\s/g, "");
              setFieldValue(name, (evt.target as HTMLInputElement).value);
            }
          }}
          maxLength={maxLength}
          {...props}
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};
