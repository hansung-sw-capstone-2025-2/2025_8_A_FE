import MailIcon from "@/assets/icons/ic_mail";
import LogoContainer from "@/assets/logos/logo_container";

type Transparency = "on" | "off";

interface FooterProps {
  transparency?: Transparency;
}

const baseClasses = "flex items-start justify-between px-[80px] py-[40px]";
const transparencyClasses = {
  on: "",
  off: "bg-primary-50",
};

const copyrightClasses = {
  on: "text-white",
  off: "text-gray-600",
};

const mailIconClasses = {
  on: "white",
  off: "black",
};

export default function Footer({ transparency = "off" }: FooterProps) {
  const transparencyClass = transparencyClasses[transparency];
  const copyrightClass = copyrightClasses[transparency];
  const mailIconClass = mailIconClasses[transparency];
  return (
    <div className={`${baseClasses} ${transparencyClass}`}>
      <LogoContainer width={128} height={26} />
      <div className="flex flex-col items-end gap-[8px]">
        <MailIcon color={mailIconClass} />
        <div className={`text-body5 ${copyrightClass}`}>
          Copyright© 2025. DiffLens. All rights reserved.
        </div>
      </div>
    </div>
  );
}
