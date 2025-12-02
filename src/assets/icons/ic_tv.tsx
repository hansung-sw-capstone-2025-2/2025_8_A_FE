import type { IconProps } from "@/types/icon";

export default function TvIcon({
  color = "#663CC5",
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
      <g clipPath="url(#clip0_735_16263)">
        <path
          d="M14.1667 1.66699L9.99999 5.83366L5.83332 1.66699M3.33332 5.83366H16.6667C17.5871 5.83366 18.3333 6.57985 18.3333 7.50033V16.667C18.3333 17.5875 17.5871 18.3337 16.6667 18.3337H3.33332C2.41285 18.3337 1.66666 17.5875 1.66666 16.667V7.50033C1.66666 6.57985 2.41285 5.83366 3.33332 5.83366Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_735_16263">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
