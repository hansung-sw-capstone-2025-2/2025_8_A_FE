import type { IconProps } from "@/types/icon";

export default function TagIcon({
  color = "black",
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
      <path
        d="M8.17851 8.18034H8.18684M19.5035 13.522L13.5285 19.497C13.3737 19.652 13.1899 19.7749 12.9876 19.8588C12.7852 19.9426 12.5684 19.9858 12.3493 19.9858C12.1303 19.9858 11.9134 19.9426 11.7111 19.8588C11.5088 19.7749 11.325 19.652 11.1702 19.497L4.01184 12.347V4.01367H12.3452L19.5035 11.172C19.8139 11.4843 19.9882 11.9067 19.9882 12.347C19.9882 12.7873 19.8139 13.2097 19.5035 13.522Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
