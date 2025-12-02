import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "@/api/client";
import BestMatchProfile from "@/components/dashboard/best-match-profile";
import ColumnChartComponent from "@/components/dashboard/column-chart";
import DonutChartComponent from "@/components/dashboard/donut-chart";
import IndividualResponses from "@/components/dashboard/individual-responses";
import LineChartComponent from "@/components/dashboard/line-chart";
import MapChartComponent from "@/components/dashboard/map-chart";
import PieChartComponent from "@/components/dashboard/pie-chart";
import SemiCirclePieChartComponent from "@/components/dashboard/semi-circle-pie-chart";
import StackedBarChartComponent from "@/components/dashboard/stacked-bar-chart";
import { useDashboard } from "@/contexts/DashboardContext";
import type { DashboardPanel } from "@/types/dashboard_panel";
import type { DashboardResult } from "@/types/dashboard_result";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardPanel>();
  const [page, setPage] = useState(1);
  const { setDashboardData } = useDashboard();

  // location.state에서 검색 결과 데이터 가져오기
  const stateData = location.state as DashboardResult | null;
  const { result, search_id, question } = stateData || {
    result: null,
    search_id: null,
    question: "",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (search_id) {
          // 검색 결과 데이터 로드
          const response = await apiClient.get(
            `/search/${search_id}/each-responses`,
            {
              params: {
                page,
                size: 10,
              },
            }
          );
          const resultData = response.data.result;
          setData(resultData);

          // Context에 dashboard 데이터 설정
          if (resultData?.page_info?.total_count) {
            setDashboardData(search_id, resultData.page_info.total_count);
          }
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        setData(undefined);
      }
    };
    fetchData();
  }, [search_id, page, setDashboardData]);

  const handlePanelClick = (panelId: string, concordanceRate: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/panel/${panelId}`, {
      state: {
        question,
        concordanceRate,
      },
    });
  };

  // console.log(data);
  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 pt-[40px] pb-[80px]">
      <div className="flex w-full max-w-[1280px] flex-col gap-[40px]">
        {/* 상단 영역 */}
        <div className="grid w-full grid-cols-[54%_1fr] items-stretch gap-[20px]">
          {/* 왼쪽 */}
          <div className="flex h-full w-full flex-col items-start justify-between rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
            <div className="flex w-full flex-col items-center justify-center gap-[48px]">
              <div className="w-full text-start text-gray-950 text-h4">
                {question}
              </div>
              {result?.main_chart &&
                (() => {
                  const chart = result.main_chart;
                  switch (chart.chart_type) {
                    case "map":
                      return (
                        <MapChartComponent
                          data={chart.data}
                          title={chart.title}
                          reasoning={chart.reasoning}
                        />
                      );
                    case "donut":
                      return (
                        <DonutChartComponent
                          data={chart.data}
                          title={chart.title}
                          reasoning={chart.reasoning}
                        />
                      );
                    case "pie":
                      return (
                        <PieChartComponent
                          data={chart.data.map((d) => ({
                            label: d.category || "",
                            value: d.value,
                          }))}
                          title={chart.title}
                          reasoning={chart.reasoning}
                        />
                      );
                    case "semi_circle_pie":
                      return (
                        <SemiCirclePieChartComponent
                          data={chart.data}
                          title={chart.title}
                          reasoning={chart.reasoning}
                        />
                      );
                    case "column":
                    case "bar":
                      return (
                        <ColumnChartComponent
                          data={chart.data.map((d) => ({
                            label: d.category || "",
                            value: d.value,
                          }))}
                          title={chart.title}
                          reasoning={chart.reasoning}
                        />
                      );
                    case "stacked_bar":
                      return (
                        <StackedBarChartComponent
                          data={chart.data}
                          title={chart.title}
                          reasoning={chart.reasoning}
                        />
                      );
                    default:
                      return null;
                  }
                })()}
            </div>
            <div className="flex w-full flex-col items-start justify-center gap-[16px]">
              <div className="w-full text-center text-caption text-gray-700">
                표본 수: {result?.summary?.total_respondents}명 / 데이터 수집일:{" "}
                {result?.summary?.data_capture_date} / 신뢰도:{" "}
                {result?.summary?.confidence_level || "-"}%
              </div>
            </div>
          </div>
          {/* 오른쪽 */}
          {data?.values?.[0] && (
            <BestMatchProfile
              respondentId={data.values[0].respondent_id}
              concordanceRate={data.values[0].concordance_rate}
              gender={data.values[0].gender}
              age={data.values[0].age}
              residence={data.values[0].residence}
              personalIncome={data.values[0].personal_income}
              onViewDetails={() =>
                handlePanelClick(
                  data.values[0].respondent_id,
                  data.values[0].concordance_rate
                )
              }
            />
          )}
          {/* <div className="flex h-full w-full flex-col items-start justify-center gap-[28px]">
             {!isLibrary && (
              <div className="flex w-full flex-col items-start justify-center gap-[16px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
                <div className="w-full text-start text-gray-950 text-h5">
                  검색 결과 내 재검색
                </div>
                <SearchBar
                  placeholder={question}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            )}
            <div className="flex w-full flex-col items-start justify-center gap-[16px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
              <div className="w-full text-start text-gray-950 text-h5">
                {isLibrary ? "라이브러리 태그" : "검색 조건 및 필터"}
              </div>
              {isLibrary
                ? libraryData?.tags?.map((tag, index) => {
                    const colorClass =
                      index % 3 === 0
                        ? "text-primary-700 bg-primary-100"
                        : index % 3 === 1
                          ? "text-secondary-700 bg-secondary-100"
                          : "text-tertiary-700 bg-tertiary-100";

                    return (
                      <div
                        key={`${tag}-${index}`}
                        className={`text-body3 ${colorClass} w-full rounded-lg px-[20px] py-[8px] text-start`}
                      >
                        {tag}
                      </div>
                    );
                  })
                : result?.applied_filters_summary?.map(
                    (
                      filter: { key: string; display_value: string },
                      index: number
                    ) => {
                      const colorClass =
                        index % 3 === 0
                          ? "text-primary-700 bg-primary-100"
                          : index % 3 === 1
                            ? "text-secondary-700 bg-secondary-100"
                            : "text-tertiary-700 bg-tertiary-100";

                      return (
                        <div
                          key={`${filter.key}-${index}`}
                          className={`text-body3 ${colorClass} w-full rounded-lg px-[20px] py-[8px] text-start`}
                        >
                          {filter.key}: {filter.display_value}
                        </div>
                      );
                    }
                  )}
              {!isLibrary && (
                <div className="flex w-full cursor-pointer items-center justify-center gap-[8px] rounded-lg bg-gray-200 px-[20px] py-[12px] text-body3 text-gray-950">
                  <PlusIcon color="black" width={20} height={21} />
                  조건 추가
                </div>
              )}
            </div>
          </div> */}
        </div>
        {/* 중간 영역 */}
        <div className="flex w-full flex-col items-start justify-center gap-[20px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
          <div className="w-full text-start text-gray-950 text-h4">
            응답자 분포
          </div>
          {/* <div className="flex w-full items-center justify-start gap-[20px] border-gray-500 border-b-[0.5px]">
            <div
              className={`text-body5 ${
                mode === "profile"
                  ? "border-tertiary-500 border-b text-tertiary-500"
                  : "text-gray-700"
              } cursor-pointer py-[5px]`}
              onClick={() => handleMode("profile")}
            >
              응답자 전체 프로필
            </div>
            <div
              className={`text-body5 ${
                mode === "history"
                  ? "border-tertiary-500 border-b text-tertiary-500"
                  : "text-gray-700"
              } cursor-pointer py-[5px]`}
              onClick={() => handleMode("history")}
            >
              교차 분석 도구
            </div>
          </div> */}
          <div className="flex w-full justify-center gap-12 overflow-x-hidden align-center">
            {result?.sub_charts?.map((chart, index) => {
              const key = `${chart.metric}-${index}`;
              switch (chart.chart_type) {
                case "map":
                  return (
                    <div key={key} className="w-[480px]">
                      <MapChartComponent
                        data={chart.data}
                        title={chart.title}
                        reasoning={chart.reasoning}
                      />
                    </div>
                  );
                case "donut":
                  return (
                    <div key={key} className="w-[480px]">
                      <DonutChartComponent
                        data={chart.data}
                        title={chart.title}
                        reasoning={chart.reasoning}
                      />
                    </div>
                  );
                case "pie":
                  return (
                    <div key={key} className="w-[480px]">
                      <PieChartComponent
                        data={chart.data.map((d) => ({
                          label: d.category || "",
                          value: d.value,
                        }))}
                        title={chart.title}
                        reasoning={chart.reasoning}
                      />
                    </div>
                  );
                case "semi_circle_pie":
                  return (
                    <div key={key} className="w-[480px]">
                      <SemiCirclePieChartComponent
                        data={chart.data}
                        title={chart.title}
                        reasoning={chart.reasoning}
                      />
                    </div>
                  );
                case "column":
                case "bar":
                  return (
                    <div key={key} className="w-[480px]">
                      <ColumnChartComponent
                        data={chart.data.map((d) => ({
                          label: d.category || "",
                          value: d.value,
                        }))}
                        title={chart.title}
                        reasoning={chart.reasoning}
                      />
                    </div>
                  );
                case "stacked_bar":
                  return (
                    <div key={key} className="w-[480px]">
                      <StackedBarChartComponent
                        data={chart.data}
                        title={chart.title}
                        reasoning={chart.reasoning}
                      />
                    </div>
                  );
                case "line":
                  return (
                    <div key={key} className="w-[480px]">
                      <LineChartComponent
                        data={chart.data.map((d) => ({
                          label: d.category || "",
                          value: d.value,
                        }))}
                        title={chart.title}
                        reasoning={chart.reasoning}
                      />
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
        {/* 하단 영역 */}
        <IndividualResponses
          data={data}
          page={page}
          setPage={setPage}
          onPanelClick={handlePanelClick}
          searchId={search_id || ""}
          question={question}
          isLibrary={false}
        />
      </div>
    </div>
  );
}
