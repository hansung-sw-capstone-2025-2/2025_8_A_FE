import { useNavigate } from "react-router-dom";
import Button from "@/components/button";
import Chip from "@/components/chip";

interface CardProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  filters: string[];
  onSelect: (id: number) => void;
  onDeselect: (id: number) => void;
  selectedCards: number[];
}
export default function Card({
  id,
  title,
  description,
  tags,
  filters,
  onSelect,
  onDeselect,
  selectedCards,
}: CardProps) {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/home/library/${id}`);
  };

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-[16px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
      <input
        type="checkbox"
        id={`card-${id}`}
        className="h-[16px] w-[16px] rounded-sm border border-gray-900 bg-white"
        onChange={() => {
          if (selectedCards.includes(id)) {
            onDeselect(id);
          } else {
            onSelect(id);
          }
        }}
      />
      <div className="text-gray-950 text-h6">{title}</div>
      <div className="text-gray-700 text-subtitle2">{description}</div>
      <div className="flex items-center justify-start gap-[8px]">
        {tags.map((tag) => (
          <Chip key={tag} variant="filled" chipType="text">
            {tag}
          </Chip>
        ))}
      </div>
      <div className="flex flex-col items-start justify-center gap-[4px]">
        <div className="flex items-center justify-start gap-[8px]">
          {filters.map((filter) => (
            <Chip key={filter} variant="outlined" chipType="text">
              {filter}
            </Chip>
          ))}
        </div>
      </div>
      <Button variant="filled" size="small" fullWidth onClick={handleViewClick}>
        보기
      </Button>
    </div>
  );
}
