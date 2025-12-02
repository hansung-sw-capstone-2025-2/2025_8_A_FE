import { useState } from "react";
import QuestionIcon from "@/assets/icons/ic_question";

interface ChartReasoningTooltipProps {
  reasoning: string;
}

export default function ChartReasoningTooltip({
  reasoning,
}: ChartReasoningTooltipProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="absolute top-0 right-0 z-30">
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-gray-100">
          <QuestionIcon color="#6B7280" width={18} height={18} />
        </div>
        {isHovered && (
          <div className="absolute top-full right-0 z-50 mt-2 w-[320px] rounded-lg bg-gray-900 px-3 py-2 text-center text-caption text-white shadow-lg">
            {reasoning}
            <div className="absolute right-4 bottom-full border-4 border-transparent border-b-gray-900" />
          </div>
        )}
      </div>
    </div>
  );
}
