import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import DownloadIcon from "@/assets/icons/ic_download";
import TrashIcon from "@/assets/icons/ic_trash";
import Button from "./button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  type?: "delete" | "save";
  onSave?: (inputValue: string) => void;
  onDelete?: () => void;
}

export default function Modal({
  open,
  onClose,
  title = "항목 삭제",
  description = "선택된 항목을 삭제하시겠습니까?",
  type = "delete",
  onSave,
  onDelete,
}: ModalProps) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!open) {
      setInputValue("");
    }
  }, [open]);

  const handleAction = () => {
    if (type === "save" && onSave) {
      onSave(inputValue);
      onClose();
    } else if (type === "delete" && onDelete) {
      onDelete();
      onClose();
    }
  };

  if (!open) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex w-full items-center justify-center bg-black/50">
      <div className="flex flex-col items-center justify-start gap-[20px] rounded-2xl bg-white px-[52px] py-[32px] opacity-100">
        <div className="flex w-full items-center justify-start gap-[20px]">
          <div
            className={`flex items-center justify-center rounded-full bg-${
              type === "delete" ? "error-ctr" : "success-ctr"
            } p-[10px]`}
          >
            {type === "delete" ? (
              <TrashIcon width={20} height={20} color="#8C1D18" />
            ) : (
              <DownloadIcon width={20} height={20} color="#14632B" />
            )}
          </div>
          <div>
            <div className="text-black text-h5">{title}</div>
            <div className="text-body5 text-gray-800">{description}</div>
          </div>
        </div>
        {type === "save" && (
          <div className="flex w-full flex-col items-end justify-start gap-[4px]">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                if (e.target.value.length <= 50) {
                  setInputValue(e.target.value);
                }
              }}
              maxLength={50}
              className="w-full rounded-lg border border-gray-700 px-[20px] py-[8px] text-body5 placeholder:text-body5 placeholder:text-gray-700 focus:outline-none"
              placeholder="라이브러리 이름"
            />
            <div className="text-caption text-gray-500">
              {inputValue.length}/50자
            </div>
          </div>
        )}
        <div className="flex w-[320px] items-center justify-center gap-[12px]">
          <Button
            variant="outlined"
            size="medium"
            fullWidth
            borderColor="gray-700"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            variant="filled"
            size="medium"
            fullWidth
            bgColor={type === "delete" ? "error-default" : "success-default"}
            textColor="white"
            onClick={handleAction}
            disabled={type === "save" && !inputValue.trim()}
          >
            {type === "delete" ? "삭제" : "저장"}
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
