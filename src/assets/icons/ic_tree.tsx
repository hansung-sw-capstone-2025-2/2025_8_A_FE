import type { IconProps } from "@/types/icon";

export default function TreeIcon({
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
      <g clipPath="url(#clip0_729_12199)">
        <path
          d="M10 11.6663L13.3333 9.99967M10 18.333V11.6663V18.333ZM10 8.33301V11.6663V8.33301Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.1667 5.83366C14.1667 3.53248 12.3012 1.66699 10 1.66699C7.69883 1.66699 5.83334 3.53248 5.83334 5.83366"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.99999 14.9997H6.24999C3.71868 14.9997 1.66666 12.9477 1.66666 10.4163C1.66666 7.88503 3.71868 5.83301 6.24999 5.83301H7.49999"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 14.9995H13.75C16.2813 14.9995 18.3333 12.9475 18.3333 10.4162C18.3333 8.02536 16.5027 6.06208 14.1667 5.85156"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_729_12199">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
