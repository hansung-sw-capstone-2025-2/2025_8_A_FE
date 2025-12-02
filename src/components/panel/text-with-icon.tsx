export default function TextWithIcon({
  icon,
  text,
  title,
  type = "profile",
}: {
  icon: React.ReactNode;
  text?: string;
  title?: string;
  type?: "profile" | "detail";
}) {
  return type === "profile" ? (
    <div className="flex items-center justify-start gap-[4px]">
      {icon}
      <div className="text-black text-body5">{text}</div>
    </div>
  ) : (
    <div className="flex items-center justify-start gap-[7px]">
      {icon}
      <div className="text-body4 text-gray-950">{title}</div>
      <div className="text-black text-body4">{text}</div>
    </div>
  );
}
