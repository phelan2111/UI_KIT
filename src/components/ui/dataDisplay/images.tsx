import type { CSSProperties } from "react";

type PictureProps = {
  className?: string;
  style?: CSSProperties;
  src?: string;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

function Picture({ className = "", ...props }: PictureProps) {
  return (
    <figure>
      <img
        {...props}
        className={className}
        style={props.style}
        src={props.src}
        alt={props.alt}
      />
    </figure>
  );
}
export const Images = {
  Picture,
};
