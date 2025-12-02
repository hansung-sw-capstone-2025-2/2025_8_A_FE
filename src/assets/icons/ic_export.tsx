import type { IconProps } from "@/types/icon";

export default function ExportIcon({
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
        d="M40 26V38C40 40.2092 38.2092 42 36 42H12C9.79086 42 8 40.2092 8 38V26"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 6L31 13M24 30V6V30ZM24 6L17 13L24 6Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
