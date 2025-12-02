import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createPortal } from "react-dom";
import {
  addSearchHistoryToLibrary,
  createLibrary,
  getLibraries,
} from "@/api/library";
import DownloadIcon from "@/assets/icons/ic_download";
import Button from "@/components/button";

interface SaveLibraryModalProps {
  open: boolean;
  onClose: () => void;
  searchHistoryId: number;
  onSuccess?: () => void;
}

export default function SaveLibraryModal({
  open,
  onClose,
  searchHistoryId,
  onSuccess,
}: SaveLibraryModalProps) {
  const [saveType, setSaveType] = useState<"new" | "existing">("new");
  const [libraryName, setLibraryName] = useState("");
  const [tags, setTags] = useState("");
  const [selectedLibraryId, setSelectedLibraryId] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useQuery({
    queryKey: ["libraries"],
    queryFn: async () => {
      const response = await getLibraries();
      if (response.is_success) {
        return response.result.libraries;
      }
      return [];
    },
    enabled: open && saveType === "existing",
  });

  const libraries = data ?? [];

  const handleClose = () => {
    setLibraryName("");
    setTags("");
    setSelectedLibraryId(null);
    setSaveType("new");
    onClose();
  };

  const handleSave = async () => {
    if (isLoading) return;

    if (saveType === "new") {
      // Create new library
      if (!libraryName.trim()) {
        alert("라이브러리 이름을 입력해주세요.");
        return;
      }

      try {
        setIsLoading(true);
        const tagArray = tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0);

        const response = await createLibrary({
          search_history_id: searchHistoryId,
          library_name: libraryName,
          tags: tagArray,
          panel_ids: null,
        });

        if (response.is_success) {
          alert("새 라이브러리가 생성되었습니다.");
          handleClose();
          onSuccess?.();
        }
      } catch (error) {
        console.error("Failed to create library:", error);
        alert("라이브러리 생성에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    } else {
      // Add to existing library
      if (!selectedLibraryId) {
        alert("라이브러리를 선택해주세요.");
        return;
      }

      try {
        setIsLoading(true);
        const response = await addSearchHistoryToLibrary(
          selectedLibraryId,
          searchHistoryId
        );

        if (response.is_success) {
          alert(
            `라이브러리에 ${response.result.panel_count}명의 패널이 추가되었습니다.`
          );
          handleClose();
          onSuccess?.();
        }
      } catch (error) {
        console.error("Failed to merge library:", error);
        alert("라이브러리 병합에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isDisabled = () => {
    if (saveType === "new") {
      return !libraryName.trim() || isLoading;
    }
    return !selectedLibraryId || isLoading;
  };

  if (!open) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex w-full items-center justify-center bg-black/50"
      data-modal="save-library"
    >
      <div className="flex w-[500px] flex-col items-start justify-start gap-[20px] rounded-2xl bg-white px-[40px] py-[32px]">
        {/* Header */}
        <div className="flex w-full items-center justify-start gap-[16px]">
          <div className="flex items-center justify-center rounded-full bg-success-ctr p-[10px]">
            <DownloadIcon width={20} height={20} color="#14632B" />
          </div>
          <div>
            <div className="text-black text-h5">라이브러리 저장</div>
            <div className="text-body5 text-gray-800">
              새 라이브러리를 생성하거나 기존 라이브러리에 추가하세요
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex w-full flex-col gap-[20px]">
          {/* Radio buttons */}
          <div className="flex w-full items-center justify-start gap-[24px]">
            <label className="flex cursor-pointer items-center gap-[8px]">
              <input
                type="radio"
                name="saveType"
                value="new"
                checked={saveType === "new"}
                onChange={() => setSaveType("new")}
                className="h-[16px] w-[16px] cursor-pointer accent-tertiary-500"
              />
              <span className="text-body3 text-gray-950">
                새 라이브러리 생성
              </span>
            </label>
            <label className="flex cursor-pointer items-center gap-[8px]">
              <input
                type="radio"
                name="saveType"
                value="existing"
                checked={saveType === "existing"}
                onChange={() => setSaveType("existing")}
                className="h-[16px] w-[16px] cursor-pointer accent-tertiary-500"
              />
              <span className="text-body3 text-gray-950">
                기존 라이브러리에 추가
              </span>
            </label>
          </div>

          {/* Conditional content based on saveType */}
          {saveType === "new" ? (
            <div className="flex w-full flex-col gap-[16px]">
              <div className="flex w-full flex-col gap-[8px]">
                <label
                  htmlFor="library-name"
                  className="text-body4 text-gray-950"
                >
                  라이브러리 이름 *
                </label>
                <input
                  id="library-name"
                  type="text"
                  value={libraryName}
                  onChange={(e) => setLibraryName(e.target.value)}
                  placeholder="라이브러리 이름을 입력하세요"
                  className="w-full rounded-lg border border-gray-300 px-[16px] py-[12px] text-body3 text-gray-950 placeholder:text-gray-400 focus:border-tertiary-500 focus:outline-none"
                />
              </div>
              <div className="flex w-full flex-col gap-[8px]">
                <label htmlFor="tags" className="text-body4 text-gray-950">
                  태그 (쉼표로 구분)
                </label>
                <input
                  id="tags"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="예: 20대, 여성, 서울"
                  className="w-full rounded-lg border border-gray-300 px-[16px] py-[12px] text-body3 text-gray-950 placeholder:text-gray-400 focus:border-tertiary-500 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="flex max-h-[400px] w-full flex-col gap-[12px] overflow-y-auto">
              {libraries.length === 0 ? (
                <div className="py-[40px] text-center text-gray-500">
                  저장된 라이브러리가 없습니다.
                </div>
              ) : (
                libraries.map((library) => (
                  <div
                    key={library.library_id}
                    onClick={() => setSelectedLibraryId(library.library_id)}
                    className={`cursor-pointer rounded-lg border px-[20px] py-[16px] ${
                      selectedLibraryId === library.library_id
                        ? "border-tertiary-500 bg-tertiary-50"
                        : "border-gray-300 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="text-body3 text-gray-950">
                      {library.library_name}
                    </div>
                    <div className="text-caption text-gray-600">
                      패널 수: {library.panel_count}명
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-[8px] flex w-full justify-end gap-[12px]">
            <Button
              variant="outlined"
              size="medium"
              onClick={handleClose}
              disabled={isLoading}
            >
              취소
            </Button>
            <Button
              variant="filled"
              size="medium"
              onClick={handleSave}
              disabled={isDisabled()}
            >
              {saveType === "new" ? "생성" : "추가"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
