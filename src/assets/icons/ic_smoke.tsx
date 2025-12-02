import type { IconProps } from "@/types/icon";

export default function SmokeIcon({
  color = "#1A1A1A",
  width = 24,
  height = 24,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_735_16323)">
        <path
          d="M20 13H4C3.44772 13 3 13.4477 3 14V16C3 16.5523 3.44772 17 4 17H20C20.5523 17 21 16.5523 21 16V14C21 13.4477 20.5523 13 20 13Z"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 13V17"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 5V5.5C16 6.03043 16.2107 6.53914 16.5858 6.91421C16.9609 7.28929 17.4696 7.5 18 7.5C18.5304 7.5 19.0391 7.71071 19.4142 8.08579C19.7893 8.46086 20 8.96957 20 9.5V10"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_735_16323">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
