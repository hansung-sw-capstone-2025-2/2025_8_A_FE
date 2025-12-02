import ChevronLeftIcon from "@/assets/icons/ic_chevron_left";
import ChevronRightIcon from "@/assets/icons/ic_chevron_right";

export default function Pagenation({
  page,
  setPage,
  totalPages,
  hasNext,
}: {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  hasNext: boolean;
}) {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setPage(page + 1);
    }
  };

  // 페이지 번호 배열 생성 함수
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      // 5페이지 이하: 1~5까지 표시
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // 5페이지 초과
    if (page <= 3) {
      // 앞쪽: 1 2 3 4 5 ... totalPages
      return [1, 2, 3, 4, 5, null, totalPages];
    } else if (page >= totalPages - 2) {
      // 끝쪽: 1 ... (totalPages-4) (totalPages-3) (totalPages-2) (totalPages-1) totalPages
      return [
        1,
        null,
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      // 중간: 1 ... (page-2) (page-1) page (page+1) (page+2) ... totalPages
      return [
        1,
        null,
        page - 2,
        page - 1,
        page,
        page + 1,
        page + 2,
        null,
        totalPages,
      ];
    }
  };

  const pageNumbers = getPageNumbers();
  const canGoPrev = page > 1;

  return (
    <div className="flex w-full items-center justify-center">
      {/* 왼쪽 화살표 */}
      <div
        className={`flex cursor-pointer items-center justify-center px-[8px] py-[8px] ${
          !canGoPrev ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={handlePrev}
      >
        <ChevronLeftIcon color="#9E9E9E" width={24} height={24} />
      </div>

      {/* 페이지 번호들 */}
      {pageNumbers.map((pageNum, index) => {
        if (pageNum === null) {
          // 생략 기호
          return (
            <div
              key={`ellipsis-${index}`}
              className="flex cursor-default items-center justify-center px-[8px] py-[8px]"
            >
              <div className="px-[8px] text-button-medium text-gray-700">
                ...
              </div>
            </div>
          );
        }

        const isActive = pageNum === page;
        return (
          <div
            key={pageNum}
            className="flex cursor-pointer items-center justify-center px-[8px] py-[8px]"
            onClick={() => handlePageChange(pageNum)}
          >
            <div
              className={`px-[8px] text-button-medium ${
                isActive ? "text-primary-600" : "text-gray-700"
              }`}
            >
              {pageNum}
            </div>
          </div>
        );
      })}

      {/* 오른쪽 화살표 */}
      <div
        className={`flex cursor-pointer items-center justify-center gap-[8px] ${
          !hasNext ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={handleNext}
      >
        <ChevronRightIcon
          width={24}
          height={24}
          color={hasNext ? "#764ED9" : "#9E9E9E"}
        />
      </div>
    </div>
  );
}
