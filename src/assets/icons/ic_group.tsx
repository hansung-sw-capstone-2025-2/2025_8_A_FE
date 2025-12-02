import type { IconProps } from "@/types/icon";

export default function GroupIcon({
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
      <path
        d="M2 40V38C2 30.268 8.26802 24 16 24C23.732 24 30 30.268 30 38V40"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M26 28C26 22.4772 30.4772 18 36 18C41.5228 18 46 22.4772 46 28V29"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M16 24C20.4182 24 24 20.4182 24 16C24 11.5817 20.4182 8 16 8C11.5817 8 8 11.5817 8 16C8 20.4182 11.5817 24 16 24Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36 18C39.3138 18 42 15.3137 42 12C42 8.6863 39.3138 6 36 6C32.6862 6 30 8.6863 30 12C30 15.3137 32.6862 18 36 18Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
