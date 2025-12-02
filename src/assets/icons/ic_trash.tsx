import type { IconProps } from "@/types/icon";

export default function TrashIcon({
  color = "#BDBDBD",
  width = 14,
  height = 14,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.0833 4.08333L10.5774 11.1665C10.5338 11.777 10.0258 12.25 9.41367 12.25H4.58629C3.97421 12.25 3.46619 11.777 3.42258 11.1665L2.91665 4.08333M5.83331 6.41667V9.91667M8.16665 6.41667V9.91667M8.74998 4.08333V2.33333C8.74998 2.01117 8.48881 1.75 8.16665 1.75H5.83331C5.51115 1.75 5.24998 2.01117 5.24998 2.33333V4.08333M2.33331 4.08333H11.6666"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
