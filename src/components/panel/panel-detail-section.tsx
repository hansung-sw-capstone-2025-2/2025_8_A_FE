import CarIcon from "@/assets/icons/ic_car";
import DevicesIcon from "@/assets/icons/ic_devices";
import HomeIcon from "@/assets/icons/ic_home";
import TvIcon from "@/assets/icons/ic_tv";
import UserIcon from "@/assets/icons/ic_user";
import SurveyContainer from "@/components/panel/survey-container";

interface PanelDetailSectionProps {
  mode: string;
  handleMode: (mode: string) => void;
  panelData: Record<string, unknown> | null;
  basicInfoList: Array<{ title: string; value: string }>;
  digitalDeviceInfo: Array<{ text: string; icon: React.ReactNode }>;
  vehicleInfo: Array<{ text: string; icon: React.ReactNode }>;
  ownedProducts: string[];
  lifestyleData: Array<{
    title: string;
    chips: string[];
    icon: React.ReactNode;
  }>;
  categoryIcons: Record<string, React.ReactNode>;
}

export default function PanelDetailSection({
  mode,
  handleMode,
  panelData,
  basicInfoList,
  digitalDeviceInfo,
  vehicleInfo,
  ownedProducts,
  lifestyleData,
  categoryIcons,
}: PanelDetailSectionProps) {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-[20px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
      {/* 헤더 */}
      <div className="flex w-full items-center justify-start gap-[20px] border-gray-500 border-b-[0.5px]">
        <div
          className={`text-body5 ${
            mode === "profile"
              ? "border-tertiary-500 border-b text-tertiary-500"
              : "text-gray-700"
          } cursor-pointer py-[5px]`}
          onClick={() => handleMode("profile")}
        >
          상세 프로필
        </div>
        {panelData &&
        "설문응답" in panelData &&
        panelData.설문응답 &&
        typeof panelData.설문응답 === "object" &&
        Object.keys(panelData.설문응답).length > 0 ? (
          <div
            className={`text-body5 ${
              mode === "history"
                ? "border-tertiary-500 border-b text-tertiary-500"
                : "text-gray-700"
            } cursor-pointer py-[5px]`}
            onClick={() => handleMode("history")}
          >
            참여이력
          </div>
        ) : null}
      </div>
      {mode === "profile" ? (
        <div className="grid w-full grid-cols-2 items-start justify-start gap-[20px]">
          {/* 기본 정보 */}
          <SurveyContainer
            type="list"
            title="기본 정보"
            icon={<UserIcon width={20} height={20} />}
            data={basicInfoList}
          />
          {/* 상세 정보 */}
          <div className="flex w-full flex-col items-start justify-center gap-[32px]">
            {/* 디지털 기기 */}
            <SurveyContainer
              type="icon-list"
              title="디지털 기기"
              icon={<DevicesIcon width={20} height={20} />}
              data={digitalDeviceInfo}
            />
            {/* 차량 정보 */}
            <SurveyContainer
              type="icon-list"
              title="차량 정보"
              icon={<CarIcon width={20} height={20} />}
              data={vehicleInfo}
            />
            {/* 보유 전자제품 */}
            <SurveyContainer
              type="chip"
              title="보유 전자제품"
              icon={<TvIcon width={20} height={20} />}
              data={ownedProducts}
            />
            {/* 생활 습관 */}
            <SurveyContainer
              type="chip"
              title="생활 습관"
              icon={<HomeIcon width={20} height={20} />}
              data={lifestyleData}
            />
          </div>
        </div>
      ) : panelData &&
        "설문응답" in panelData &&
        panelData.설문응답 &&
        typeof panelData.설문응답 === "object" &&
        Object.keys(panelData.설문응답).length > 0 ? (
        <div className="flex w-full flex-col items-start justify-start gap-[20px]">
          {Object.entries(panelData.설문응답 as Record<string, unknown>).map(
            ([category, surveyData]) => (
              <SurveyContainer
                key={category}
                icon={
                  categoryIcons[category] || <HomeIcon width={20} height={20} />
                }
                title={category}
                data={surveyData as string[] | Record<string, string>}
              />
            )
          )}
        </div>
      ) : null}
    </div>
  );
}
