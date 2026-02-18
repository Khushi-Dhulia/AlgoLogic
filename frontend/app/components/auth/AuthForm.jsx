import InputField from "../ui/InputField";

// Reusable Footer Component
export function FooterDetails({ footerText, footerAction }) {
  return (
    <p className="text-sm text-gray-600 text-center mt-2">
      {footerText}{" "}
      <span className="text-black font-semibold cursor-pointer hover:underline hover:decoration-[#FFEA00] hover:decoration-2">
        {footerAction}
      </span>
    </p>
  );
}

// Main AuthForm
export default function AuthForm({
  title,
  subtitle,
  fields,
  buttonText,
  footerText,
  footerAction,
}) {
  return (
    <>
      {/* <h1 className="text-3xl font-bold text-gray-900 mb-2 ml-7 mt-2">{title}</h1> */}
      <h1 className="flex items-center justify-center text-3xl font-bold text-gray-900 mb-2 ml-4">{title}</h1>

      {subtitle && <p className="flex items-center justify-center text-gray-600 mb-2 text-sm mr-7">{subtitle}</p>}

      <div className="grid grid-cols-2 gap-2">
        {fields.map((field) => (
          <div key={field.name} className={field.halfWidth ? "col-span-1" : "col-span-2"}>
            <InputField {...field} />
          </div>
        ))}
      </div>

      <button className="w-full allbutton font-semibold pt-2 py-3 rounded-full transition-all duration-300 shadow-md">
        {buttonText}
      </button>

      {footerText && <FooterDetails footerText={footerText} footerAction={footerAction} />}
    </>
  );
}

