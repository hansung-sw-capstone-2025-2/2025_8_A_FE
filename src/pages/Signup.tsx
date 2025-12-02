import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoText from "@/assets/logos/logo_text";
import Button from "@/components/button";
import InputField from "@/components/signup/input-field";

export default function Signup() {
  const navigate = useNavigate();
  // 플랜 선택 영역 주석 처리
  // const [sp] = useSearchParams();
  // const roleRaw = (sp.get("role") || "").toLowerCase();
  // const isValidRole = roleRaw === "individual" || roleRaw === "business";
  // const roleLabel = roleRaw === "individual" ? "개인" : "비즈니스";

  // 입력 상태
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [terms, setTerms] = useState(false);
  // 에러 상태
  const isNameError = useMemo(() => name.trim().length === 0, [name]);
  const isEmailError = useMemo(() => {
    if (email.length === 0) return true;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !re.test(email);
  }, [email]);
  const isPasswordError = useMemo(() => {
    if (password.length === 0) return true;
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{9,16}$/;
    return !re.test(password);
  }, [password]);
  const isPassword2Error = useMemo(() => {
    if (password2.length === 0) return true;
    return password2 !== password;
  }, [password2, password]);

  const passwordDescription = useMemo(() => {
    if (password.length === 0) return "비밀번호를 입력하세요.";
    if (password.length < 9) return "비밀번호는 9자리 이상입니다.";
    if (password.length > 16) return "비밀번호는 16자리 이하입니다.";
    return "비밀번호 (9~16자 영문 대소문자, 숫자, 특수문자 조합)";
  }, [password]);
  const isTermsError = useMemo(() => {
    return !terms;
  }, [terms]);

  const onFormChange = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLElement;
    if (!(target instanceof HTMLInputElement)) return;
    const { id, value } = target;
    if (id === "name") setName(value);
    else if (id === "email") setEmail(value);
    else if (id === "password") setPassword(value);
    else if (id === "password-confirm") setPassword2(value);
  }, []);

  const handleNext = useCallback(() => {
    // 세션 스토리지에 입력 값 저장
    sessionStorage.setItem("signup_name", name);
    sessionStorage.setItem("signup_email", email);
    sessionStorage.setItem("signup_password", password);
    navigate("/signup/onboarding");
  }, [name, email, password, navigate]);

  // 유효하지 않은 역할이면 리다이렉트 (주석 처리)
  // if (!isValidRole) return <Navigate to="/pricing" replace />;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-[53px]">
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
              <div className="h-[4px] w-[80px] rounded-sm bg-primary-500" />
              <div className="h-[4px] w-[80px] rounded-sm bg-gray-300" />
            </div>
          </div>
          {/* 폼 영역 */}
          <form
            className="flex w-full flex-col items-center justify-center gap-[16px]"
            onChange={onFormChange}
          >
            <InputField
              label="이름"
              type="text"
              placeholder="이름"
              description="실명을 입력하세요."
              error={isNameError}
              id="name"
            />
            <InputField
              label="아이디(이메일)"
              type="email"
              placeholder="이메일 주소"
              description="이메일 주소를 입력하세요."
              error={isEmailError}
              id="email"
            />
            <InputField
              label="비밀번호"
              type="password"
              placeholder="비밀번호"
              description={passwordDescription}
              error={isPasswordError}
              id="password"
            />
            <InputField
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호 확인"
              description="비밀번호를 한 번 더 입력하세요."
              error={isPassword2Error}
              id="password-confirm"
            />
            <div className="flex items-center justify-center gap-[8px]">
              <input
                type="checkbox"
                id="terms"
                className="h-[16px] w-[16px] rounded-sm border border-gray-900 bg-white"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
              />
              <label htmlFor="terms" className="text-body5 text-primary-900">
                만 14세 이상이며,{" "}
                <a href="/terms" className="underline">
                  서비스 이용 약관
                </a>
                에 동의합니다. (필수)
              </label>
            </div>
            <Button
              variant="filled"
              size="large"
              fullWidth
              disabled={
                isNameError ||
                isEmailError ||
                isPasswordError ||
                isPassword2Error ||
                isTermsError
              }
              onClick={handleNext}
              type="button"
            >
              다음
            </Button>
          </form>
          {/* 라인 */}
          <div className="h-[1px] w-full bg-[#DDE1E6]" />
          {/* 하단 영역 */}
          <div className="w-full text-center text-body5 text-gray-900">
            이미 계정이 있으신가요?{" "}
            <a
              onClick={() => navigate("/login")}
              className="cursor-pointer text-primary-700 underline"
            >
              로그인
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
