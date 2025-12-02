import { useEffect, useRef, useState } from "react";
import ChevronDownIcon from "@/assets/icons/ic_chevron_down";

export default function DropdownField({
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  options: string[];
  id: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [currentValue, setCurrentValue] = useState(value);
  const [showOptions, setShowOptions] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    }
    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  // 외부 value 변경 시 내부 표시값 동기화
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <div className="flex w-full flex-col gap-[8px]">
      <div className="w-full text-left text-body5 text-primary-900">
        {label}
      </div>
      <div className="relative" ref={selectRef}>
        <div
          onClick={() => setShowOptions((prev) => !prev)}
          className={`flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-500 bg-white px-[16px] py-[12px] text-body4 text-gray-500 focus:outline-none ${
            currentValue.length === 0 ? "text-gray-500" : "text-gray-950"
          }`}
        >
          {currentValue.length === 0 ? placeholder : currentValue}
          <ChevronDownIcon color="#757575" width={24} height={24} />
        </div>
        <ul
          className={`${
            showOptions ? "block" : "hidden"
          } custom-scrollbar absolute left-0 z-10 mt-[8px] h-[240px] w-full overflow-y-scroll rounded-lg bg-white py-[8px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]`}
        >
          {options.map((option, index) => (
            <li
              key={index}
              value={option}
              onClick={() => {
                setCurrentValue(option);
                onChange(option);
                setShowOptions(false);
              }}
              className="w-full cursor-pointer px-[16px] py-[12px] text-body4 text-gray-950 hover:bg-gray-300"
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
