import CheckIcon from "@/assets/icons/ic_check";

export default function ListItem({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center gap-[8px]">
      <CheckIcon color="#25A249" width={24} height={24} />
      <div className="text-body4 text-gray-950">{title}</div>
    </div>
  );
}
