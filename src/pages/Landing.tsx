import { useNavigate } from "react-router-dom";
import ArrowRightIcon from "@/assets/icons/ic_arrow_right";
import DocSearchIcon from "@/assets/icons/ic_doc_search";
import ExportIcon from "@/assets/icons/ic_export";
import GroupIcon from "@/assets/icons/ic_group";
import StatusSquareIcon from "@/assets/icons/ic_status_square";
import mockupImage from "@/assets/images/mockup.webp";
import LogoText from "@/assets/logos/logo_text";
import Button from "@/components/button";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center bg-opacity-200 px-6 pt-[158px] pb-[120px]">
        <div className="flex w-full max-w-7xl gap-4">
          <div className="flex flex-4 flex-col gap-[64px] py-[32px]">
            <div className="flex flex-col gap-[48px]">
              <div className="animate-fade-in-left text-h2 text-primary-950 opacity-0">
                차별화된 패널 데이터
                <br />
                검색과 비교 분석
              </div>
              <div className="animate-fade-in-left text-body3 text-gray-900 opacity-0 delay-200">
                AI 기반 유사도 분석을 통한 차별화된 패널 데이터 검색 및 비교
                분석을 체험해보세요! 패널 데이터의 검색, 필터링, 시각화 기능을
                통합한 대시 보드 서비스까지.
              </div>
            </div>
            <div className="flex animate-fade-in-up gap-[16px] opacity-0 delay-400">
              <Button
                variant="icon"
                size="medium"
                onClick={() => navigate("/signup")}
              >
                <div>회원가입</div>
                <ArrowRightIcon color="white" width={14} height={14} />
              </Button>
              <Button
                variant="outlined"
                size="medium"
                onClick={() => navigate("/login")}
              >
                로그인
              </Button>
            </div>
          </div>
          <div className="flex w-full flex-6 animate-fade-in-right items-center justify-center opacity-0 delay-300">
            <img
              src={mockupImage}
              alt="DiffLens Mockup"
              className="h-auto w-full max-w-md md:max-w-lg lg:max-w-[900px]"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-[64px] bg-opacity-700 px-6 py-[80px]">
        <div className="flex animate-fade-in items-center gap-[8px] text-black text-h2 opacity-0 delay-500">
          왜
          <LogoText width={177} height={46} />
          일까요?
        </div>
        <div className="flex w-full max-w-[1080px] gap-[16px]">
          <div className="flex animate-fade-in-up flex-col items-center gap-[16px] px-[16px] opacity-0 delay-600">
            <StatusSquareIcon color="black" width={48} height={48} />
            <div className="text-center text-body3 text-gray-900">
              패널 데이터 검색/비교 분석 통합 대시보드 플랫폼 구축
            </div>
          </div>
          <div className="flex animate-fade-in-up flex-col items-center gap-[16px] px-[16px] opacity-0 delay-700">
            <GroupIcon color="black" width={48} height={48} />
            <div className="text-center text-body3 text-gray-900">
              AI 기반 유사도 분석을 통한 관련 패널 자동 추천 시스템
            </div>
          </div>
          <div
            className="flex animate-fade-in-up flex-col items-center gap-[16px] px-[16px] opacity-0 delay-[0.8s]"
            style={{ animationDelay: "0.8s" }}
          >
            <ExportIcon color="black" width={48} height={48} />
            <div className="text-center text-body3 text-gray-900">
              사용자별 맞춤형 데이터 내보내기 및 집단 관리 기능
            </div>
          </div>
          <div
            className="flex animate-fade-in-up flex-col items-center gap-[16px] px-[16px] opacity-0 delay-[0.9s]"
            style={{ animationDelay: "0.9s" }}
          >
            <DocSearchIcon color="black" width={48} height={48} />
            <div className="text-center text-body3 text-gray-900">
              특정 라이브러리 내 사용자가 놓친 집단 특성 리포트 기능
            </div>
          </div>
        </div>
        <Button
          variant="filled"
          size="large"
          onClick={() => navigate("/signup")}
          className="animate-fade-in-up opacity-0 delay-[1s]"
          style={{ animationDelay: "1s" }}
        >
          시작하기
        </Button>
      </div>
    </div>
  );
}
