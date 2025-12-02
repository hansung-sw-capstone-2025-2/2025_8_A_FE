import { useEffect, useRef, useState } from "react";
import Chip from "@/components/chip";

interface FilterSectionProps {
  title: string;
  chips: {
    id: number;
    code: number;
    title: string;
  }[];
  onSelectionChange?: (selectedCodes: number[]) => void;
  reset?: number;
  singleSelect?: boolean;
}

export default function FilterSection({
  title,
  chips,
  onSelectionChange,
  reset = 0, // 필터 초기화 오류로 인해 숫자형식으로 reset 값이 변경되었을 때 초기화 실행
  singleSelect = false,
}: FilterSectionProps) {
  const [selectedChips, setSelectedChips] = useState<number[]>([]);
  const prevResetValueRef = useRef<number | undefined>(reset);
  const onSelectionChangeRef = useRef(onSelectionChange);

  // onSelectionChange를 항상 최신으로 유지
  useEffect(() => {
    onSelectionChangeRef.current = onSelectionChange;
  }, [onSelectionChange]);

  useEffect(() => {
    // reset 값이 변경되었을 때 초기화 실행
    if (reset !== undefined && reset !== prevResetValueRef.current) {
      setSelectedChips([]);
      onSelectionChangeRef.current?.([]);
      prevResetValueRef.current = reset;
    }
  }, [reset]);

  const handleChipClick = (id: number) => {
    let newSelectedChips: number[];

    if (singleSelect) {
      if (selectedChips.includes(id)) {
        newSelectedChips = [];
      } else {
        newSelectedChips = [id];
      }
    } else {
      if (selectedChips.includes(id)) {
        newSelectedChips = selectedChips.filter((chip) => chip !== id);
      } else {
        newSelectedChips = [...selectedChips, id];
      }
    }

    setSelectedChips(newSelectedChips);

    // 선택된 칩들의 code를 배열로 추출
    const selectedCodes = chips
      .filter((chip) => newSelectedChips.includes(chip.id))
      .map((chip) => chip.code);
    onSelectionChange?.(selectedCodes);
  };
  return (
    <div className="flex w-full flex-col items-start justify-center gap-[12px]">
      <div className="text-gray-950 text-subtitle2">{title}</div>
      <div className="flex w-[460px] flex-wrap items-center justify-start gap-[4px]">
        {chips.map((chip) => (
          <Chip
            key={chip.id}
            variant={selectedChips.includes(chip.id) ? "selected" : "outlined"}
            chipType="text"
            clearIcon="off"
            onClick={() => handleChipClick(chip.id)}
          >
            {chip.title}
          </Chip>
        ))}
      </div>
    </div>
  );
}
