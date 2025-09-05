/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Dot, type DotProps } from "./dot";

type ContainerProps = {
  children: ReactNode;
  defaultValue?: number;
  gap?: number;
  dot?: DotSwiper;
  classname?: string;
  classContainer?: string;
  classDot?: string;
};

export enum DotSwiper {
  traditional = 0,
  modern,
}

let scrollTimeout: string | number | NodeJS.Timeout | undefined;

type ParamsDotView = {
  data: DotProps;
  type: DotSwiper;
  className?: string;
};
function DotView(params: ParamsDotView) {
  switch (params.type) {
    case DotSwiper.modern:
      return <Dot.Modern {...params.data} className={params.className} />;
    case DotSwiper.traditional:
      return <Dot.Traditional {...params.data} className={params.className} />;
    default:
      return <></>;
  }
}

function Container({
  defaultValue = 0,
  gap = 12,
  classname = "",
  classContainer = "p-5",
  dot = DotSwiper.traditional,
  ...props
}: ContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState<number>(defaultValue);
  const [quantityNodes, setQuantityNodes] = useState(0);

  const handleScroll = (events: HTMLDivElement) => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const index = Math.round(events.scrollLeft / events.offsetWidth);
      setActiveIndex(index);
    }, 100);
  };

  useEffect(() => {
    if (ref.current?.childNodes) {
      setQuantityNodes(Object.values(ref.current?.childNodes)?.length);
    }
    ref?.current?.addEventListener("scroll", () => {
      handleScroll(ref.current as HTMLDivElement);
    });
    return () => {
      ref?.current?.removeEventListener("scroll", () => {
        handleScroll(ref.current as HTMLDivElement);
      });
    };
  }, [ref]);

  return (
    <div
      style={{
        gap,
      }}
      className={`flex flex-col items-center w-full relative ${classname}`}
    >
      <div
        ref={ref}
        className={`flex w-full flex-nowrap gap-3 overflow-x-auto hiddenScroll snap-x snap-mandatory ${classContainer}`}
      >
        {props.children}
      </div>
      <DotView
        className={props.classDot}
        type={dot}
        data={{ index: activeIndex, quantityNodes }}
      />
    </div>
  );
}
type ChildProps = {
  children: ReactNode;
  className?: string;
};
function Child({ className = "snap-center", ...props }: ChildProps) {
  return <div className={className}>{props.children}</div>;
}

export const Swiper = {
  Container,
  Child,
};
