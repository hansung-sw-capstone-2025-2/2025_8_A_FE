import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "@/api/client";
import LogoText from "@/assets/logos/logo_text";
import Button from "@/components/button";
import InputField from "@/components/signup/input-field";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const passwordDescription = useMemo(() => {
    if (password.length === 0) return "비밀번호를 입력하세요.";
    if (password.length < 9) return "비밀번호는 9자리 이상입니다.";
    if (password.length > 16) return "비밀번호는 16자리 이하입니다.";
    return "비밀번호 (9~16자 영문 대소문자, 숫자, 특수문자 조합)";
  }, [password]);

  const onFormChange = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLElement;
    if (!(target instanceof HTMLInputElement)) return;
    const { id, value } = target;
    if (id === "email") setEmail(value);
    else if (id === "password") setPassword(value);
  }, []);

  const handleLogin = useCallback(async () => {
    try {
      const response = await apiClient.post("/auth/login/local", {
        email,
        password,
        loginType: "GENERAL",
      });
      console.log(response);
      localStorage.setItem("access_token", response.data.result.access_token);
      localStorage.setItem("refresh_token", response.data.result.refresh_token);
      localStorage.setItem("user_email", email);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  }, [email, password, navigate]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isEmailError && !isPasswordError) {
        handleLogin();
      }
    },
    [isEmailError, isPasswordError, handleLogin]
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-[194px]">
      <div className="w-full max-w-[680px]">
        <div className="flex w-full flex-col items-center justify-center gap-[24px] rounded-2xl bg-opacity-500 px-[80px] py-[80px]">
          {/* 상단 영역 */}
          <div className="flex flex-col items-center justify-center gap-[8px]">
            <LogoText width={213} height={60} />
            <div className="text-body3 text-primary-900">
              계속하려면 로그인 하세요.
            </div>
          </div>
          {/* 폼 영역 */}
          <form
            className="flex w-full flex-col items-center justify-center gap-[16px]"
            onChange={onFormChange}
            onSubmit={handleSubmit}
          >
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
            <Button
              variant="filled"
              size="large"
              fullWidth
              disabled={isEmailError || isPasswordError}
              onClick={handleLogin}
              type="submit"
            >
              로그인
            </Button>
          </form>
          {/* 라인 */}
          <div className="h-[1px] w-full bg-[#DDE1E6]" />
          {/* 하단 영역 */}
          <div className="w-full text-center text-body5 text-gray-900">
            아직 계정이 없으신가요?{" "}
            <a
              onClick={() => navigate("/signup")}
              className="cursor-pointer text-primary-700 underline"
            >
              회원가입
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
