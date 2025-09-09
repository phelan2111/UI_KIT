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
  iconClear?: ReactNode;
  clear?: boolean;
}

function TextField({
  classNameInput = "",
  className = "",
  name = "",
  classHelperText = "text-[#F04438]",
  type = "text",
  iconClear = (
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.20467 0.29387C1.81414 -0.0966545 1.18098 -0.0966545 0.790452 0.29387C0.399928 0.684394 0.399928 1.31756 0.790452 1.70808L5.08383 6.00146L0.791698 10.2936C0.401174 10.6841 0.401174 11.3173 0.791698 11.7078C1.18222 12.0983 1.81539 12.0983 2.20591 11.7078L6.49804 7.41567L10.7902 11.7078C11.1807 12.0983 11.8139 12.0983 12.2044 11.7078C12.5949 11.3173 12.5949 10.6841 12.2044 10.2936L7.91225 6.00146L12.2056 1.70808C12.5962 1.31756 12.5962 0.684394 12.2056 0.29387C11.8151 -0.0966545 11.1819 -0.0966545 10.7914 0.29387L6.49804 4.58724L2.20467 0.29387Z"
        fill="#212121"
      />
    </svg>
  ),
  clear = false,
  required = false,
  ...props
}: ITextFieldProps) {
  const form = useFormContext();
  const ref = useRef<HTMLDivElement>(null);
  const initialValue = useMemo(() => {
    return props.defaultValue ?? form?.getValues()?.[name];
  }, [props.defaultValue, form, name]);
  const messageError: string = useMemo(() => {
    return (
      props.messageError ??
      form?.formState.errors?.[name]?.message?.toString() ??
      ""
    );
  }, [form?.formState.errors, name, props.messageError]);

  const [messageE, setMessageE] = useState<string>(messageError);
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
    setMessageE("");
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
        {clear && !Helper.isEmpty(value) && (
          <Box
            className="cursor-pointer size-4 flex items-center justify-center"
            aria-hidden
            onClick={() => {
              setValue("");
            }}
          >
            {iconClear}
          </Box>
        )}

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
