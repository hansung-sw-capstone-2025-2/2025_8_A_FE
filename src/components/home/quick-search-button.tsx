import UserGroupIcon from "@/assets/icons/ic_user_group";

interface QuickSearchButtonProps {
  title: string;
  subtitle: string;
  onClick: () => void;
}

export default function QuickSearchButton({
  title,
  subtitle,
  onClick,
}: QuickSearchButtonProps) {
  return (
    <button
      type="button"
      className="flex cursor-pointer flex-col items-start justify-start gap-[12px] rounded-xl border border-white bg-white/50 px-[16px] py-[16px] text-start transition-colors duration-200 hover:bg-primary-100"
      onClick={onClick}
    >
      <UserGroupIcon width={24} height={24} />
      <div className="font-medium text-base">{title}</div>
      <div className="text-[#515151] text-xs">{subtitle}</div>
    </button>
  );
}
