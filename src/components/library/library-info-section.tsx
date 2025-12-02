interface LibraryInfoSectionProps {
  libraryName: string;
  tags?: string[];
  panelCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function LibraryInfoSection({
  libraryName,
  tags,
  panelCount,
  createdAt,
  updatedAt,
}: LibraryInfoSectionProps) {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-[20px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
      <div className="w-full text-start text-gray-950 text-h4">
        {libraryName}
      </div>
      <div className="flex w-full flex-wrap items-center justify-start gap-[12px]">
        {tags?.map((tag, index) => {
          const colorClass =
            index % 3 === 0
              ? "text-primary-700 bg-primary-100"
              : index % 3 === 1
                ? "text-secondary-700 bg-secondary-100"
                : "text-tertiary-700 bg-tertiary-100";

          return (
            <div
              key={`${tag}-${index}`}
              className={`text-body3 ${colorClass} rounded-lg px-[20px] py-[8px]`}
            >
              {tag}
            </div>
          );
        })}
      </div>
      <div className="w-full text-center text-caption text-gray-700">
        패널 수: {panelCount}명 / 생성일:{" "}
        {new Date(createdAt).toLocaleDateString("ko-KR")} / 수정일:{" "}
        {new Date(updatedAt).toLocaleDateString("ko-KR")}
      </div>
    </div>
  );
}
