export default function InputField({
  label,
  name,
  type,
  placeholder,
  icon: Icon,
  rightIcon: RightIcon,
  extra
}) {
  return (
    <div className="flex flex-col gap-1">

      {/* LABEL + EXTRA */}
      <div className="flex justify-between items-center">
        <label className="font-bold text-sm">
          {label}
        </label>

        {extra && extra}
      </div>

      {/* INPUT */}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        )}

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="w-full border rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {RightIcon && (
          <RightIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400 cursor-pointer" />
        )}
      </div>

    </div>
  );
}