import { REGION_CODE_MAP } from "@/constants/region-map";

/**
 * profile_summary 에서 지역명 추출
 */
export function extractRegionFromSummary(summary: string): string | null {
  if (!summary) return null;

  const regionNames = Object.keys(REGION_CODE_MAP).sort(
    (a, b) => b.length - a.length
  );

  for (const regionName of regionNames) {
    if (summary.includes(regionName)) {
      const code = REGION_CODE_MAP[regionName];
      if (code.startsWith("KR-11")) return "서울";
      if (code.startsWith("KR-26")) return "부산";
      if (code.startsWith("KR-27")) return "대구";
      if (code.startsWith("KR-28")) return "인천";
      if (code.startsWith("KR-29")) return "광주";
      if (code.startsWith("KR-30")) return "대전";
      if (code.startsWith("KR-31")) return "울산";
      if (code.startsWith("KR-50")) return "세종";
      if (code.startsWith("KR-41")) return "경기";
      if (code.startsWith("KR-42")) return "강원";
      if (code.startsWith("KR-43")) return "충북";
      if (code.startsWith("KR-44")) return "충남";
      if (code.startsWith("KR-45")) return "전북";
      if (code.startsWith("KR-46")) return "전남";
      if (code.startsWith("KR-47")) return "경북";
      if (code.startsWith("KR-48")) return "경남";
      if (code.startsWith("KR-49")) return "제주";
    }
  }

  return null;
}

/**
 * 지역 분포 데이터를 ChartDataPoint 형식으로 변환
 */
export function aggregateRegionDistribution(
  panels: Array<{ profile_summary?: string }>
): Array<{
  category: string;
  value: number;
  id: string;
  name: string | null;
  male: number | null;
  female: number | null;
  male_max: number | null;
  female_max: number | null;
}> {
  const distribution: Record<string, number> = {};

  // 각 패널에서 지역 추출 및 집계
  panels.forEach((panel) => {
    if (panel.profile_summary) {
      const region = extractRegionFromSummary(panel.profile_summary);
      if (region) {
        distribution[region] = (distribution[region] || 0) + 1;
      }
    }
  });

  // ChartDataPoint 형식으로 변환
  return Object.entries(distribution).map(([region, count]) => ({
    category: region,
    value: count,
    id: REGION_CODE_MAP[region] || region,
    name: region,
    male: null,
    female: null,
    male_max: null,
    female_max: null,
  }));
}
