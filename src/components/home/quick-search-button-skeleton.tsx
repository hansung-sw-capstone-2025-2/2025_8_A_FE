export default function QuickSearchButtonSkeleton() {
  return (
    <div className="flex flex-col items-start justify-start gap-[12px] rounded-xl border border-white bg-white/50 px-[16px] py-[16px]">
      <div className="h-[24px] w-[24px] animate-pulse rounded-md bg-gray-300" />
      <div className="h-[20px] w-3/4 animate-pulse rounded-md bg-gray-300" />
      <div className="h-[16px] w-full animate-pulse rounded-md bg-gray-300" />
    </div>
  );
}
