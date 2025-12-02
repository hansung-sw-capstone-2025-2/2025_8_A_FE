import { createContext, type ReactNode, useContext, useState } from "react";

interface DashboardContextType {
  searchId: string | undefined;
  totalCount: number;
  setDashboardData: (searchId: string, totalCount: number) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [searchId, setSearchId] = useState<string>();
  const [totalCount, setTotalCount] = useState(0);

  const setDashboardData = (newSearchId: string, newTotalCount: number) => {
    setSearchId(newSearchId);
    setTotalCount(newTotalCount);
  };

  return (
    <DashboardContext.Provider
      value={{ searchId, totalCount, setDashboardData }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
