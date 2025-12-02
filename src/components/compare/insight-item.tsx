export default function InsightItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-[8px] rounded-xl border border-white bg-opacity-500 px-[40px] py-[20px]">
      <div className="text-gray-950 text-subtitle1">{title}</div>
      <div className="h-[1px] w-full bg-primary-300" />
      <div className="text-body5 text-gray-700">{description}</div>
    </div>
  );
}
