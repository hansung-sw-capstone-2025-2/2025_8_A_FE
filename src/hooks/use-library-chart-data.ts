import { useMemo } from "react";
import type { Panel } from "@/types/library";
import { aggregateRegionDistribution } from "@/utils/region-parser";

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

export function useLibraryChartData(
  panels: Panel[] | undefined
): LibraryChartData | null {
  return useMemo(() => {
    if (!panels) return null;

    // 1. 성별 분포
    const genderDistribution = panels.reduce(
      (acc, panel) => {
        const gender =
          panel.gender === "MALE"
            ? "남성"
            : panel.gender === "FEMALE"
              ? "여성"
              : "기타";
        acc[gender] = (acc[gender] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // 2. 연령대 분포
    const ageGroupDistribution = panels.reduce(
      (acc, panel) => {
        if (panel.age_group) {
          acc[panel.age_group] = (acc[panel.age_group] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    // 3. 연령 분포 (5세 단위)
    const ageRangeDistribution = panels.reduce(
      (acc, panel) => {
        const ageRange = `${Math.floor(panel.age / 5) * 5}-${Math.floor(panel.age / 5) * 5 + 4}세`;
        acc[ageRange] = (acc[ageRange] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // 4. 지역 분포 (profile_summary에서 추출)
    const regionChartData = aggregateRegionDistribution(panels);

    // 5. 혼인 상태 분포
    const maritalStatusDistribution = panels.reduce(
      (acc, panel) => {
        if (panel.marital_status) {
          acc[panel.marital_status] = (acc[panel.marital_status] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    // 6. 직업 분포 (상위 10개)
    const occupationDistribution = panels.reduce(
      (acc, panel) => {
        if (panel.occupation) {
          // 괄호 앞부분만 추출
          const occupation = panel.occupation.split("(")[0].trim();
          acc[occupation] = (acc[occupation] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    // 7. 자녀 수 분포
    const childrenCountDistribution = panels.reduce(
      (acc, panel) => {
        if (panel.children_count !== null) {
          const count = `${panel.children_count}명`;
          acc[count] = (acc[count] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    const toChartData = (
      distribution: Record<string, number>,
      limit?: number
    ): ChartDataPoint[] => {
      const sorted = Object.entries(distribution)
        .map(([category, value]) => ({
          category,
          value,
          male: null,
          female: null,
          id: null,
          name: null,
          male_max: null,
          female_max: null,
        }))
        .sort((a, b) => b.value - a.value);

      if (limit && sorted.length > limit) {
        const top = sorted.slice(0, limit);
        const othersValue = sorted
          .slice(limit)
          .reduce((sum, item) => sum + item.value, 0);
        if (othersValue > 0) {
          top.push({
            category: "기타",
            value: othersValue,
            male: null,
            female: null,
            id: null,
            name: null,
            male_max: null,
            female_max: null,
          });
        }
        return top;
      }

      return sorted;
    };

    const toColumnData = (
      distribution: Record<string, number>,
      limit?: number
    ): ColumnDataPoint[] => {
      return toChartData(distribution, limit).map((item) => ({
        label: item.category,
        value: item.value,
      }));
    };

    return {
      gender: toChartData(genderDistribution),
      ageGroup: toChartData(ageGroupDistribution),
      ageRange: toColumnData(ageRangeDistribution),
      region: regionChartData,
      maritalStatus: toChartData(maritalStatusDistribution),
      occupation: toColumnData(occupationDistribution, 10),
      childrenCount: toColumnData(childrenCountDistribution),
    };
  }, [panels]);
}
