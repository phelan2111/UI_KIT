import { ToastContext, ToastType } from "@/context/toast";
import Localize from "@/langs";
import { Helper } from "@/utils/helper";
import { useContext, useEffect, type ReactNode } from "react";
type IItemToast = {
  icon: ReactNode;
  className: string;
};
const parseToast: Record<ToastType, IItemToast> = {
  [ToastType.success]: {
    className: "text-[#77E4C8]",
    icon: <>Icon</>,
  },
  [ToastType.error]: {
    className: "text-[#C96868]",
    icon: <>Icon</>,
  },
  [ToastType.normal]: {
    className: "text-white",
    icon: <>Icon</>,
  },
  [ToastType.warning]: {
    className: "text-[#F6EFBD]",
    icon: <>Icon</>,
  },
};
function Toast() {
  const { data, hasToast, onCloseToast } = useContext(ToastContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasToast) {
        onCloseToast();
      }
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [data.timeout, hasToast, onCloseToast]);

  return (
    <div
      className={`fixed top-4 bg-white/10 backdrop-blur-2xl rounded-lg transition-all z-50 min-w-72 duration-500 ${
        hasToast
          ? "translate-x-0 right-4 opacity-100"
          : "translate-x-full right-0 opacity-0"
      }`}
    >
      {data.renderComponent?.() ?? (
        <div className="p-4">
          <div
            className={`flex items-center gap-4 ${
              parseToast[data.theme as ToastType].className
            }`}
          >
            {parseToast[data.theme as ToastType].icon}
            <div className="flex flex-col gap-1">
              <p className="text-xl font-semibold">
                {!Helper.isEmpty(Localize(data?.label as string))
                  ? Localize(data?.label as string)
                  : data.label}
              </p>
              <p className="text-sm">
                {!Helper.isEmpty(Localize(data?.content as string))
                  ? Localize(data?.content as string)
                  : data.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Toast;
