import { useNavigate } from "react-router-dom";
import Pagenation from "@/components/dashboard/pagenation";
import ResponseTable from "@/components/dashboard/response-table";
import type { DashboardPanel } from "@/types/dashboard_panel";

interface IndividualResponsesProps {
  data: DashboardPanel | undefined;
  page: number;
  setPage: (page: number) => void;
  onPanelClick: (panelId: string, concordanceRate: string) => void;
  searchId: string;
  question: string;
  isLibrary?: boolean;
}

export default function IndividualResponses({
  data,
  page,
  setPage,
  onPanelClick,
  searchId,
  question,
  isLibrary = false,
}: IndividualResponsesProps) {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/dashboard/all-responses", {
      state: {
        search_id: searchId,
        question,
        isLibrary,
      },
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-[20px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
      <div className="flex w-full items-center justify-between">
        <p className="text-gray-950 text-h4">개별 응답 데이터</p>
        <button
          type="button"
          onClick={handleViewAll}
          className="cursor-pointer text-button-medium text-tertiary-500 hover:text-tertiary-600"
        >
          전체보기
        </button>
      </div>
      <ResponseTable
        data={data}
        onPanelClick={onPanelClick}
        isLibrary={isLibrary}
      />
      <Pagenation
        page={page}
        setPage={setPage}
        totalPages={data?.page_info?.total_page_count || 1}
        hasNext={data?.page_info?.has_next || false}
      />
    </div>
  );
}
