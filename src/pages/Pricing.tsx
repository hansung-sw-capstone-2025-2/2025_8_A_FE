import { useNavigate } from "react-router-dom";
import LogoContainer from "@/assets/logos/logo_container";
import Button from "@/components/button";
import ListItem from "@/components/pricing/list-item";

export default function Pricing() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-[181px] py-[107.5px]">
      <div className="flex w-full flex-col items-center justify-center gap-[48px] rounded-2xl bg-opacity-500 px-[80px] py-[64px]">
        {/* 상단 영역 */}
        <div className="flex flex-col items-center justify-center">
          <LogoContainer width={128} height={26} />
          <div className="mt-[8px] mb-[16px] text-gray-950 text-h2">
            계정 유형을 고르세요
          </div>
          <div className="text-body4 text-gray-900">
            차별화된 패널 데이터 검색과 비교 분석을 체험해보세요
          </div>
        </div>
        {/* 하단 영역 */}
        <div className="grid w-full grid-cols-2 gap-[24px]">
          {/* 개인 */}
          <div className="flex flex-col items-center justify-center gap-[32px] rounded-lg border border-white bg-opacity-800 px-[24px] py-[48px]">
            <div className="flex flex-col items-center justify-center gap-[8px]">
              <div className="text-gray-950 text-h3">개인</div>
              <div className="text-body3 text-primary-800">
                개인 프로젝트를 진행 중이라면
              </div>
            </div>
            <div className="flex flex-col items-start gap-[8px]">
              <ListItem title="1일 검색 횟수 제한" />
              <ListItem title="패널 데이터 검색 및 분석" />
              <ListItem title="개인맞춤 패널 자동 추천" />
              <ListItem title="데이터 분석 결과 내보내기" />
              <ListItem title="라이브러리 최대 10개 저장" />
              <ListItem title="라이브러리 1주일 보관" />
            </div>
            <Button
              variant="filled"
              size="large"
              onClick={() => navigate("/signup?role=individual")}
            >
              시작하기
            </Button>
          </div>
          {/* 비즈니스 */}
          <div className="flex flex-col items-center justify-center gap-[32px] rounded-lg border border-white bg-opacity-800 px-[24px] py-[48px]">
            <div className="flex flex-col items-center justify-center gap-[8px]">
              <div className="text-gray-950 text-h3">비즈니스</div>
              <div className="text-body3 text-primary-800">
                전문가 또는 기업에서 프로젝트를 진행 중이라면
              </div>
            </div>
            <div className="flex flex-col items-start gap-[8px]">
              <ListItem title="검색 횟수 무제한" />
              <ListItem title="패널 데이터 검색 및 분석" />
              <ListItem title="개인맞춤 패널 자동 추천" />
              <ListItem title="데이터 분석 결과 내보내기 무제한" />
              <ListItem title="라이브러리 무제한 저장" />
              <ListItem title="라이브러리 영구 보관" />
            </div>
            <Button
              variant="filled"
              size="large"
              onClick={() => navigate("/signup?role=business")}
            >
              시작하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
