import type { InternalAxiosRequestConfig } from "axios";
import axios, { type AxiosError } from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    skipGlobalLoading?: boolean;
  }
}

const apiClient = axios.create({
  baseURL: import.meta.env.DEV ? "/api" : "https://api.difflens.site",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: string) => void;
  reject: (reason?: unknown) => void;
}> = [];

// 전역 로딩 스피너 관리
let loadingShowCallback: (() => void) | null = null;
let loadingHideCallback: (() => void) | null = null;

export const setLoadingCallbacks = (
  showCallback: () => void,
  hideCallback: () => void
) => {
  loadingShowCallback = showCallback;
  loadingHideCallback = hideCallback;
};

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token ?? undefined);
    }
  });
  failedQueue = [];
};

// 토큰이 필요 없는 엔드포인트 목록
const publicEndpoints = ["/auth/login/local", "/auth/signup/local"];

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    if (!config.skipGlobalLoading) {
      loadingShowCallback?.();
    }

    // 공개 엔드포인트인지 확인
    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    // 리프레시 토큰 갱신 요청인 경우
    if (config.url?.includes("/auth/reissue")) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        config.headers.Authorization = `Bearer ${refreshToken}`;
      }
    } else if (!isPublicEndpoint) {
      // 공개 엔드포인트가 아닌 경우 access_token 추가
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    // 에러 시에도 로딩 스피너 숨김
    loadingHideCallback?.();
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리 및 리프레시 토큰 처리)
apiClient.interceptors.response.use(
  (response) => {
    // 성공
    if (!response.config.skipGlobalLoading) {
      loadingHideCallback?.();
    }
    return response;
  },
  async (error: AxiosError) => {
    // 에러
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
      skipGlobalLoading?: boolean;
    };

    if (!originalRequest.skipGlobalLoading) {
      loadingHideCallback?.();
    }

    // 401
    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      originalRequest.url?.includes(endpoint)
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isPublicEndpoint
    ) {
      if (isRefreshing) {
        // 이미 리프레시 중이면 대기열에 추가
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        // 리프레시 토큰이 없으면 로그인 페이지로 이동
        processQueue(error);
        isRefreshing = false;
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // 리프레시 토큰을 헤더에 담아서 새로운 access_token 발급
        const response = await axios.post(
          `${
            import.meta.env.DEV ? "/api" : "https://api.difflens.site"
          }/auth/reissue`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const { access_token, refresh_token: newRefreshToken } =
          response.data.result;

        localStorage.setItem("access_token", access_token);
        if (newRefreshToken) {
          localStorage.setItem("refresh_token", newRefreshToken);
        }

        // 대기 중인 요청들에 새 토큰 전달
        processQueue(null, access_token);

        // 원래 요청 재시도
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        }
        isRefreshing = false;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // 리프레시 실패 시 로그인 페이지로 이동
        processQueue(refreshError as AxiosError);
        isRefreshing = false;
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
