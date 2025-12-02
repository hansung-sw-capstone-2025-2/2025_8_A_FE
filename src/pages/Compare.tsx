import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { compareLibraries } from "@/api/library";
import ChevronLeftIcon from "@/assets/icons/ic_chevron_left";
import CompareBar from "@/components/compare/bar";
import BasicInfo from "@/components/compare/basic-info";
import CompareCard from "@/components/compare/card";
import DistributionBox from "@/components/compare/distribution-box";
import InsightItem from "@/components/compare/insight-item";
import { useLoading } from "@/contexts/LoadingContext";
import type { CompareLibrariesResponse } from "@/types/library";

export default function Compare() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showLoading, hideLoading } = useLoading();
  const [compareData, setCompareData] =
    useState<CompareLibrariesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const stateData = location.state as {
    libraryId1: number;
    libraryId2: number;
  } | null;

  useEffect(() => {
    const fetchCompareData = async () => {
      if (!stateData?.libraryId1 || !stateData?.libraryId2) {
        console.error("Library IDs not found");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        showLoading("라이브러리를 비교 분석하고 있습니다...");

        const response = await compareLibraries({
          libraryId1: stateData.libraryId1,
          libraryId2: stateData.libraryId2,
        });

        if (response.is_success) {
          setCompareData(response.result);
        }
      } catch (error) {
        console.error("Failed to fetch comparison data:", error);
      } finally {
        setIsLoading(false);
        hideLoading();
      }
    };

    fetchCompareData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateData?.libraryId1, stateData?.libraryId2]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (!compareData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-500">비교 데이터를 불러올 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-6 pt-[40px] pb-[88px]">
      <div className="flex w-full max-w-[956px] flex-col gap-[40px]">
        <div
          className="flex cursor-pointer items-center justify-start gap-[8px]"
          onClick={() => navigate("/home/library")}
        >
          <ChevronLeftIcon color="#616161" width={24} height={24} />
          <div className="text-gray-700 text-h5">라이브러리</div>
        </div>
        {/* 비교분석 대상 영역 */}
        <div className="flex w-full flex-col items-start justify-start gap-[20px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
          <div className="text-gray-950 text-h6">비교분석 대상</div>
          <div className="grid w-full grid-cols-2 gap-[40px]">
            <CompareCard
              title={compareData.group1.library_name}
              description={compareData.group1.summary || ""}
              tags={[
                `${compareData.group1.total_count}명`,
                compareData.group1.library_name,
              ]}
              filters={compareData.group1.filters.map(
                (filter) => `${filter.key}: ${filter.values.join(", ")}`
              )}
              group="A"
            />
            <CompareCard
              title={compareData.group2.library_name}
              description={compareData.group2.summary || ""}
              tags={[
                `${compareData.group2.total_count}명`,
                compareData.group2.library_name,
              ]}
              filters={compareData.group2.filters.map(
                (filter) => `${filter.key}: ${filter.values.join(", ")}`
              )}
              group="B"
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-[32px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
          <div className="flex w-full items-center justify-between gap-[16px]">
            <div className="flex items-center justify-center gap-[12px]">
              <div className="h-[16px] w-[16px] rounded-full bg-secondary-300" />
              <div className="text-gray-950 text-subtitle1">A그룹</div>
              <div className="text-gray-700 text-label">
                "{compareData.group1.library_name}"
              </div>
            </div>
            <div className="flex items-center justify-center gap-[12px]">
              <div className="text-gray-700 text-label">
                "{compareData.group2.library_name}"
              </div>
              <div className="text-gray-950 text-subtitle1">B그룹</div>
              <div className="h-[16px] w-[16px] rounded-full bg-tertiary-300" />
            </div>
          </div>
          {/* 비교분석 결과 영역 - 주요 특성 */}
          <div className="flex w-full flex-col items-start justify-start gap-[20px]">
            {compareData.key_characteristics.map((characteristic) => (
              <CompareBar
                key={characteristic.characteristic}
                leftPercent={characteristic.group1_percentage}
                rightPercent={characteristic.group2_percentage}
                label={characteristic.characteristic}
              />
            ))}
          </div>
          {/* 성별 분포 */}
          <DistributionBox
            title="성별 분포"
            categories={[
              {
                name: "남성",
                groupA: compareData.basic_comparison.group1.male,
                groupB: compareData.basic_comparison.group2.male,
              },
              {
                name: "여성",
                groupA: compareData.basic_comparison.group1.female,
                groupB: compareData.basic_comparison.group2.female,
              },
            ]}
          />
          {/* 지역 분포 */}
          <DistributionBox
            title="지역 분포"
            categories={[
              {
                name: "서울",
                groupA: compareData.basic_comparison.group1.seoul,
                groupB: compareData.basic_comparison.group2.seoul,
              },
              {
                name: "경기",
                groupA: compareData.basic_comparison.group1.gyeonggi,
                groupB: compareData.basic_comparison.group2.gyeonggi,
              },
              {
                name: "부산",
                groupA: compareData.basic_comparison.group1.busan,
                groupB: compareData.basic_comparison.group2.busan,
              },
              {
                name: "기타",
                groupA: compareData.basic_comparison.group1.region_etc,
                groupB: compareData.basic_comparison.group2.region_etc,
              },
            ]}
          />
        </div>
        {/* 기본 정보 비교 영역 */}
        <div className="flex w-full flex-col items-start justify-start gap-[20px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
          <div className="text-gray-950 text-h6">기본 정보 비교</div>
          <div className="grid w-full grid-cols-3 gap-[40px]">
            <BasicInfo
              title="평균 연령"
              groupA={
                compareData.basic_comparison.group1.avg_age != null
                  ? `${compareData.basic_comparison.group1.avg_age}세`
                  : "-"
              }
              groupB={
                compareData.basic_comparison.group2.avg_age != null
                  ? `${compareData.basic_comparison.group2.avg_age}세`
                  : "-"
              }
            />
            <BasicInfo
              title="평균 가족 수"
              groupA={
                compareData.basic_comparison.group1.avg_family != null
                  ? `${compareData.basic_comparison.group1.avg_family}명`
                  : "-"
              }
              groupB={
                compareData.basic_comparison.group2.avg_family != null
                  ? `${compareData.basic_comparison.group2.avg_family}명`
                  : "-"
              }
            />
            <BasicInfo
              title="평균 자녀 수"
              groupA={
                compareData.basic_comparison.group1.avg_children != null
                  ? `${compareData.basic_comparison.group1.avg_children}명`
                  : "-"
              }
              groupB={
                compareData.basic_comparison.group2.avg_children != null
                  ? `${compareData.basic_comparison.group2.avg_children}명`
                  : "-"
              }
            />
            <BasicInfo
              title="차량 보유율"
              groupA={
                compareData.basic_comparison.group1.rate_possessing_car != null
                  ? `${compareData.basic_comparison.group1.rate_possessing_car}%`
                  : "-"
              }
              groupB={
                compareData.basic_comparison.group2.rate_possessing_car != null
                  ? `${compareData.basic_comparison.group2.rate_possessing_car}%`
                  : "-"
              }
            />
            <BasicInfo
              title="평균 개인 소득"
              groupA={
                compareData.basic_comparison.group1.avg_personal_income != null
                  ? `${compareData.basic_comparison.group1.avg_personal_income}만원`
                  : "-"
              }
              groupB={
                compareData.basic_comparison.group2.avg_personal_income != null
                  ? `${compareData.basic_comparison.group2.avg_personal_income}만원`
                  : "-"
              }
            />
            <BasicInfo
              title="평균 가구 소득"
              groupA={
                compareData.basic_comparison.group1.avg_family_income != null
                  ? `${compareData.basic_comparison.group1.avg_family_income}만원`
                  : "-"
              }
              groupB={
                compareData.basic_comparison.group2.avg_family_income != null
                  ? `${compareData.basic_comparison.group2.avg_family_income}만원`
                  : "-"
              }
            />
          </div>
        </div>
        {/* 핵심 인사이트 영역 */}
        <div className="flex w-full flex-col items-start justify-start gap-[20px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
          <div className="text-gray-950 text-h6">핵심 인사이트</div>
          <div className="flex w-full flex-col items-center justify-center gap-[44px]">
            <InsightItem
              title="주요 차이점"
              description={compareData.insights.difference}
            />
            <InsightItem
              title="공통점"
              description={compareData.insights.common}
            />
            <InsightItem
              title="시사점"
              description={compareData.insights.implication}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
