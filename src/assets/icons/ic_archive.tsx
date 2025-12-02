import type { IconProps } from "@/types/icon";

export default function ArchiveIcon({
  color = "black",
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
      <g clipPath="url(#clip0_627_2131)">
        <path
          d="M17.5 6.66667V17.5H2.50001V6.66667M8.33334 10H11.6667M0.833344 2.5H19.1667V6.66667H0.833344V2.5Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_627_2131">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
