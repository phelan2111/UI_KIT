import { Helper } from "@/utils/helper";
import Box from "ui/layout/box";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { Typography } from "ui/dataDisplay/typography";

export type ItemCheckbox = {
  label: string;
  value: number | string;
  disabled?: boolean;
  [name: string]: number | string | boolean | object | undefined;
};

export type CheckboxProps = {
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

function Checkbox({
  name,
  classHelperText = "text-error",
  labelPosition = "before",
  className = "flex items-center gap-4 cursor-pointer",
  classNameActive = "bg-primary",
  classNameCheckBox = "size-5 rounded-md border-[#EEEEEE]",
  icon = (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.9594 7.29293L1.1665 4.50004C0.890362 4.2239 0.890361 3.77618 1.1665 3.50004C1.44265 3.2239 1.89036 3.2239 2.1665 3.50004L4.38366 5.7172C4.53987 5.87341 4.79314 5.87341 4.94935 5.7172L9.83317 0.833374C10.1093 0.557232 10.557 0.557232 10.8332 0.833374C11.1093 1.10952 11.1093 1.55723 10.8332 1.83337L5.37361 7.29293C4.98309 7.68346 4.34992 7.68346 3.9594 7.29293Z"
        fill="white"
      />
    </svg>
  ),
  ...props
}: CheckboxProps) {
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

  const classNameBlock = useMemo(() => {
    let defaultClass = `border flex items-center transition-all duration-300 justify-center ${classNameCheckBox} ${
      !isChecked ? "bg-white" : classNameActive
    }`;
    if (props.disabled) {
      let replaceClass = defaultClass.replace("bg-white", "bg-disabled");
      if (isChecked) {
        replaceClass = defaultClass.replace(classNameActive, "bg-disabled");
      }
      defaultClass = replaceClass;
    }
    return defaultClass;
  }, [classNameCheckBox, isChecked, classNameActive, props.disabled]);

  return (
    <Box
      style={{
        pointerEvents: props.disabled ? "none" : "auto",
      }}
      className="w-fit relative h-fit"
    >
      <Box aria-hidden onClick={handlerChange} className={className}>
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
          role="checkbox"
          aria-checked="false"
          tabIndex={0}
          className="cursor-pointer"
        >
          <Box className={classNameBlock}>{isChecked && icon}</Box>
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
      </Box>
      {!Helper.isEmpty(messageE) && (
        <Typography.Paragraphs
          className={`text-[12px] text-nowrap py-0.5 px-0 rounded-3xl font-normal text-start w-full absolute bottom-0 right-0 translate-y-full ${classHelperText}`}
        >
          {messageE?.toString()}
        </Typography.Paragraphs>
      )}
    </Box>
  );
}

export type CheckboxGroupProps = {
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
  onChange?: (dataItem: ItemCheckbox[]) => void;
  data: ItemCheckbox[];
  values?: ItemCheckbox[];
};
function CheckboxGroup({
  labelPosition = "before",
  name = "",
  classHelperText = "text-error",
  className = "flex items-center gap-8",
  ...props
}: CheckboxGroupProps) {
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
  const [values, setValues] = useState<ItemCheckbox[]>(initialValue);

  const handleChecked = (dataItem: ItemCheckbox) => {
    let freshValues = [...values];
    const { index, isExist } = Helper.findItem(
      freshValues,
      "value",
      dataItem.value as number | string
    );

    if (isExist) {
      freshValues.splice(index, 1);
    } else {
      freshValues = [...freshValues, dataItem];
    }
    form?.setValue(name, freshValues, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValues(freshValues);
    props?.onChange?.(freshValues);
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
              const { isExist } = Helper.findItem(
                values ?? [],
                "value",
                l.value
              );

              return (
                <Checkbox
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

export { Checkbox, CheckboxGroup };
