export default function InfoItem({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex w-full items-center justify-start gap-[20px] rounded-xl border border-white bg-opacity-300 px-[20px] py-[16px]">
      <div className="w-[160px] text-start text-gray-700 text-subtitle2">
        {title}
      </div>
      <div className="flex flex-1 flex-wrap text-start text-gray-950 text-subtitle2">
        {value}
      </div>
    </div>
  );
}
