import type { IconProps } from "@/types/icon";

export default function CartIcon({
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
      <g clipPath="url(#clip0_735_16246)">
        <path
          d="M0.833344 0.833008H4.16668L6.40001 11.9913C6.47621 12.375 6.68493 12.7196 6.98963 12.9649C7.29433 13.2102 7.67559 13.3405 8.06668 13.333H16.1667C16.5578 13.3405 16.939 13.2102 17.2437 12.9649C17.5484 12.7196 17.7571 12.375 17.8333 11.9913L19.1667 4.99967H5.00001M8.33334 17.4997C8.33334 17.9599 7.96025 18.333 7.50001 18.333C7.03977 18.333 6.66668 17.9599 6.66668 17.4997C6.66668 17.0394 7.03977 16.6663 7.50001 16.6663C7.96025 16.6663 8.33334 17.0394 8.33334 17.4997ZM17.5 17.4997C17.5 17.9599 17.1269 18.333 16.6667 18.333C16.2064 18.333 15.8333 17.9599 15.8333 17.4997C15.8333 17.0394 16.2064 16.6663 16.6667 16.6663C17.1269 16.6663 17.5 17.0394 17.5 17.4997Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_735_16246">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
