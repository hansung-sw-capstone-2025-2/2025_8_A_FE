import { Outlet } from "react-router-dom";
import Header from "@/components/header";
import SideBar from "@/components/side-bar";
import { DashboardProvider, useDashboard } from "@/contexts/DashboardContext";

function DashboardContent() {
  const { searchId, totalCount } = useDashboard();

  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FBEEFF 0.5%, #D1E4FE 100%)",
      }}
    >
      <main>
        <div className="relative z-0 h-full w-full">
          <div className="absolute top-[124px] left-[624px] h-[342px] w-[342px] rounded-full bg-secondary-100 blur-3xl" />
          <div className="absolute top-[347px] left-[219px] h-[501px] w-[501px] rounded-full bg-primary-300 blur-3xl" />
          <div className="absolute top-[512px] left-[841px] h-[413px] w-[413px] rounded-full bg-tertiary-200 blur-3xl" />
        </div>
        <div className="z-10 flex h-full w-full">
          <SideBar />
          <div className="z-10 ml-[72px] w-full">
            <Header
              isLoggedIn="true"
              dashboard="true"
              searchId={searchId}
              totalCount={totalCount}
            />
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
