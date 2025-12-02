import type { IconProps } from "@/types/icon";

export default function QuestionIcon({
  color = "#6B7280",
  width = 20,
  height = 20,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="9" stroke={color} strokeWidth="1.5" />
      <path
        d="M10 14C10.2761 14 10.5 13.7761 10.5 13.5C10.5 13.2239 10.2761 13 10 13C9.72386 13 9.5 13.2239 9.5 13.5C9.5 13.7761 9.72386 14 10 14Z"
        fill={color}
        stroke={color}
        strokeWidth="0.5"
      />
      <path
        d="M10 11.5V11C10.8284 11 11.5 10.3284 11.5 9.5C11.5 8.67157 10.8284 8 10 8C9.17157 8 8.5 8.67157 8.5 9.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
