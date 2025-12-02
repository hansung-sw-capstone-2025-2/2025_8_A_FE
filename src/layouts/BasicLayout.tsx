import { Outlet } from "react-router-dom";

export default function BasicLayout() {
  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FBEEFF 0.5%, #D1E4FE 100%)",
      }}
    >
      <main>
        <div className="relative z-0 h-full w-full">
          {/* 피그마 시안대로 blur-[197.3px]로 하면 블러 효과가 너무 강해서 blur-3xl로 변경 */}
          <div className="absolute top-[124px] left-[624px] h-[342px] w-[342px] rounded-full bg-secondary-100 blur-3xl" />
          <div className="absolute top-[347px] left-[219px] h-[501px] w-[501px] rounded-full bg-primary-300 blur-3xl" />
          <div className="absolute top-[512px] left-[841px] h-[413px] w-[413px] rounded-full bg-tertiary-200 blur-3xl" />
        </div>
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
