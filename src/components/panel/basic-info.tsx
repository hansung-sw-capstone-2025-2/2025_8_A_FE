export default function BasicInfo({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex w-full items-center justify-between gap-[8px] border-gray-300 border-b px-[4px] py-[12px]">
      <div className="text-gray-700 text-subtitle1">{title}</div>
      <div className="text-body4 text-gray-950">{value}</div>
    </div>
  );
}
