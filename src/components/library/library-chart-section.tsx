import { useState } from "react";
import Button from "@/components/button";
import ColumnChartComponent from "@/components/dashboard/column-chart";
import DonutChartComponent from "@/components/dashboard/donut-chart";
import MapChartComponent from "@/components/dashboard/map-chart";

interface ChartDataPoint {
  category: string;
  value: number;
  male: number | null;
  female: number | null;
  id: string | null;
  name: string | null;
  male_max: number | null;
  female_max: number | null;
}

interface ColumnDataPoint {
  label: string;
  value: number;
}

interface LibraryChartData {
  gender: ChartDataPoint[];
  ageGroup: ChartDataPoint[];
  ageRange: ColumnDataPoint[];
  region: ChartDataPoint[];
  maritalStatus: ChartDataPoint[];
  occupation: ColumnDataPoint[];
  childrenCount: ColumnDataPoint[];
}

interface LibraryChartSectionProps {
  chartData: LibraryChartData | null;
}

export default function LibraryChartSection({
  chartData,
}: LibraryChartSectionProps) {
  const [selectedCharts, setSelectedCharts] = useState<string[]>([
    "gender",
    "ageGroup",
  ]);
  const [isChartSelectorOpen, setIsChartSelectorOpen] = useState(false);

  // 선택 가능한 차트 목록
  const availableCharts = [
    {
      id: "gender",
      label: "성별 분포",
      available: chartData?.gender && chartData.gender.length > 0,
    },
    {
      id: "ageGroup",
      label: "연령대 분포",
      available: chartData?.ageGroup && chartData.ageGroup.length > 0,
    },
    {
      id: "ageRange",
      label: "연령 분포",
      available: chartData?.ageRange && chartData.ageRange.length > 0,
    },
    {
      id: "region",
      label: "지역 분포",
      available: chartData?.region && chartData.region.length > 0,
    },
    {
      id: "maritalStatus",
      label: "혼인 상태 분포",
      available: chartData?.maritalStatus && chartData.maritalStatus.length > 0,
    },
    {
      id: "occupation",
      label: "직업 분포",
      available: chartData?.occupation && chartData.occupation.length > 0,
    },
    {
      id: "childrenCount",
      label: "자녀 수 분포",
      available: chartData?.childrenCount && chartData.childrenCount.length > 0,
    },
  ].filter((chart) => chart.available);

  const toggleChart = (chartId: string) => {
    setSelectedCharts((prev) =>
      prev.includes(chartId)
        ? prev.filter((id) => id !== chartId)
        : [...prev, chartId]
    );
  };

  return (
    <div className="flex w-full flex-col items-start justify-center gap-[32px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
      <div className="flex w-full items-center justify-between">
        <div className="text-gray-950 text-h4">패널 분석</div>
        <Button
          variant="outlined"
          size="medium"
          onClick={() => setIsChartSelectorOpen(!isChartSelectorOpen)}
        >
          {isChartSelectorOpen ? "차트 선택 닫기" : "더 많은 분석 보기"}
        </Button>
      </div>

      {/* 차트 선택 UI */}
      {isChartSelectorOpen && (
        <div className="flex w-full flex-wrap items-center justify-start gap-[12px] rounded-lg bg-white/30 px-[24px] py-[20px]">
          {availableCharts.map((chart) => (
            <label
              key={chart.id}
              className="flex cursor-pointer items-center gap-[8px] rounded-lg bg-white px-[16px] py-[10px] transition-colors hover:bg-primary-50"
            >
              <input
                type="checkbox"
                checked={selectedCharts.includes(chart.id)}
                onChange={() => toggleChart(chart.id)}
                className="h-4 w-4 cursor-pointer accent-primary-700"
              />
              <span className="text-body3 text-gray-900">{chart.label}</span>
            </label>
          ))}
        </div>
      )}

      {/* 동적 차트 렌더링 */}
      <div className="grid w-full grid-cols-2 gap-[32px]">
        {selectedCharts.includes("gender") &&
          chartData?.gender &&
          chartData.gender.length > 0 && (
            <div className="flex min-h-[450px] items-start justify-center">
              <DonutChartComponent
                data={chartData.gender}
                title="성별 분포"
                reasoning="패널의 성별 분포를 보여줍니다."
              />
            </div>
          )}
        {selectedCharts.includes("ageGroup") &&
          chartData?.ageGroup &&
          chartData.ageGroup.length > 0 && (
            <div className="flex min-h-[450px] items-start justify-center">
              <DonutChartComponent
                data={chartData.ageGroup}
                title="연령대 분포"
                reasoning="패널의 연령대별 분포를 보여줍니다."
              />
            </div>
          )}
        {selectedCharts.includes("ageRange") &&
          chartData?.ageRange &&
          chartData.ageRange.length > 0 && (
            <div className="flex min-h-[450px] items-start justify-center">
              <ColumnChartComponent
                data={chartData.ageRange}
                title="연령 분포"
                reasoning="패널의 세부 연령 분포를 5세 단위로 보여줍니다."
              />
            </div>
          )}
        {selectedCharts.includes("region") &&
          chartData?.region &&
          chartData.region.length > 0 && (
            <div className="flex min-h-[500px] items-start justify-center">
              <MapChartComponent
                data={chartData.region}
                title="지역 분포"
                reasoning="패널의 거주 지역 분포를 지도로 보여줍니다."
              />
            </div>
          )}
        {selectedCharts.includes("maritalStatus") &&
          chartData?.maritalStatus &&
          chartData.maritalStatus.length > 0 && (
            <div className="flex min-h-[450px] items-start justify-center">
              <DonutChartComponent
                data={chartData.maritalStatus}
                title="혼인 상태 분포"
                reasoning="패널의 혼인 상태 분포를 보여줍니다."
              />
            </div>
          )}
        {selectedCharts.includes("occupation") &&
          chartData?.occupation &&
          chartData.occupation.length > 0 && (
            <div className="flex min-h-[450px] items-start justify-center">
              <ColumnChartComponent
                data={chartData.occupation}
                title="직업 분포 (상위 10개)"
                reasoning="패널의 직업 분포를 보여줍니다."
              />
            </div>
          )}
        {selectedCharts.includes("childrenCount") &&
          chartData?.childrenCount &&
          chartData.childrenCount.length > 0 && (
            <div className="flex min-h-[450px] items-start justify-center">
              <ColumnChartComponent
                data={chartData.childrenCount}
                title="자녀 수 분포"
                reasoning="패널의 자녀 수 분포를 보여줍니다."
              />
            </div>
          )}
      </div>
    </div>
  );
}
