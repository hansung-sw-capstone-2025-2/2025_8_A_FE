import type { IconProps } from "@/types/icon";

export default function PlusIcon({
  color = "black",
  width = 20,
  height = 21,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.99999 4.6665V16.3332M4.16666 10.4998H15.8333"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
