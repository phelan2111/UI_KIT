import { Helper } from "@/utils/helper";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLInputTypeAttribute,
  type ReactNode,
} from "react";
import { useFormContext } from "react-hook-form";
import Box from "ui/layout/box";

export interface ITextFieldProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "onChange" | "autoFocus"
  > {
  label?: string;
  classNameInput?: string;
  placeholder?: string;
  className?: string;
  name?: string;
  defaultValue?: string;
  type?: HTMLInputTypeAttribute;
  onChange?: (valueInput: string) => void;
  icon?: {
    direction: "start" | "end";
    node: ReactNode;
  };
  autoFocus?: boolean;
  messageError?: string;
  classHelperText?: string;
  extendsLabel?: ReactNode;
}

function TextField({
  classNameInput = "",
  className = "",
  name = "",
  classHelperText = "text-[#F04438]",
  type = "text",
  required = false,
  ...props
}: ITextFieldProps) {
  const form = useFormContext();
  const ref = useRef<HTMLDivElement>(null);
  const initialValue = useMemo(() => {
    return props.defaultValue ?? form?.getValues()?.[name];
  }, [props.defaultValue, form, name]);

  const [messageE, setMessageE] = useState<string>("");
  const [value, setValue] = useState<string>(initialValue);

  const classNameBlock = useMemo(() => {
    let defaultClass =
      "relative flex h-fit items-center bg-white border-[#DADADA] gap-1 transition-all duration-500 border focus-within:border-primary p-input rounded-input";
    if (!Helper.isEmpty(messageE)) {
      const replaceClass = defaultClass.replace(
        "bg-white border-[#DADADA]",
        "!border-[#F04438] bg-[#F7CAC9]"
      );
      defaultClass = replaceClass;
    }
    if (props.disabled) {
      const replaceClass = defaultClass.replace(
        "bg-white border-[#DADADA]",
        "bg-disabled border-disabled"
      );
      defaultClass = replaceClass;
    }
    return defaultClass;
  }, [props.disabled, messageE]);

  const isIconStart = props.icon?.direction === "start";
  const isIconEnd = props.icon?.direction === "end";

  const handleChange = (valueInput: string) => {
    setValue(valueInput);
    if (!Helper.isEmpty(name)) {
      form?.setValue(name, valueInput, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  const onScrollIntoView = () => {
    setTimeout(() => {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
    }, 100);
  };

  const onBluer = () => {
    if (!Helper.isEmpty(props?.messageError)) {
      setMessageE(props.messageError as string);
    } else {
      setMessageE(form?.formState.errors?.[name]?.message as string);
    }
  };

  useEffect(() => {
    if (props?.messageError !== undefined) {
      setMessageE(props.messageError as string);
    }
  }, [props.messageError]);

  return (
    <div ref={ref} className="flex flex-col gap-1 relative">
      {props.label && (
        <Box className="flex items-center gap-1">
          <p
            className={`text-base text-label ${
              props.disabled ? "text-disabled" : "text-normal"
            } ${!Helper.isEmpty(messageE) ? "text-error" : " text-nowrap"}`}
          >
            {props.label} {required && <span className="text-red-500">*</span>}{" "}
          </p>
          {props.extendsLabel}
        </Box>
      )}
      <div className={`${classNameBlock} ${className}`}>
        {isIconStart && props.icon && props.icon.node}
        <input
          onClick={() => {
            onScrollIntoView();
          }}
          onBlur={onBluer}
          value={value}
          type={type}
          name={name}
          placeholder={props.placeholder}
          className={`w-full outline-none bg-transparent font-normal h-input text-[16px] ${
            props.disabled ? "text-[#686D76]" : "text-normal"
          } ${
            !Helper.isEmpty(messageE)
              ? "placeholder:text-error"
              : "placeholder:text-[#BBBBBB]"
          } ${classNameInput}`}
          {...props}
          onChange={(e) => {
            handleChange(e.currentTarget.value);
            props?.onChange?.(e.currentTarget.value);
          }}
        />
        {isIconEnd && props.icon && props.icon.node}
      </div>
      {!Helper.isEmpty(messageE) && (
        <p
          className={`text-[12px] px-0 py-0.5 rounded-3xl font-normal text-start w-full absolute bottom-0 right-0 translate-y-full ${classHelperText}`}
        >
          {messageE?.toString()}
        </p>
      )}
      {!Helper.isEmpty(props.maxLength) && (
        <p
          className={`text-[12px] px-0 py-0.5 rounded-3xl font-normal text-end w-full absolute bottom-0 right-0 translate-y-full`}
        >
          {value?.length ?? 0}/{props.maxLength}
        </p>
      )}
    </div>
  );
}

export default TextField;
