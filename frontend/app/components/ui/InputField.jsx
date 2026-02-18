export default function InputField({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  rightIcon: RightIcon,
  name,
}) {
  return (
    <div className="mb-4">
      <label className="reglabel">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 ml-93" />
        )}

        {RightIcon && (
          <RightIcon className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" />
        )}

        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
        />
      </div>
    </div>
  );
}
