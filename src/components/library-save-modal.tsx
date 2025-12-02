import Modal from "./modal";

interface LibrarySaveModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (libraryName: string, tags: string[]) => void;
  totalCount?: number;
}

export default function LibrarySaveModal({
  open,
  onClose,
  onSave,
  totalCount = 0,
}: LibrarySaveModalProps) {
  const handleSave = (libraryName: string) => {
    if (libraryName.trim()) {
      const tags = [`응답 데이터 ${totalCount}개`];
      onSave(libraryName.trim(), tags);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="라이브러리 저장"
      description="저장할 라이브러리 이름을 입력해주세요."
      type="save"
      onSave={handleSave}
    />
  );
}
