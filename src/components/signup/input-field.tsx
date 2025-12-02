export default function InputField({
  label,
  type,
  placeholder,
  description,
  error = false,
  id,
}: {
  label: string;
  type: string;
  placeholder: string;
  description: string;
  error?: boolean;
  id?: string;
}) {
  return (
    <div className="flex w-full flex-col gap-[4px]">
      <div className="flex w-full flex-col gap-[8px]">
        <div className="w-full text-left text-body5 text-primary-900">
          {label}
        </div>
        <input
          id={id}
          type={type}
          className="w-full border-primary-900 border-x-0 border-t-0 border-b-1 bg-opacity-800 px-[16px] py-[12px] placeholder:text-body4 placeholder:text-gray-500 focus:outline-none"
          placeholder={placeholder}
        />
      </div>
      {description && (
        <div
          className={`w-full text-left text-caption ${
            error ? "text-error-default" : "text-gray-600"
          }`}
        >
          {description}
        </div>
      )}
    </div>
  );
}
