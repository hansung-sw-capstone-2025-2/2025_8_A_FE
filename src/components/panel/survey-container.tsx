import { useEffect, useRef, useState } from "react";
import Chip from "@/components/chip";
import BasicInfo from "./basic-info";
import InfoItem from "./info-item";
import TextWithIcon from "./text-with-icon";
import Title from "./title";

type SurveyContainerType = "list" | "icon-list" | "chip" | "title-value";

type ListItem = {
  title: string;
  value: string;
};

type IconListItem = {
  text: string;
  icon: React.ReactNode;
};

type ChipGroupItem = {
  title: string;
  chips: string[];
  icon?: React.ReactNode;
};

export default function SurveyContainer({
  icon,
  title,
  data,
  type = "title-value",
}: {
  icon: React.ReactNode;
  title: string;
  data:
    | Record<string, string>
    | string[]
    | ListItem[]
    | IconListItem[]
    | ChipGroupItem[];
  type?: SurveyContainerType;
}) {
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(new Set());
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButtons, setShowMoreButtons] = useState<Set<number>>(
    new Set()
  );
  const containerRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // 높이 측정
  useEffect(() => {
    const checkHeights = () => {
      containerRefs.current.forEach((el, index) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const lineHeight = 32; // 칩의 높이 + gap
          const maxHeight = lineHeight * 2; // 두 줄

          if (rect.height > maxHeight && !expandedGroups.has(index)) {
            setShowMoreButtons((prev) => new Set(prev).add(index));
          } else {
            setShowMoreButtons((prev) => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          }
        }
      });
    };

    // 컴포넌트 마운트 후 한 번만 실행
    const timer = setTimeout(checkHeights, 100);
    return () => clearTimeout(timer);
  }, [expandedGroups]);

  const renderContent = () => {
    switch (type) {
      case "list":
        return (
          <div className="flex w-full flex-col items-start justify-center gap-[12px]">
            {(data as ListItem[]).map((item, index) => (
              <BasicInfo key={index} title={item.title} value={item.value} />
            ))}
          </div>
        );

      case "icon-list":
        return (
          <div className="flex w-full flex-col items-start justify-center gap-[12px]">
            {(data as IconListItem[]).map((item, index) => (
              <TextWithIcon
                key={index}
                type="detail"
                icon={item.icon}
                title={item.text}
              />
            ))}
          </div>
        );

      case "chip":
        // 소주제가 있는 경우
        if (
          Array.isArray(data) &&
          data.length > 0 &&
          typeof data[0] === "object" &&
          "chips" in data[0]
        ) {
          return (
            <div className="flex w-full flex-col items-start justify-center gap-[32px]">
              {(data as ChipGroupItem[]).map((group, index) => {
                const isExpanded = expandedGroups.has(index);
                const showMore = showMoreButtons.has(index);

                // 두 줄을 넘으면 "더보기" 버튼 표시
                const allChips = group.chips;
                const shouldShowMore = !isExpanded && showMore;

                return (
                  <div
                    key={index}
                    className="flex w-full flex-col items-start justify-center gap-[12px]"
                  >
                    <TextWithIcon
                      type="detail"
                      icon={group.icon || icon}
                      title={group.title}
                    />
                    <div
                      ref={(el) => {
                        if (el) {
                          containerRefs.current.set(index, el);
                        }
                      }}
                      className="flex w-full flex-wrap items-center justify-start gap-[12px]"
                    >
                      {(shouldShowMore ? allChips.slice(0, 6) : allChips).map(
                        (chip, chipIndex) => (
                          <Chip
                            key={chipIndex}
                            variant="outlined"
                            chipType="text"
                          >
                            {chip}
                          </Chip>
                        )
                      )}
                      {shouldShowMore && (
                        <Chip
                          variant="filled"
                          chipType="text"
                          onClick={() => {
                            const newExpanded = new Set(expandedGroups);
                            newExpanded.add(index);
                            setExpandedGroups(newExpanded);
                          }}
                        >
                          더보기
                        </Chip>
                      )}
                      {isExpanded && (
                        <Chip
                          variant="filled"
                          chipType="text"
                          onClick={() => {
                            const newExpanded = new Set(expandedGroups);
                            newExpanded.delete(index);
                            setExpandedGroups(newExpanded);
                          }}
                        >
                          접기
                        </Chip>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }
        // 소주제가 없는 경우
        {
          const allItems = data as string[];
          const shouldShowMore = !isExpanded && allItems.length > 8;

          return (
            <div className="flex w-full flex-wrap items-center justify-start gap-[12px]">
              {(shouldShowMore ? allItems.slice(0, 8) : allItems).map(
                (item, index) => (
                  <Chip key={index} variant="outlined" chipType="text">
                    {item}
                  </Chip>
                )
              )}
              {shouldShowMore && (
                <Chip
                  variant="filled"
                  chipType="text"
                  onClick={() => setIsExpanded(true)}
                >
                  더보기
                </Chip>
              )}
              {isExpanded && (
                <Chip
                  variant="filled"
                  chipType="text"
                  onClick={() => setIsExpanded(false)}
                >
                  접기
                </Chip>
              )}
            </div>
          );
        }

      case "title-value":
      default:
        return (
          <div className="grid w-full grid-cols-2 items-start justify-center gap-x-[20px] gap-y-[16px]">
            {Object.entries(data as Record<string, string>).map(
              ([key, value]) => (
                <InfoItem key={key} title={key} value={value} />
              )
            )}
          </div>
        );
    }
  };

  return (
    <div className="flex w-full flex-col items-start justify-center gap-[20px] rounded-xl border border-white bg-opacity-300 px-[40px] py-[32px]">
      <Title title={title} icon={icon} />
      {renderContent()}
    </div>
  );
}
