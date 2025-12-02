export default function BasicInfo({
  title,
  groupA,
  groupB,
}: {
  title: string;
  groupA: string;
  groupB: string;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-[16px] rounded-xl border border-white bg-opacity-500 py-[20px]">
      <div className="text-gray-700 text-subtitle2">{title}</div>
      <div className="text-secondary-500 text-subtitle1">{groupA}</div>
      <div className="text-subtitle1 text-tertiary-500">{groupB}</div>
    </div>
  );
}
