import BriefcaseIcon from "@/assets/icons/ic_briefcase";
import BusinessIcon from "@/assets/icons/ic_business";
import CommentIcon from "@/assets/icons/ic_comment";
import MapPinIcon from "@/assets/icons/ic_mappin";
import UserIcon from "@/assets/icons/ic_user";
import Chip from "@/components/chip";
import PercentageBar from "@/components/panel/percentage-bar";
import TextWithIcon from "@/components/panel/text-with-icon";

interface PanelProfileSectionProps {
  panelProfile: {
    panelId: string;
    age: string;
    gender: string;
    job: string;
    department: string;
    address: string;
  } | null;
  hashTags: string[];
  panelSummary: string | null;
  question: string;
  concordanceRate: number | string;
}

export default function PanelProfileSection({
  panelProfile,
  hashTags,
  panelSummary,
  question,
  concordanceRate,
}: PanelProfileSectionProps) {
  return (
    <div className="mb-[49px] flex w-full flex-col items-start justify-center gap-[32px] rounded-2xl bg-opacity-500 px-[40px] py-[32px]">
      {/* 패널 정보 */}
      <div className="flex w-full items-start justify-between gap-[16px]">
        <div className="flex items-center justify-start gap-[16px]">
          <div
            className="flex items-center justify-center rounded-xl px-[16px] py-[16px]"
            style={{
              background: "linear-gradient(135deg, #FBEEFF 0.5%, #D1E4FE 100%)",
            }}
          >
            <UserIcon width={48} height={48} />
          </div>
          <div className="flex flex-col items-start justify-start gap-[8px]">
            <div className="text-h3 text-primary-900">
              {panelProfile?.panelId || "패널 정보 로딩 중..."}
            </div>
            <div className="flex items-center justify-start gap-[16px]">
              {(panelProfile?.age || panelProfile?.gender) && (
                <TextWithIcon
                  icon={<UserIcon width={20} height={20} color="#616161" />}
                  text={`${panelProfile?.age || ""} ${
                    panelProfile?.gender || ""
                  }`}
                />
              )}
              {panelProfile?.job && (
                <TextWithIcon
                  icon={
                    <BriefcaseIcon width={20} height={20} color="#616161" />
                  }
                  text={panelProfile.job}
                />
              )}
              {panelProfile?.department && (
                <TextWithIcon
                  icon={<BusinessIcon width={20} height={20} color="#616161" />}
                  text={panelProfile.department}
                />
              )}
              {panelProfile?.address && (
                <TextWithIcon
                  icon={<MapPinIcon width={20} height={20} color="#616161" />}
                  text={panelProfile.address}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-[12px] px-[12px] py-[8px]">
          <div className="text-caption text-primary-700">{question}</div>
          <div className="flex items-center justify-start gap-[4px]">
            <div className="text-black text-subtitle2">
              {typeof concordanceRate === "string"
                ? concordanceRate
                : `${concordanceRate}%`}
            </div>
            <PercentageBar
              percentage={
                typeof concordanceRate === "string"
                  ? Number.parseInt(concordanceRate.replace("%", ""), 10)
                  : concordanceRate
              }
            />
          </div>
        </div>
      </div>
      {/* 해시 태그 */}
      <div className="flex items-center justify-start gap-[16px]">
        {hashTags.map((tag) => (
          <Chip key={tag} variant="filled" chipType="text">
            {tag}
          </Chip>
        ))}
      </div>
      {/* 패널 프로필 요약 */}
      <div className="flex w-full flex-col items-center justify-start gap-[4px] rounded-xl border border-white bg-gray-50 px-[16px] py-[12px]">
        <div className="flex w-full items-center justify-start gap-[8px] text-gray-950 text-h6">
          <CommentIcon width={24} height={24} />
          패널 프로필 요약
        </div>
        <div className="w-full px-[32px] text-start text-body3 text-gray-900">
          {panelSummary}
        </div>
      </div>
    </div>
  );
}
