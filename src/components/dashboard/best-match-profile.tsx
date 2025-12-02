/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <explanation> */
import ArrowRightIcon from "@/assets/icons/ic_arrow_right";
import UserIcon from "@/assets/icons/ic_user";
import PercentageBar from "@/components/panel/percentage-bar";

interface BestMatchProfileProps {
  respondentId: string;
  concordanceRate: string;
  gender: string;
  age: string;
  residence: string;
  personalIncome?: string;
  onViewDetails: () => void;
}

export default function BestMatchProfile({
  respondentId,
  concordanceRate,
  gender,
  age,
  residence,
  personalIncome,
  onViewDetails,
}: BestMatchProfileProps) {
  const concordancePercentage =
    Number.parseFloat(concordanceRate?.replace("%", "") || "0") * 100;

  return (
    <div className="group relative flex h-full w-full flex-col items-center justify-start gap-[24px] overflow-hidden rounded-2xl bg-gradient-to-br bg-opacity-500 px-10 py-8">
      {/* 배경 장식 */}
      <div className="-translate-y-10 absolute top-0 right-0 h-40 w-40 translate-x-10 rounded-full bg-primary-100 opacity-20 blur-3xl" />
      <div className="-translate-x-10 absolute bottom-0 left-0 h-32 w-32 translate-y-10 rounded-full bg-secondary-100 opacity-20 blur-3xl" />

      {/* Best Match Badge */}
      <div className="relative z-10 flex w-full items-center justify-center">
        <div className="flex items-center gap-[8px] rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-[20px] py-[8px] shadow-lg">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
              fill="white"
            />
          </svg>
          <span className="font-semibold text-body3 text-white">
            Best Match
          </span>
        </div>
      </div>

      {/* 일치율 헤더 */}
      <div className="relative z-10 flex w-full items-center justify-between gap-[16px]">
        <div className="flex flex-col gap-[4px]">
          <span className="text-caption text-gray-600">일치율</span>
          <span className="font-bold text-h3 text-primary-700">
            {concordancePercentage.toFixed(0)}%
          </span>
        </div>
        <PercentageBar percentage={concordancePercentage} />
      </div>

      {/* 프로필 이미지 with Progress Ring */}
      <div className="relative z-10 flex flex-col items-center gap-[12px]">
        <div className="relative flex items-center justify-center">
          {/* Progress Ring SVG */}
          <svg className="-rotate-90 absolute h-40 w-40" viewBox="0 0 160 160">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r="74"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="4"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r="74"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${
                (concordancePercentage * 2 * Math.PI * 74) / 100
              } ${2 * Math.PI * 74}`}
            />
            <defs>
              {/** biome-ignore lint/correctness/useUniqueElementIds: <explanation> */}
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8569e4" />
                <stop offset="100%" stopColor="#764ed9" />
              </linearGradient>
            </defs>
          </svg>
          {/* Profile Image */}
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-primary-200 shadow-lg ring-4 ring-white">
            <UserIcon color="#764ed9" width={64} height={64} />
          </div>
        </div>
        {/* Panel ID */}
        <div className="mt-5 text-body3 text-gray-500">@{respondentId}</div>
      </div>

      {/* 패널 정보 요약 */}
      <div className="relative z-10 flex flex-col items-center gap-[4px]">
        <div className="font-semibold text-gray-950 text-h5">
          {gender} · {age}세
        </div>
        <div className="text-body3 text-gray-600">{residence}</div>
      </div>

      {/* 추가 정보 */}
      {personalIncome && personalIncome !== "-" && (
        <div className="relative z-10 flex w-full items-center justify-center gap-[12px] rounded-lg bg-white/60 px-[20px] py-[16px] backdrop-blur-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <span className="font-bold text-body2 text-green-700">₩</span>
          </div>
          <div className="flex flex-1 flex-col gap-[2px]">
            <span className="text-caption text-gray-600">개인소득</span>
            <span className="font-semibold text-body2 text-gray-950">
              {personalIncome}
            </span>
          </div>
        </div>
      )}

      {/* 하단 안내 */}
      <button
        type="button"
        className="relative z-10 mt-auto flex w-full cursor-pointer items-center justify-center gap-[8px] rounded-lg bg-primary-600 px-[16px] py-[10px]"
        onClick={onViewDetails}
      >
        <span className="font-medium text-body3 text-white">
          상세 정보 보기
        </span>
        <ArrowRightIcon color="white" width={16} height={16} />
      </button>
    </div>
  );
}
