import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLibraries } from "@/api/library";
import BarChartIcon from "@/assets/icons/ic_bar_chart";
import ChevronDownIcon from "@/assets/icons/ic_chevron_down";
import TrashIcon from "@/assets/icons/ic_trash";
import Button from "@/components/button";
import Card from "@/components/library/card";
import DropdownFilter from "@/components/library/dropdown-filter";
import Modal from "@/components/modal";

const filterOptions = [
  {
    id: 1,
    title: "모든 기간",
    options: ["모든 기간", "최근 7일", "최근 30일", "최근 3개월"],
  },
  {
    id: 2,
    title: "날짜순",
    options: ["날짜순", "응답자수 순", "제목순"],
  },
];

export default function Library() {
  const navigate = useNavigate();
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState<Record<number, boolean>>({});
  const [selectedFilters, setSelectedFilters] = useState<
    Record<number, string>
  >(
    filterOptions.reduce(
      (acc, filter) => {
        acc[filter.id] = filter.title;
        return acc;
      },
      {} as Record<number, string>
    )
  );

  const { data, isLoading } = useQuery({
    queryKey: ["libraries"],
    queryFn: async () => {
      const response = await getLibraries();
      if (response.is_success) {
        return response.result.libraries;
      }
      return [];
    },
  });

  const libraries = data ?? [];

  const handleCardSelect = (id: number) => {
    setSelectedCards((prev) => [...prev, id]);
  };
  const handleCardDeselect = (id: number) => {
    setSelectedCards((prev) => prev.filter((card) => card !== id));
  };

  const handleFilterToggle = (filterId: number) => {
    setOpenFilters((prev) => ({
      ...prev,
      [filterId]: !prev[filterId],
    }));
  };

  const handleFilterSelect = (filterId: number, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));
    setOpenFilters((prev) => ({
      ...prev,
      [filterId]: false,
    }));
  };

  // 필터링 및 정렬된 라이브러리 목록
  const filteredAndSortedLibraries = libraries
    .filter((library) => {
      const period = selectedFilters[1];
      if (period === "모든 기간") return true;

      const now = new Date();
      const createdAt = new Date(library.created_at);

      let daysAgo = 0;
      if (period === "최근 7일") daysAgo = 7;
      else if (period === "최근 30일") daysAgo = 30;
      else if (period === "최근 3개월") daysAgo = 90;

      const filterDate = new Date(
        now.getTime() - daysAgo * 24 * 60 * 60 * 1000
      );
      return createdAt >= filterDate;
    })
    .sort((a, b) => {
      const sortType = selectedFilters[2];

      if (sortType === "날짜순") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      } else if (sortType === "응답자수 순") {
        return b.panel_count - a.panel_count;
      } else if (sortType === "제목순") {
        return a.library_name.localeCompare(b.library_name);
      }

      return 0;
    });

  // 비교분석 disabled 처리
  const isCompareDisabled = selectedCards.length !== 2;
  const isDeleteDisabled = selectedCards.length < 1;

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    console.log("삭제할 항목:", selectedCards);
    setSelectedCards([]);
  };

  const handleCompare = () => {
    if (selectedCards.length === 2) {
      navigate("/home/library/compare", {
        state: {
          libraryId1: selectedCards[0],
          libraryId2: selectedCards[1],
        },
      });
    }
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          title="항목 삭제"
          description="선택된 항목을 삭제하시겠습니까?"
          type="delete"
          onDelete={handleDelete}
        />
      )}
      <div className="flex min-h-screen flex-col items-center justify-start px-6 pt-[40px] pb-[80px]">
        <div className="flex w-full max-w-[1054px] flex-col gap-[40px]">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center justify-center gap-[16px]">
              {filterOptions.map((filter) => (
                <div key={filter.id} className="relative">
                  <Button
                    variant="outlined"
                    size="medium"
                    onClick={() => handleFilterToggle(filter.id)}
                  >
                    {selectedFilters[filter.id]}
                    <ChevronDownIcon color="black" width={14} height={14} />
                  </Button>
                  {openFilters[filter.id] && (
                    <DropdownFilter
                      options={filter.options}
                      open={openFilters[filter.id]}
                      setSelectedFilter={(value) =>
                        handleFilterSelect(filter.id, value)
                      }
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-[12px]">
              <div className="text-body5 text-gray-700">
                선택된 항목: {selectedCards.length}개
              </div>
              <Button
                variant="icon"
                size="small"
                disabled={isCompareDisabled}
                bgColor={isCompareDisabled ? "gray-300" : "success-ctr"}
                textColor={isCompareDisabled ? "gray-400" : "success-on-ctr"}
                onClick={handleCompare}
              >
                <BarChartIcon
                  color={isCompareDisabled ? "#BDBDBD" : "#14632B"}
                  width={14}
                  height={14}
                />
                <div>비교분석</div>
              </Button>
              <Button
                variant="icon"
                size="small"
                disabled={isDeleteDisabled}
                bgColor={isDeleteDisabled ? "gray-300" : "error-ctr"}
                textColor={isDeleteDisabled ? "gray-400" : "error-on-ctr"}
                onClick={handleModalOpen}
              >
                <TrashIcon
                  color={isDeleteDisabled ? "#BDBDBD" : "#8C1D18"}
                  width={14}
                  height={14}
                />
                <div>삭제</div>
              </Button>
            </div>
          </div>
          <div className="flex w-full items-center justify-start text-gray-950 text-h5">
            저장된 분석 항목 (
            {isLoading ? "..." : filteredAndSortedLibraries.length}개)
          </div>
          {isLoading ? (
            <div className="flex w-full items-center justify-center py-[100px] text-gray-500">
              로딩 중...
            </div>
          ) : filteredAndSortedLibraries.length === 0 ? (
            <div className="flex w-full items-center justify-center py-[100px] text-gray-500">
              {libraries.length === 0
                ? "저장된 라이브러리가 없습니다."
                : "필터 조건에 맞는 라이브러리가 없습니다."}
            </div>
          ) : (
            <div className="grid w-full grid-cols-2 gap-x-[32px] gap-y-[40px]">
              {filteredAndSortedLibraries.map((library) => (
                <Card
                  key={library.library_id}
                  id={library.library_id}
                  title={library.library_name}
                  description={`패널 수: ${library.panel_count}개`}
                  tags={library.tags}
                  filters={[
                    `생성일: ${new Date(library.created_at).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\. /g, "/").replace(".", "")}`,
                  ]}
                  onSelect={handleCardSelect}
                  onDeselect={handleCardDeselect}
                  selectedCards={selectedCards}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
