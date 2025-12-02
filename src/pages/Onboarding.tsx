import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "@/api/client";
import LogoText from "@/assets/logos/logo_text";
import Button from "@/components/button";
import DropdownField from "@/components/onboarding/dropdown-field";

export default function Onboarding() {
  const navigate = useNavigate();
  // 플랜 선택 영역 주석 처리
  // const [sp] = useSearchParams();
  // const roleRaw = (sp.get("role") || "").toLowerCase();
  // const isValidRole = roleRaw === "individual" || roleRaw === "business";
  // const roleLabel = roleRaw === "individual" ? "개인" : "비즈니스";

  const [job, setJob] = useState("");
  const [industry, setIndustry] = useState("");
  const isNextDisabled = job.length === 0 || industry.length === 0;

  // 직무 매핑
  const jobMapping: Record<string, string> = useMemo(
    () => ({
      "경영/기획/전략": "MANAGEMENT",
      "마케팅/광고/홍보": "MARKETING",
      "영업/고객관리": "SALES",
      "IT/개발/데이터": "IT",
      "디자인/미디어": "DESIGN",
      "생산/제조/품질": "PRODUCTION",
      "연구/R&D": "RESEARCH",
      "교육/컨설팅": "EDUCATION",
      "의료/보건/복지": "MEDICAL",
      "금융/회계/법률": "FINANCE",
      "서비스/유통": "SERVICE",
      "기타/프리랜서": "ETC_FREELANCER",
    }),
    []
  );

  // 업종 매핑
  const industryMapping: Record<string, string> = useMemo(
    () => ({
      "IT·인터넷·소프트웨어": "IT_SOFTWARE",
      "전자·제조·기계": "ELECTRONICS_MANUFACTURING",
      "금융·보험·핀테크": "FINANCE_INSURANCE",
      "유통·소비재·식품": "DISTRIBUTION_FOOD",
      "문화·미디어·엔터테인먼트": "CULTURE_MEDIA",
      "의료·제약·바이오": "MEDICAL_BIO",
      "교육·에듀테크": "EDUCATION_EDUTECH",
      "공공·비영리·행정": "PUBLIC_ADMIN",
      "건설·부동산·인프라": "CONSTRUCTION_INFRA",
      "에너지·환경·화학": "ENERGY_ENVIRONMENT",
      "관광·여행·항공": "TOURISM_TRAVEL",
      "기타 산업군": "ETC",
    }),
    []
  );

  const onFormChange = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const target = e.target as HTMLElement;
      if (!(target instanceof HTMLInputElement)) return;
      const { id, value } = target;
      if (id === "job") setJob(value);
      else if (id === "industry") setIndustry(value);
    },

    []
  );

  // 유효하지 않은 역할이면 리다이렉트 (주석 처리)
  // if (!isValidRole) return <Navigate to="/pricing" replace />;

  const handleNext = useCallback(async () => {
    try {
      const response = await apiClient.post("/auth/signup/local", {
        email: sessionStorage.getItem("signup_email"),
        name: sessionStorage.getItem("signup_name"),
        password: sessionStorage.getItem("signup_password"),
        loginType: "GENERAL",
        plan: "PERSONAL",
        job: jobMapping[job],
        industry: industryMapping[industry],
      });
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }, [job, industry, navigate, jobMapping, industryMapping]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-[218px]">
      <div className="w-full max-w-[680px]">
        <div className="flex w-full flex-col items-center justify-center gap-[24px] rounded-2xl bg-opacity-500 px-[80px] py-[80px]">
          {/* 상단 영역 */}
          <div className="flex flex-col items-center justify-center gap-[8px]">
            <LogoText width={213} height={60} />
            <div className="text-body3 text-primary-900">
              {/* {roleLabel} 플랜으로 회원가입 */}
              회원가입
            </div>
            <div className="flex items-center justify-center gap-[11px]">
              <div className="h-[4px] w-[80px] rounded-sm bg-gray-300" />
              <div className="h-[4px] w-[80px] rounded-sm bg-primary-500" />
            </div>
          </div>
          {/* 폼 영역 */}
          <form
            className="flex w-full flex-col items-center justify-center gap-[32px]"
            onChange={onFormChange}
          >
            <DropdownField
              label="직무"
              placeholder="직무를 선택해주세요"
              options={[
                "경영/기획/전략",
                "마케팅/광고/홍보",
                "영업/고객관리",
                "IT/개발/데이터",
                "디자인/미디어",
                "생산/제조/품질",
                "연구/R&D",
                "교육/컨설팅",
                "의료/보건/복지",
                "금융/회계/법률",
                "서비스/유통",
                "기타/프리랜서",
              ]}
              id="job"
              value={job}
              onChange={(value) => setJob(value)}
            />
            <DropdownField
              label="업종"
              placeholder="업종을 선택해주세요"
              options={[
                "IT·인터넷·소프트웨어",
                "전자·제조·기계",
                "금융·보험·핀테크",
                "유통·소비재·식품",
                "문화·미디어·엔터테인먼트",
                "의료·제약·바이오",
                "교육·에듀테크",
                "공공·비영리·행정",
                "건설·부동산·인프라",
                "에너지·환경·화학",
                "관광·여행·항공",
                "기타 산업군",
              ]}
              id="industry"
              value={industry}
              onChange={(value) => setIndustry(value)}
            />
            <div className="mb-[24px] flex w-full items-center justify-center gap-[32px]">
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={() => navigate(-1)}
              >
                이전
              </Button>
              <Button
                variant="filled"
                size="large"
                fullWidth
                disabled={isNextDisabled}
                onClick={handleNext}
              >
                다음
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
