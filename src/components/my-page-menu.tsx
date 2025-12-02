import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import MyPageIcon from "@/assets/icons/ic_mypage";

type MenuPosition = "header" | "sidebar";

interface MyPageMenuProps {
  position?: MenuPosition;
  iconSize?: number;
}

export default function MyPageMenu({
  position = "header",
  iconSize = 24,
}: MyPageMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("user_email") || "user@example.com";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !target.closest('[data-mypage-menu="true"]')
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_email");

    navigate("/");
    setIsOpen(false);
  };

  const getMenuPosition = () => {
    if (!buttonRef.current) return {};

    const rect = buttonRef.current.getBoundingClientRect();

    if (position === "sidebar") {
      return {
        left: `${rect.right + 12}px`,
        bottom: `${window.innerHeight - rect.bottom}px`,
      };
    }

    // header position
    return {
      right: `${window.innerWidth - rect.right}px`,
      top: `${rect.bottom + 12}px`,
    };
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        className="cursor-pointer transition-opacity hover:opacity-70"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MyPageIcon width={iconSize} height={iconSize} />
      </button>
      {isOpen &&
        buttonRef.current &&
        createPortal(
          <div
            data-mypage-menu="true"
            className="fixed z-[9999] w-[200px] rounded-lg bg-white py-[8px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
            style={getMenuPosition()}
          >
            <div className="border-gray-200 border-b px-[16px] py-[12px]">
              <div className="font-semibold text-body3 text-gray-950">
                사용자 정보
              </div>
            </div>
            <div className="px-[16px] py-[12px]">
              <div className="mb-[4px] text-body4 text-gray-700">이메일</div>
              <div className="text-body4 text-gray-950">{userEmail}</div>
            </div>
            <div className="border-gray-200 border-t">
              <button
                type="button"
                className="w-full px-[16px] py-[12px] text-left text-body4 text-gray-700 transition-colors hover:bg-gray-100 hover:text-primary-700"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
