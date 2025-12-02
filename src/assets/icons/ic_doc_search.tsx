import type { IconProps } from "@/types/icon";

export default function DocSearchIcon({
  color = "black",
  width = 48,
  height = 48,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M28 30L31 33L28 30Z" fill="#C1C7CD" />
      <path
        d="M28 30L31 33"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 25C17 28.3138 19.6863 31 23 31C24.6598 31 26.162 30.326 27.2482 29.237C28.3308 28.1516 29 26.654 29 25C29 21.6862 26.3138 19 23 19C19.6863 19 17 21.6862 17 25Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 42.8V5.2C8 4.53726 8.53726 4 9.2 4H32.503C32.8212 4 33.1264 4.12642 33.3514 4.35148L39.6486 10.6485C39.8736 10.8736 40 11.1788 40 11.4971V42.8C40 43.4628 39.4628 44 38.8 44H9.2C8.53726 44 8 43.4628 8 42.8Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32 10.8V4.7071C32 4.31658 32.3166 4 32.7072 4C32.8946 4 33.0744 4.0745 33.2072 4.2071L39.7928 10.7929C39.9256 10.9255 40 11.1054 40 11.2929C40 11.6834 39.6834 12 39.2928 12H33.2C32.5372 12 32 11.4627 32 10.8Z"
        fill={color}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
