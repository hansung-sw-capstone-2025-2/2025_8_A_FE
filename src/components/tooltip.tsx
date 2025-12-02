import { type ReactNode, useState } from "react";

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  width?: string;
}

export default function Tooltip({
  children,
  content,
  position = "top",
  width = "280px",
}: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900",
    bottom:
      "absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-900",
    left: "absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900",
    right:
      "absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900",
  };

  return (
    <div
      className="relative inline-flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <div
          className={`pointer-events-none absolute z-50 ${positionClasses[position]} rounded-lg bg-gray-900 px-3 py-2 text-center text-caption text-white shadow-lg`}
          style={{ width }}
        >
          {content}
          <div className={arrowClasses[position]}></div>
        </div>
      )}
    </div>
  );
}
