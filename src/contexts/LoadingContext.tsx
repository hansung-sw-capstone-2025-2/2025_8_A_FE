import {
  createContext,
  type ReactNode,
  useContext,
  useRef,
  useState,
} from "react";

interface LoadingContextType {
  isLoading: boolean;
  loadingMessage: string | null;
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  setLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const requestCountRef = useRef(0);

  const showLoading = (message?: string) => {
    requestCountRef.current += 1;
    if (requestCountRef.current > 0) {
      setIsLoading(true);
      if (message) {
        setLoadingMessage(message);
      }
    }
  };

  const hideLoading = () => {
    requestCountRef.current = Math.max(0, requestCountRef.current - 1);
    if (requestCountRef.current === 0) {
      setIsLoading(false);
      setLoadingMessage(null);
    }
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
    requestCountRef.current = loading ? 1 : 0;
    if (!loading) {
      setLoadingMessage(null);
    }
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        loadingMessage,
        showLoading,
        hideLoading,
        setLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
