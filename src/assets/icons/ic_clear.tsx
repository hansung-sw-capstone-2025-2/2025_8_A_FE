import type { IconProps } from "@/types/icon";

export default function ClearIcon({
  color = "black",
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
      <g clip-path="url(#clip0_55_12934)">
        <path
          d="M11.0833 3.73925L10.2608 2.91675L6.99996 6.17758L3.73913 2.91675L2.91663 3.73925L6.17746 7.00008L2.91663 10.2609L3.73913 11.0834L6.99996 7.82258L10.2608 11.0834L11.0833 10.2609L7.82246 7.00008L11.0833 3.73925Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_55_12934">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
