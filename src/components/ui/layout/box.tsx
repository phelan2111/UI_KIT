import type { CSSProperties, ReactNode } from "react";

type BoxProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

function Box({ className = "", ...props }: BoxProps) {
  return (
    <div {...props} className={className} style={props.style}>
      {props.children}
    </div>
  );
}

export default Box;
