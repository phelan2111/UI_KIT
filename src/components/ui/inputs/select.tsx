import { useMemo, useState, type ReactNode } from "react";
import TextField from "./textField";
import { Helper } from "@/utils/helper";
import { useFormContext } from "react-hook-form";
import Popover from "ui/utils/popover";
import Menu from "ui/dataDisplay/menu";
import MenuItem from "ui/dataDisplay/menuItem";
import Empty from "../dataDisplay/empty";
import Box from "../layout/box";
export type SelectProps = {
  className?: string;
  label?: string;
  required?: boolean;
  classNameInput?: string;
  classItem?: string;
  classActive?: string;
  classNameEmpty?: string;
  classNamePopper?: string;
  classMenuItem?: string;
  data: ItemSelect[];
  defaultSelect?: ItemSelect;
  onChange?: (dataItem: ItemSelect) => void;
  onChangeInput?: (dataItem: string) => void;
  emptyComponent?: ReactNode;
  name?: string;
  classHelperText?: string;
  iconDown?: ReactNode;
  disabled?: boolean;
  placeholder?: string;
  messageError?: string;
};
type RenderLabelItemProps = {
  label: string;
  index: number;
  value: string | number;
};

export type ItemSelect = {
  value: string | number;
  label: string;
  renderLabel?: (renderProps: RenderLabelItemProps) => ReactNode;
};
function Select({
  className = "pointer-events-none",
  classNamePopper = "",
  classNameInput = "",
  classItem = "bg-white",
  name = "",
  classActive = "bg-[#DCDCDC]",
  classMenuItem = "p-2",
  emptyComponent = <>Empty...</>,
  iconDown = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.8264 8.1818C20.0579 8.42419 20.0579 8.81719 19.8264 9.05958L12.419 16.8182C12.1876 17.0606 11.8124 17.0606 11.581 16.8182L4.17357 9.05958C3.94215 8.81719 3.94215 8.42419 4.17357 8.1818C4.40499 7.9394 4.7802 7.9394 5.01162 8.1818L12 15.5015L18.9884 8.1818C19.2198 7.9394 19.595 7.9394 19.8264 8.1818Z"
        fill="#141415"
      />
    </svg>
  ),
  ...props
}: SelectProps) {
  const form = useFormContext();

  const [keyFresh, setKeyFresh] = useState<string>(Helper.randomKey());

  const messageError: string = useMemo(() => {
    return (
      props.messageError ??
      form?.formState.errors?.[name]?.message?.toString() ??
      ""
    );
  }, [form?.formState.errors, name, props.messageError]);

  const classNameBlock = useMemo(() => {
    let defaultClass = "flex w-full items-center rounded-md bg-white";
    if (!Helper.isEmpty(messageError)) {
      const replaceClass = defaultClass.replace(
        "bg-white",
        "!border-[#F04438] bg-[#F7CAC9]"
      );
      defaultClass = replaceClass;
    }
    if (props.disabled) {
      const replaceClass = defaultClass.replace(
        "bg-white",
        "bg-disabled border-disabled"
      );
      defaultClass = replaceClass;
    }
    return defaultClass;
  }, [props.disabled, messageError]);

  const initialValue = useMemo(() => {
    return props.defaultSelect ?? form?.getValues()?.[name];
  }, [props.defaultSelect, form, name]);

  const [dataSelectState, setDataSelectState] = useState<
    ItemSelect | undefined
  >(initialValue);

  const handleSelect = (dataItem: ItemSelect) => {
    setDataSelectState(dataItem);
    setKeyFresh(Helper.randomKey());
    props.onChange?.(dataItem);
    form?.setValue(name, dataItem, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <div
      style={{
        pointerEvents: props.disabled ? "none" : "auto",
      }}
      className="w-full flex flex-col gap-1 relative"
    >
      {props.label && (
        <Box className="flex items-center gap-1">
          <p
            className={`text-base text-label ${
              props.disabled ? "text-disabled" : "text-normal"
            } ${!Helper.isEmpty(messageError) ? "text-error" : " text-nowrap"}`}
          >
            {props.label}{" "}
            {props.required && <span className="text-red-500">*</span>}{" "}
          </p>
        </Box>
      )}
      <Popover
        className={classNamePopper}
        renderContent={({ onClose }) => {
          return (
            <Empty
              componentEmpty={() => {
                return emptyComponent;
              }}
              isEmpty={props.data.length === 0}
            >
              <Box>
                <Menu
                  className={`rounded-md shadow-materialDesign overflow-hidden ${classItem}`}
                  gap="gap-0"
                >
                  {props.data.map((item, index) => {
                    const { isEqual } = Helper.compareItem(
                      item,
                      "value",
                      dataSelectState?.value ?? ""
                    );
                    return (
                      <MenuItem
                        className={`${classMenuItem} ${
                          isEqual ? classActive : "text-primary_dark"
                        }`}
                        onClick={() => {
                          handleSelect(item);
                          onClose();
                        }}
                        key={item.value}
                      >
                        {item.renderLabel?.({ ...item, index }) ?? item.label}
                      </MenuItem>
                    );
                  })}
                </Menu>
              </Box>
            </Empty>
          );
        }}
        renderChildren={({ open }) => {
          return (
            <div className={`${classNameBlock} ${className}`}>
              <div className="w-full">
                <TextField
                  onBlur={() => {
                    if (dataSelectState) {
                      setKeyFresh(Helper.randomKey());
                    }
                  }}
                  onChange={props.onChangeInput}
                  messageError={messageError}
                  placeholder={props.placeholder}
                  key={keyFresh}
                  defaultValue={dataSelectState?.label}
                  disabled={props.disabled}
                  className="hover:!shadow-none focus-within:!shadow-none !border-transparent"
                  classNameInput={classNameInput}
                  icon={{
                    direction: "end",
                    node: (
                      <div
                        className={`transition-all duration-500 ${
                          open ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        {iconDown}
                      </div>
                    ),
                  }}
                />
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}

export default Select;
