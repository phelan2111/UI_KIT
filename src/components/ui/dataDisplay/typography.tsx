import type { ReactNode } from "react";

type HeadingsProps = {
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children?: ReactNode;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

function Headings({ type = "h1", className = "", ...props }: HeadingsProps) {
  const headerElements = {
    h1: (
      <h1
        className={`text-dark font-semibold text-[60px] ${className}`}
        {...props}
      >
        {props.children}
      </h1>
    ),
    h2: (
      <h2 className={`text-dark font-semibold ${className}`} {...props}>
        {props.children}
      </h2>
    ),
    h3: (
      <h3 className={`text-dark font-semibold ${className}`} {...props}>
        {props.children}
      </h3>
    ),
    h4: (
      <h4 className={`text-dark font-semibold ${className}`} {...props}>
        {props.children}
      </h4>
    ),
    h5: (
      <h5 className={`text-dark font-semibold ${className}`} {...props}>
        {props.children}
      </h5>
    ),
    h6: (
      <h6 className={`text-dark font-semibold ${className}`} {...props}>
        {props.children}
      </h6>
    ),
  };
  return headerElements[type];
}

type ParagraphsProps = {
  children?: ReactNode;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;
function Paragraphs(props: ParagraphsProps) {
  return (
    <p className="text-normal" {...props}>
      {props.children}
    </p>
  );
}

type FinePrintProps = {
  children?: ReactNode;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
function FinePrint(props: FinePrintProps) {
  return <small {...props}>{props.children}</small>;
}

type InlineTextProps = {
  children?: ReactNode;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;
function InlineText(props: InlineTextProps) {
  return <span {...props}>{props.children}</span>;
}

export const Typography = {
  Headings,
  Paragraphs,
  FinePrint,
  InlineText,
};
