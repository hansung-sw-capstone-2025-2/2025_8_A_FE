import type React from "react";
import SearchIcon from "@/assets/icons/ic_search";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
}

export default function SearchBar({
  placeholder = "검색어를 입력하세요",
  value = "",
  onChange,
}: SearchBarProps) {
  return (
    <div className="flex w-full items-start justify-between rounded-lg border border-white bg-opacity-800 px-[20px] py-[16px]">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent text-body2 text-gray-950 outline-none placeholder:text-gray-600"
      />
      <SearchIcon color="#482A88" width={24} height={24} />
    </div>
  );
}
