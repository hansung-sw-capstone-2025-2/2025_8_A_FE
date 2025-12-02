import type React from "react";
import ClearIcon from "@/assets/icons/ic_clear";

type ChipVariant = "filled" | "outlined" | "selected";
type ChipType = "text" | "icon";
type ClearIcon = "on" | "off";

interface ChipProps {
  children: React.ReactNode;
  variant?: ChipVariant;
  chipType?: ChipType;
  clearIcon?: ClearIcon;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}

export default function Chip({
  children,
  variant = "filled",
  chipType = "text",
  clearIcon = "off",
  onClick,
  disabled = false,
  fullWidth = false,
  type = "button",
  textColor = "black",
  bgColor = "primary-300",
  borderColor = "primary-300",
}: ChipProps) {
  const baseClasses =
    "rounded-xl disabled:cursor-not-allowed cursor-pointer flex items-center text-label py-[4px]";
  const chipTypeClasses: Record<ChipType, string> = {
    text: "px-[12px]",
    icon: "flex items-center gap-[4px] px-[8px]",
  };
  const clearIconClasses: Record<ClearIcon, string> = {
    on: "gap-[4px]",
    off: "",
  };
  const variantClasses: Record<ChipVariant, string> = {
    filled: `bg-${bgColor} text-${textColor} border border-${borderColor}`,
    outlined: `bg-transparent text-${textColor} border border-${borderColor}`,
    selected: `bg-primary-700 text-white border border-primary-700`,
  };
  const variantClass = variantClasses[variant];
  const chipTypeClass = chipTypeClasses[chipType];
  const clearIconClass = clearIconClasses[clearIcon];
  const fullWidthClass = fullWidth ? "w-full" : "";
  return (
    <button
      className={`${baseClasses} ${variantClass} ${chipTypeClass} ${clearIconClass} ${fullWidthClass}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
      {clearIcon === "on" && <ClearIcon color="black" width={14} height={14} />}
    </button>
  );
}
