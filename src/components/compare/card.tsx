import Chip from "@/components/chip";

export default function CompareCard({
  title,
  description,
  tags,
  filters,
  group,
}: {
  title: string;
  description: string;
  tags: string[];
  filters: string[];
  group: "A" | "B";
}) {
  return (
    <div
      className={`flex flex-col items-start justify-start gap-[16px] rounded-2xl border border-white px-[40px] py-[32px] ${group === "A" ? "bg-[#FDE7FF]/50" : "bg-[#DAE7FF]/50"}`}
    >
      <div
        className={`flex h-[48px] w-[48px] items-center justify-center rounded-xl text-h4 text-white ${group === "A" ? "bg-secondary-600" : "bg-tertiary-600"}`}
      >
        {group}
      </div>
      <div className="text-gray-950 text-h6">{title}</div>
      <div className="text-gray-700 text-subtitle2">{description}</div>
      <div className="flex items-center justify-start gap-[8px]">
        {tags.map((tag) => (
          <Chip
            key={tag}
            variant="filled"
            chipType="text"
            bgColor={group === "A" ? "secondary-200" : "tertiary-200"}
            textColor="gray-950"
            borderColor={group === "A" ? "secondary-200" : "tertiary-200"}
          >
            {tag}
          </Chip>
        ))}
      </div>
      <div className="flex flex-col items-start justify-center gap-[4px]">
        <div className="text-gray-700 text-label">적용된 필터</div>
        <div className="flex items-center justify-start gap-[8px]">
          {filters.map((filter) => (
            <Chip
              key={filter}
              variant="outlined"
              chipType="text"
              textColor="gray-950"
              borderColor={group === "A" ? "secondary-200" : "tertiary-200"}
            >
              {filter}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
