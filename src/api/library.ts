import type {
  CompareLibrariesApiResponse,
  CompareLibrariesRequest,
  CreateLibraryRequest,
  LibraryApiResponse,
  LibraryDetailApiResponse,
  LibraryListApiResponse,
  MergeSearchHistoryApiResponse,
} from "@/types/library";
import apiClient from "./client";

// 라이브러리 생성
export const createLibrary = async (
  data: CreateLibraryRequest
): Promise<LibraryApiResponse> => {
  const response = await apiClient.post<LibraryApiResponse>("/libraries", data);
  return response.data;
};

// 라이브러리 목록 조회
export const getLibraries = async (): Promise<LibraryListApiResponse> => {
  const response = await apiClient.get<LibraryListApiResponse>("/libraries");
  return response.data;
};

// 특정 라이브러리 상세 조회
export const getLibraryById = async (
  libraryId: number
): Promise<LibraryDetailApiResponse> => {
  const response = await apiClient.get<LibraryDetailApiResponse>(
    `/libraries/${libraryId}`
  );
  return response.data;
};

// 라이브러리 비교
export const compareLibraries = async (
  data: CompareLibrariesRequest
): Promise<CompareLibrariesApiResponse> => {
  const response = await apiClient.post<CompareLibrariesApiResponse>(
    "/libraries/compare",
    data,
    {
      timeout: 60000,
    }
  );
  return response.data;
};

// 라이브러리에 검색 기록 추가(병합)
export const addSearchHistoryToLibrary = async (
  libraryId: number,
  searchHistoryId: number
): Promise<MergeSearchHistoryApiResponse> => {
  const response = await apiClient.put<MergeSearchHistoryApiResponse>(
    `/libraries/${libraryId}/search-histories/${searchHistoryId}`
  );
  return response.data;
};
