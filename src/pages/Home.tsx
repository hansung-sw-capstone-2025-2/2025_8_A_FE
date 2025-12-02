import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "@/api/client";
import ChevronDownIcon from "@/assets/icons/ic_chevron_down";
import ChevronUpIcon from "@/assets/icons/ic_chevron_up";
import FilterIcon from "@/assets/icons/ic_filter";
import Button from "@/components/button";
import FilterSection from "@/components/home/filter-section";
import QuickSearchButton from "@/components/home/quick-search-button";
import QuickSearchButtonSkeleton from "@/components/home/quick-search-button-skeleton";
import SearchBar from "@/components/search-bar";
import Tooltip from "@/components/tooltip";
import { useLoading } from "@/contexts/LoadingContext";
import { filterSections } from "@/data/filter-sectioins";

interface QuickSearchButton {
  id: number;
  title: string;
  description: string;
}

export default function Home() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showLoading, hideLoading } = useLoading();
  const [searchValue, setSearchValue] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [totalSelectedChips, setTotalSelectedChips] = useState(0);
  const [selectedFilterCodes, setSelectedFilterCodes] = useState<number[][]>(
    new Array(filterSections.length).fill(null).map(() => [])
  );
  const [resetTrigger, setResetTrigger] = useState(0);

  const [searchType, setSearchType] = useState("STRICT");
  const handleSearchTypeChange = (type: string) => {
    setSearchType(type);
  };

  const { data: quickSearchButtons = [], isLoading: isQuickSearchLoading } =
    useQuery<QuickSearchButton[]>({
      queryKey: ["quickSearchButtons"],
      queryFn: async () => {
        const response = await apiClient.get("/search/recommended", {
          skipGlobalLoading: true,
          timeout: 60000,
        });
        return response.data.result.recommendations;
      },
    });

  const handleSectionSelectionChange = (
    sectionIndex: number,
    selectedCodes: number[]
  ) => {
    const newCodes = [...selectedFilterCodes];
    newCodes[sectionIndex] = selectedCodes;
    setSelectedFilterCodes(newCodes);
    setTotalSelectedChips(
      newCodes.reduce((sum, codes) => sum + codes.length, 0)
    );
  };

  const resetFilter = () => {
    setSelectedFilterCodes(
      new Array(filterSections.length).fill(null).map(() => [])
    );
    setTotalSelectedChips(0);
    setResetTrigger((prev) => prev + 1);
  };

  const handleSearch = async () => {
    try {
      showLoading("패널 데이터를 불러오는 중입니다...");

      // 모든 섹션의 선택된 code들을 하나의 배열로 합치기
      const allFilterCodes = selectedFilterCodes.flat();
      const response = await apiClient.post(
        "/search",
        {
          question: searchValue,
          mode: searchType,
          filters: allFilterCodes,
        },
        {
          timeout: 60000 * 5,
          skipGlobalLoading: true,
        }
      );

      hideLoading();

      navigate(`/dashboard/${response.data.result.search_id}`, {
        state: {
          result: response.data.result,
          search_id: response.data.result.search_id,
          question: searchValue,
        },
      });
    } catch {
      hideLoading();
    }
  };

  const handleQuickSearch = async (button: QuickSearchButton) => {
    try {
      showLoading("패널 데이터를 불러오는 중입니다...");

      const response = await apiClient.post(
        `/search/recommended/${button.id}`,
        {},
        {
          timeout: 60000,
          skipGlobalLoading: true,
        }
      );

      hideLoading();

      navigate(`/dashboard/${response.data.result.search_id}`, {
        state: {
          result: response.data.result,
          search_id: response.data.result.search_id,
          question: button.title,
        },
      });
    } catch (error) {
      const axiosError = error as AxiosError<{
        message?: string;
        is_success?: boolean;
        code?: string;
      }>;

      const errorMessage = axiosError.response?.data?.message || "";
      const errorCode = axiosError.response?.data?.code || "";
      const statusCode = axiosError.response?.status;
      const isExpiredError =
        errorMessage.includes("만료") ||
        errorMessage.includes("expired") ||
        errorMessage.includes("서브서버") ||
        errorCode === "COMMON502" ||
        statusCode === 404 ||
        statusCode === 500;

      if (isExpiredError) {
        try {
          const allFilterCodes = selectedFilterCodes.flat();
          const response = await apiClient.post(
            "/search",
            {
              question: button.title,
              mode: searchType || "FLEXIBLE",
              filters: allFilterCodes,
            },
            {
              timeout: 60000 * 5,
              skipGlobalLoading: true,
            }
          );

          hideLoading();

          navigate(`/dashboard/${response.data.result.search_id}`, {
            state: {
              result: response.data.result,
              search_id: response.data.result.search_id,
              question: button.title,
            },
          });

          queryClient.invalidateQueries({
            queryKey: ["quickSearchButtons"],
          });
        } catch {
          hideLoading();
          alert("검색에 실패했습니다. 다시 시도해주세요.");
        }
      } else {
        hideLoading();
        alert("검색에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-[124px]">
      <div className="w-full max-w-[896px]">
        <div className="mb-[63px] text-center text-h2 text-primary-950">
          원하는 패널을 찾아보세요
        </div>
        {/* 검색 영역 */}
        <div className="mb-[40px] flex w-full flex-col items-start justify-center gap-[24px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
          <div className="flex w-full items-center justify-between">
            <div className="text-gray-950 text-subtitle1">
              검색어를 입력하세요
            </div>
            <div className="flex w-fit items-center justify-center gap-[20px]">
              <Tooltip content="필터 조건을 참고하되 의미적 유사성을 우선시하여 더 넓은 범위의 결과를 제공합니다.">
                <div className="flex items-center justify-center gap-[4px]">
                  <input
                    type="radio"
                    name="search-type"
                    id="FLEXIBLE"
                    value="FLEXIBLE"
                    checked={searchType === "FLEXIBLE"}
                    onChange={(e) => handleSearchTypeChange(e.target.value)}
                  />
                  <label
                    htmlFor="FLEXIBLE"
                    className={`cursor-pointer text-subtitle1 ${
                      searchType === "FLEXIBLE" ? "text-black" : "text-gray-600"
                    }`}
                  >
                    유연 모드
                  </label>
                </div>
              </Tooltip>
              <Tooltip content="사용자가 지정한 필터 조건을 정확히 만족하는 패널만을 검색합니다.">
                <div className="flex items-center justify-center gap-[4px]">
                  <input
                    type="radio"
                    name="search-type"
                    id="STRICT"
                    value="STRICT"
                    checked={searchType === "STRICT"}
                    onChange={(e) => handleSearchTypeChange(e.target.value)}
                  />
                  <label
                    htmlFor="STRICT"
                    className={`cursor-pointer text-subtitle1 ${
                      searchType === "STRICT" ? "text-black" : "text-gray-600"
                    }`}
                  >
                    엄격 모드
                  </label>
                </div>
              </Tooltip>
            </div>
          </div>
          <SearchBar
            placeholder="예시 : 20대 남자 100명"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div className="flex w-full items-center justify-between">
            <Button
              variant="icon"
              size="medium"
              bgColor="white"
              textColor="black"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FilterIcon color="black" width={14} height={14} />
              상세필터
              {totalSelectedChips > 0 && (
                <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-primary-700 text-label text-white">
                  {totalSelectedChips}
                </div>
              )}
              {isFilterOpen ? (
                <ChevronUpIcon color="black" width={14} height={14} />
              ) : (
                <ChevronDownIcon color="black" width={14} height={14} />
              )}
            </Button>
            {totalSelectedChips > 0 && (
              <button
                className="cursor-pointer border-none bg-transparent text-button-medium text-tertiary-600 outline-none"
                onClick={resetFilter}
              >
                필터 초기화
              </button>
            )}
          </div>
          {/* 칩 영역 */}
          {isFilterOpen && (
            <div className="w-full">
              <div className="mb-[24px] h-[1px] w-full bg-white" />
              <div className="flex w-full flex-col items-start justify-center gap-[16px]">
                {filterSections.map((section, index) => (
                  <FilterSection
                    key={section.id}
                    title={section.title}
                    chips={section.chips}
                    onSelectionChange={(selectedCodes) =>
                      handleSectionSelectionChange(index, selectedCodes)
                    }
                    reset={resetTrigger}
                    singleSelect={section.singleSelect}
                  />
                ))}
              </div>
            </div>
          )}

          <Button
            variant="filled"
            size="large"
            fullWidth
            onClick={handleSearch}
          >
            검색하기
          </Button>
        </div>
        {/* 빠른 검색 추천 영역 */}
        <div className="flex w-full flex-col items-start justify-center gap-[12px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
          <div className="text-gray-950 text-subtitle1">빠른 검색 추천</div>
          <div className="grid w-full grid-cols-3 gap-[12px]">
            {isQuickSearchLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <QuickSearchButtonSkeleton key={index} />
                ))
              : quickSearchButtons.map((button) => (
                  <QuickSearchButton
                    key={button.id}
                    title={button.title}
                    subtitle={button.description}
                    onClick={() => handleQuickSearch(button)}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
