import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "@/api/client";
import { getLibraryById } from "@/api/library";
import ChevronLeftIcon from "@/assets/icons/ic_chevron_left";
import Pagenation from "@/components/dashboard/pagenation";
import ResponseTable from "@/components/dashboard/response-table";
import type { DashboardPanel } from "@/types/dashboard_panel";

export default function AllResponses() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardPanel>();
  const [page, setPage] = useState(1);

  const { search_id, question, isLibrary } = location.state as {
    search_id: string;
    question: string;
    isLibrary?: boolean;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLibrary) {
          // 라이브러리 데이터 가져오기
          const response = await getLibraryById(Number(search_id));
          if (response.is_success) {
            const libraryData = response.result;

            // 클라이언트 사이드 페이지네이션
            const pageSize = 20;
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedPanels = libraryData.panels.slice(
              startIndex,
              endIndex
            );

            // DashboardPanel 형식으로 변환
            const dashboardData: DashboardPanel = {
              keys: ["gender"],
              values: paginatedPanels.map((panel) => ({
                respondent_id: panel.panel_id,
                gender: panel.gender,
                age: String(panel.age),
                residence: panel.residence || "-",
                personal_income: "-",
                concordance_rate: "-",
              })) as any,
              page_info: {
                offset: (page - 1) * pageSize,
                limit: pageSize,
                current_page: page,
                current_page_count: paginatedPanels.length,
                total_page_count: Math.ceil(
                  libraryData.panels.length / pageSize
                ),
                total_count: libraryData.panels.length,
                has_next: endIndex < libraryData.panels.length,
                has_previous: page > 1,
              },
            };
            setData(dashboardData);
          }
        } else {
          // 검색 결과 데이터 가져오기
          const response = await apiClient.get(
            `/search/${search_id}/each-responses`,
            {
              params: {
                page,
                size: 20,
              },
            }
          );
          const resultData = response.data.result;
          setData(resultData);
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        setData(undefined);
      }
    };
    fetchData();
  }, [search_id, page, isLibrary]);

  const handlePanelClick = (panelId: string, concordanceRate: string) => {
    navigate(`/panel/${panelId}`, {
      state: {
        question,
        concordanceRate,
      },
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-[40px] px-[80px] pt-[40px] pb-[80px]">
      {/* 상단 헤더 */}
      <div className="flex w-full items-center justify-start gap-[16px]">
        <button
          type="button"
          onClick={handleGoBack}
          className="flex cursor-pointer items-center justify-center rounded-lg p-[8px] hover:bg-gray-100"
        >
          <ChevronLeftIcon width={24} height={24} />
        </button>
        <div className="text-gray-950 text-h5">개별 응답 데이터 전체보기</div>
      </div>

      {/* 검색 질문/라이브러리 정보 */}
      <div className="w-full rounded-2xl bg-opacity-500 px-[40px] py-[24px]">
        <div className="text-body4 text-gray-700">
          {isLibrary ? "라이브러리" : "검색 질문"}
        </div>
        <div className="mt-[8px] text-h5 text-primary-700">{question}</div>
      </div>

      {/* 데이터 테이블 */}
      <div className="flex w-full flex-col items-center justify-center gap-[20px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
        <div className="flex w-full items-center justify-between">
          <div className="text-gray-950 text-h5">
            전체 응답 데이터 ({data?.page_info?.total_count || 0}명)
          </div>
        </div>
        <ResponseTable
          data={data}
          onPanelClick={handlePanelClick}
          isLibrary={isLibrary || false}
        />
        <Pagenation
          page={page}
          setPage={setPage}
          totalPages={data?.page_info?.total_page_count || 1}
          hasNext={data?.page_info?.has_next || false}
        />
      </div>
    </div>
  );
}
