import type { IconProps } from "@/types/icon";

export default function StatusSquareIcon({
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
      <path d="M32 32V16V32Z" fill="#C1C7CD" />
      <path
        d="M32 32V16"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 32V22"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 32V26"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 40.8V7.2C6 6.53726 6.53726 6 7.2 6H40.8C41.4628 6 42 6.53726 42 7.2V40.8C42 41.4628 41.4628 42 40.8 42H7.2C6.53726 42 6 41.4628 6 40.8Z"
        stroke={color}
        strokeWidth="2.5"
      />
    </svg>
  );
}
