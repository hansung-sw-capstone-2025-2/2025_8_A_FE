import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArchiveIcon from "@/assets/icons/ic_archive";
import EditIcon from "@/assets/icons/ic_edit";
import MenuIcon from "@/assets/icons/ic_menu";
import MyPageMenu from "@/components/my-page-menu";

export default function SideBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleEditClick = () => {
    navigate("/home");
  };

  const handleArchiveClick = () => {
    navigate("/home/library");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-20 flex h-screen flex-col items-start justify-between overflow-hidden px-4 py-5 shadow-md backdrop-blur-xl transition-all duration-300 ease-in-out ${
        isOpen ? "w-[200px] bg-white/70" : "w-[72px]"
      }`}
    >
      <div className="flex flex-col items-start justify-start gap-[60px]">
        <button
          type="button"
          onClick={toggleSidebar}
          className="cursor-pointer rounded-lg border-none bg-transparent p-[8px] outline-none transition-colors duration-200 hover:bg-primary-100"
        >
          <MenuIcon />
        </button>
        <div className="flex w-full flex-col items-start justify-start gap-[40px]">
          <div className="relative h-[36px]">
            <button
              type="button"
              onClick={handleEditClick}
              className={`absolute top-0 left-0 flex h-[36px] cursor-pointer items-center rounded-lg border-none bg-transparent p-[8px] outline-none transition-colors duration-200 hover:bg-primary-100 ${
                isOpen ? "pr-[12px]" : ""
              }`}
            >
              <div className="flex h-[20px] w-[20px] flex-shrink-0 items-center justify-center">
                <EditIcon />
              </div>
              {isOpen && (
                <span className="ml-[12px] whitespace-nowrap text-body3 text-gray-950">
                  홈
                </span>
              )}
            </button>
          </div>
          <div className="relative h-[36px]">
            <button
              type="button"
              onClick={handleArchiveClick}
              className={`absolute top-0 left-0 flex h-[36px] cursor-pointer items-center rounded-lg border-none bg-transparent p-[8px] outline-none transition-colors duration-200 hover:bg-primary-100 ${
                isOpen ? "pr-[12px]" : ""
              }`}
            >
              <div className="flex h-[20px] w-[20px] flex-shrink-0 items-center justify-center">
                <ArchiveIcon />
              </div>
              {isOpen && (
                <span className="ml-[12px] whitespace-nowrap text-body3 text-gray-950">
                  라이브러리
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <MyPageMenu position="sidebar" iconSize={32} />
    </div>
  );
}
