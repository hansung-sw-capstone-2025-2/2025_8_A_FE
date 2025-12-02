import MyPageIcon from "@/assets/icons/ic_mypage";
import type { DashboardPanel } from "@/types/dashboard_panel";
import { truncateBeforeParenthesis } from "@/utils/text";

interface ResponseTableProps {
  data: DashboardPanel | undefined;
  onPanelClick: (panelId: string, concordanceRate: string) => void;
  isLibrary?: boolean;
}

export default function ResponseTable({
  data,
  onPanelClick,
  isLibrary = false,
}: ResponseTableProps) {
  return (
    <table className="w-full table-fixed text-left">
      <thead>
        <tr className="h-12 border border-gray-300 bg-primary-200 text-black text-subtitle1">
          <th className="w-[220px] px-3">응답자ID</th>
          <th className="px-3">성별</th>
          <th className="px-3">나이</th>
          {isLibrary && <th className="px-3">결혼상태</th>}
          {!isLibrary && <th className="px-3">거주지</th>}
          {/* <th className="px-3">월소득</th> */}
          {isLibrary && <th className="px-3">직업</th>}
          {!isLibrary && <th className="px-3">일치율</th>}
        </tr>
      </thead>
      <tbody>
        {data?.values.map((item) => {
          const concordancePercent =
            item.concordance_rate === "-"
              ? "-"
              : `${Math.round(Number(item.concordance_rate) * 100)}%`;

          return (
            <tr
              key={item.respondent_id}
              className="h-12 cursor-pointer border border-gray-300 bg-white text-body4 text-gray-950 transition-colors hover:bg-primary-50"
              onClick={() =>
                onPanelClick(item.respondent_id, concordancePercent)
              }
            >
              <td className="px-3 align-middle">
                <div className="flex items-center justify-start gap-[8px]">
                  <MyPageIcon width={32} height={32} />
                  <div className="text-primary-900 text-subtitle2">
                    {item.respondent_id}
                  </div>
                </div>
              </td>
              <td className="px-3">
                {item.gender === "FEMALE"
                  ? "여자"
                  : item.gender === "MALE"
                    ? "남자"
                    : item.gender}
              </td>
              <td className="px-3">{item.age}</td>
              {!isLibrary && <td className="px-3">{item.residence}</td>}
              {isLibrary && (
                <td className="px-3">{item.marital_status || "-"}</td>
              )}
              {/* <td className="px-3">{item.personal_income}</td> */}
              {isLibrary && (
                <td className="px-3">
                  {item.occupation
                    ? truncateBeforeParenthesis(item.occupation)
                    : "-"}
                </td>
              )}
              {!isLibrary && <td className="px-3">{concordancePercent}</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
