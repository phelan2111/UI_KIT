import { Helper } from "@/utils/helper";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import Box from "ui/layout/box";
import { Typography } from "../dataDisplay/typography";

export type ItemCheckbox = {
  label: string;
  value: number | string;
  disabled?: boolean;
  [name: string]: number | string | boolean | object | undefined;
};

export type RadioProps = {
  labelPosition?: "before" | "after";
  label?: string;
  messageError?: string;
  name: string;
  classHelperText?: string;
  className?: string;
  classNameCheckBox?: string;
  classNameActive?: string;
  defaultValue?: boolean;
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  onChange?: (dataItem: boolean) => void;
};

function Radio({
  name,
  className = "size-5 bg-white rounded-full border-[5px] border-[#A9A9A9] cursor-pointer",
  classHelperText = "text-error",
  labelPosition = "before",
  classNameActive = "border-primary",
  ...props
}: RadioProps) {
  const form = useFormContext();

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
  const [isChecked, setIsChecked] = useState<boolean>(initialValue);

  const classNameBlock = useMemo(() => {
    let defaultClass = `${className}`;
    if (isChecked) {
      defaultClass = defaultClass.replace("border-[#A9A9A9]", classNameActive);
    }
    if (props.disabled) {
      defaultClass = defaultClass.replace(
        "border-[#A9A9A9]",
        "border-disabled"
      );
    }
    return defaultClass;
  }, [className, isChecked, props.disabled, classNameActive]);

  const handlerChange = () => {
    setMessageE("");
    setIsChecked((prev) => !prev);
    props?.onChange?.(!isChecked);
    form?.setValue(name, !isChecked, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    if (props?.messageError !== undefined) {
      setMessageE(props.messageError as string);
    }
  }, [props.messageError]);
  useEffect(() => {
    if (props.onChange && props.checked !== undefined) {
      setIsChecked(props.checked);
    }
  }, [props.checked, props.onChange]);

  return (
    <Box
      style={{
        pointerEvents: props.disabled ? "none" : "auto",
      }}
      className="w-fit relative h-fit"
    >
      <Box
        aria-hidden
        onClick={handlerChange}
        className={"flex items-center gap-2 cursor-pointer"}
      >
        {props.label && labelPosition === "before" && (
          <Box className="flex items-center gap-1">
            <p
              className={`text-base text-label ${
                props.disabled ? "text-disabled" : "text-normal"
              } ${
                !Helper.isEmpty(messageError) ? "text-error" : " text-nowrap"
              }`}
            >
              {props.label}{" "}
              {props.required && <span className="text-red-500">*</span>}{" "}
            </p>
          </Box>
        )}
        <Box
          role="radio"
          aria-checked="false"
          tabIndex={0}
          className={`transition-all duration-300 ${classNameBlock}`}
        ></Box>
        {props.label && labelPosition === "after" && (
          <Box className="flex items-center gap-1">
            <p
              className={`text-base text-label ${
                props.disabled ? "text-disabled" : "text-normal"
              } ${
                !Helper.isEmpty(messageError) ? "text-error" : " text-nowrap"
              }`}
            >
              {props.label}{" "}
              {props.required && <span className="text-red-500">*</span>}{" "}
            </p>
          </Box>
        )}
        {!Helper.isEmpty(messageE) && (
          <Typography.Paragraphs
            className={`text-[12px] text-nowrap py-0.5 px-0 rounded-3xl font-normal text-start w-full absolute bottom-0 right-0 translate-y-full ${classHelperText}`}
          >
            {messageE?.toString()}
          </Typography.Paragraphs>
        )}
      </Box>
    </Box>
  );
}

export type RadioGroupProps = {
  labelPosition?: "before" | "after";
  label?: string;
  messageError?: string;
  name: string;
  classHelperText?: string;
  className?: string;
  classNameCheckBox?: string;
  classNameActive?: string;
  defaultValue?: ItemCheckbox[];
  checked?: boolean;
  required?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  onChange?: (dataItem: ItemCheckbox) => void;
  data: ItemCheckbox[];
  values?: ItemCheckbox;
};
function RadioGroup({
  labelPosition = "before",
  name = "",
  classHelperText = "text-error",
  className = "flex items-center gap-8",
  ...props
}: RadioGroupProps) {
  const form = useFormContext();

  const initialValue = useMemo(() => {
    return props.defaultValue ?? form?.getValues()?.[name] ?? [];
  }, [props.defaultValue, form, name]);
  const messageError: string = useMemo(() => {
    return (
      props.messageError ??
      form?.formState.errors?.[name]?.message?.toString() ??
      ""
    );
  }, [form?.formState.errors, name, props.messageError]);

  const [messageE, setMessageE] = useState<string>(messageError);
  const [values, setValues] = useState<ItemCheckbox>(initialValue);

  const handleChecked = (dataItem: ItemCheckbox) => {
    form?.setValue(name, dataItem, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValues(dataItem);
    props?.onChange?.(dataItem);
  };

  useEffect(() => {
    if (props?.messageError !== undefined) {
      setMessageE(props.messageError as string);
    }
  }, [props.messageError]);
  useEffect(() => {
    if (props.onChange && props.values !== undefined) {
      setValues(props.values);
    }
  }, [props.values, props.onChange]);

  return (
    <Box>
      <Box
        style={{
          pointerEvents: props.disabled ? "none" : "auto",
        }}
        className="w-fit relative"
      >
        <Box aria-hidden className={"flex flex-col gap-2"}>
          {props.label && (
            <Box className="flex items-center gap-1">
              <p
                className={`text-base text-label ${
                  props.disabled ? "text-disabled" : "text-normal"
                } ${
                  !Helper.isEmpty(messageError) ? "text-error" : " text-nowrap"
                }`}
              >
                {props.label}{" "}
                {props.required && <span className="text-red-500">*</span>}{" "}
              </p>
            </Box>
          )}
          <Box className={className}>
            {props.data.map((l, index) => {
              const isExist = l.value === values.value;

              return (
                <Radio
                  onChange={() => {
                    handleChecked(l);
                  }}
                  disabled={l.disabled}
                  icon={props.icon}
                  checked={isExist}
                  classNameCheckBox={props.classNameCheckBox}
                  classNameActive={props.classNameActive}
                  label={l.label}
                  labelPosition={labelPosition}
                  name={(l.value as string) ?? `${index}_checkbox`}
                />
              );
            })}
          </Box>
          {props.label && labelPosition === "after" && (
            <Box className="flex items-center gap-1">
              <p
                className={`text-base text-label ${
                  props.disabled ? "text-disabled" : "text-normal"
                } ${
                  !Helper.isEmpty(messageError) ? "text-error" : " text-nowrap"
                }`}
              >
                {props.label}{" "}
                {props.required && <span className="text-red-500">*</span>}{" "}
              </p>
            </Box>
          )}
          {!Helper.isEmpty(messageE) && (
            <Typography.Paragraphs
              className={`text-[12px] text-nowrap py-0.5 px-0 rounded-3xl font-normal text-start w-full absolute bottom-0 right-0 translate-y-full ${classHelperText}`}
            >
              {messageE?.toString()}
            </Typography.Paragraphs>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export { Radio, RadioGroup };
