export default function DistributionBox({
  title,
  categories,
}: {
  title: string;
  categories: { name: string; groupA: number; groupB: number }[];
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-[12px]">
      <div className="w-full text-start text-gray-700 text-subtitle2">
        {title}
      </div>
      <div className="grid w-full grid-cols-2 gap-[40px]">
        {/* A 그룹 */}
        <div className="flex w-full flex-col items-center justify-center gap-[16px] rounded-xl border border-white bg-[#FDE7FF]/50 px-[22px] py-[30px]">
          {categories.map((category) => (
            <div
              key={`groupA-${category.name}`}
              className="flex w-full items-center justify-between"
            >
              <div className="text-body5 text-gray-950">{category.name}</div>
              <div className="flex items-center justify-center gap-[12px]">
                <div className="flex h-[10px] w-[200px] overflow-hidden rounded-2xl border border-white">
                  <div
                    className="h-full bg-gray-300"
                    style={{ width: `${100 - category.groupA}%` }}
                  />
                  <div
                    className="h-full bg-secondary-300"
                    style={{ width: `${category.groupA}%` }}
                  />
                </div>
                <div className="w-[38px] text-right text-secondary-500 text-subtitle2">
                  {category.groupA}%
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* B 그룹 */}
        <div className="flex w-full flex-col items-center justify-center gap-[16px] rounded-xl border border-white bg-[#DAE7FF]/50 px-[22px] py-[30px]">
          {categories.map((category) => (
            <div
              key={`groupB-${category.name}`}
              className="flex w-full items-center justify-between"
            >
              <div className="text-body5 text-gray-950">{category.name}</div>
              <div className="flex items-center justify-center gap-[12px]">
                <div className="flex h-[10px] w-[200px] overflow-hidden rounded-2xl border border-white">
                  <div
                    className="h-full bg-gray-300"
                    style={{ width: `${100 - category.groupB}%` }}
                  />
                  <div
                    className="h-full bg-tertiary-300"
                    style={{ width: `${category.groupB}%` }}
                  />
                </div>
                <div className="w-[38px] text-right text-subtitle2 text-tertiary-500">
                  {category.groupB}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
