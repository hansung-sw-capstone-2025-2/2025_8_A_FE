import type { IconProps } from "@/types/icon";

export default function GymIcon({
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
      <path
        d="M6.16668 5.83301H3.83334C3.5572 5.83301 3.33334 6.05687 3.33334 6.33301V13.6663C3.33334 13.9425 3.5572 14.1663 3.83334 14.1663H6.16668C6.44282 14.1663 6.66668 13.9425 6.66668 13.6663V6.33301C6.66668 6.05687 6.44282 5.83301 6.16668 5.83301Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.1667 5.83301H13.8333C13.5572 5.83301 13.3333 6.05687 13.3333 6.33301V13.6663C13.3333 13.9425 13.5572 14.1663 13.8333 14.1663H16.1667C16.4428 14.1663 16.6667 13.9425 16.6667 13.6663V6.33301C16.6667 6.05687 16.4428 5.83301 16.1667 5.83301Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.833344 12V8C0.833344 7.72386 1.0572 7.5 1.33334 7.5H2.83334C3.10949 7.5 3.33334 7.72386 3.33334 8V12C3.33334 12.2762 3.10949 12.5 2.83334 12.5H1.33334C1.0572 12.5 0.833344 12.2762 0.833344 12Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.1667 12V8C19.1667 7.72386 18.9428 7.5 18.6667 7.5H17.1667C16.8905 7.5 16.6667 7.72386 16.6667 8V12C16.6667 12.2762 16.8905 12.5 17.1667 12.5H18.6667C18.9428 12.5 19.1667 12.2762 19.1667 12Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66666 10H13.3333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
