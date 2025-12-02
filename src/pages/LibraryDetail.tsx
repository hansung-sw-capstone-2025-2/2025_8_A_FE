import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLibraryById } from "@/api/library";
import ChevronLeftIcon from "@/assets/icons/ic_chevron_left";
import Button from "@/components/button";
import IndividualResponses from "@/components/dashboard/individual-responses";
import LibraryChartSection from "@/components/library/library-chart-section";
import LibraryInfoSection from "@/components/library/library-info-section";
import { useLibraryChartData } from "@/hooks/use-library-chart-data";
import type { DashboardPanel } from "@/types/dashboard_panel";

export default function LibraryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data: libraryData, isLoading } = useQuery({
    queryKey: ["library", id],
    queryFn: async () => {
      if (!id) throw new Error("Library ID is required");
      const response = await getLibraryById(Number(id));
      if (response.is_success) {
        return response.result;
      }
      throw new Error("Failed to fetch library");
    },
    enabled: !!id,
  });

  // 차트 데이터 생성
  const chartData = useLibraryChartData(libraryData?.panels);

  // 패널 데이터를 페이지네이션하여 IndividualResponses에 전달
  const getPaginatedPanelData = (): DashboardPanel | undefined => {
    if (!libraryData?.panels) return undefined;

    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const paginatedPanels = libraryData.panels.slice(startIndex, endIndex);

    return {
      keys: ["gender"],
      values: paginatedPanels.map((panel) => ({
        respondent_id: panel.panel_id,
        gender: panel.gender,
        age: String(panel.age),
        residence: panel.residence || "-",
        personal_income: "-",
        concordance_rate: "-",
        marital_status: panel.marital_status || "-",
        occupation: panel.occupation || "-",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      })) as any,
      page_info: {
        offset: (page - 1) * 10,
        limit: 10,
        current_page: page,
        current_page_count: paginatedPanels.length,
        total_page_count: Math.ceil(libraryData.panels.length / 10),
        total_count: libraryData.panels.length,
        has_next: endIndex < libraryData.panels.length,
        has_previous: page > 1,
      },
    };
  };

  const handlePanelClick = (panelId: string) => {
    navigate(`/panel/${panelId}`, {
      state: {
        question: libraryData?.library_name || "",
        concordanceRate: "-",
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (!libraryData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-500">라이브러리를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 pt-[40px] pb-[80px]">
      <div className="flex w-full max-w-[1280px] flex-col gap-[40px]">
        {/* 뒤로가기 버튼 */}
        <div className="flex w-full items-center justify-start">
          <Button
            variant="icon"
            size="small"
            onClick={() => navigate("/home/library")}
          >
            <ChevronLeftIcon color="white" width={20} height={20} />
            <span>목록으로</span>
          </Button>
        </div>

        {/* 상단 영역 - 라이브러리 정보 */}
        <LibraryInfoSection
          libraryName={libraryData.library_name}
          tags={libraryData.tags}
          panelCount={libraryData.panel_count}
          createdAt={libraryData.created_at}
          updatedAt={libraryData.updated_at}
        />

        {/* 차트 영역 */}
        <LibraryChartSection chartData={chartData} />

        {/* 하단 영역 - 개별 응답자 테이블 */}
        <IndividualResponses
          data={getPaginatedPanelData()}
          page={page}
          setPage={setPage}
          onPanelClick={handlePanelClick}
          searchId={String(id)}
          question={libraryData.library_name}
          isLibrary={true}
        />
      </div>
    </div>
  );
}
