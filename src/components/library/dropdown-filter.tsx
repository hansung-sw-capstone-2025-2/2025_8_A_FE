export default function DropdownFilter({
  options,
  open,
  setSelectedFilter,
}: {
  options: string[];
  open: boolean;
  setSelectedFilter: (filter: string) => void;
}) {
  return (
    <ul
      className={`absolute top-full right-0 z-20 mt-[12px] inline-block min-w-[180px] whitespace-nowrap rounded-lg bg-white py-[8px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] ${
        open ? "block" : "hidden"
      }`}
    >
      {options.map((option) => (
        <li
          key={option}
          onClick={() => {
            setSelectedFilter(option);
          }}
          className="flex cursor-pointer items-center gap-[8px] px-[16px] py-[12px] text-body4 text-gray-950 hover:bg-gray-300"
        >
          {option}
        </li>
      ))}
    </ul>
  );
}
