import InputField from "../ui/InputField";

// Reusable Footer Component
export function FooterDetails({ footerText, footerAction }) {
  return (
    <p className="text-sm text-[var(--gray-600)] text-center mt-2">
      {footerText}{" "}
      <span className="text-[var(--black)] font-semibold cursor-pointer hover:underline hover:decoration-[var(--yellow-primary)] hover:decoration-2">
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
      <h1 className="flex items-center justify-center text-3xl font-bold text-[var(--gray-900)] mb-2 ml-4">{title}</h1>
      {subtitle && <p className="flex items-center justify-center font-semibold text-[var(--gray-600)] mb-2 text-base mr-7">{subtitle}</p>}
      <div className="grid grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name} className={field.halfWidth ? "col-span-1" : "col-span-2"}>
            <InputField {...field} />
          </div>
        ))}
      </div>

      <button className="w-full allbutton font-semibold mt-5 py-3 rounded-full transition-all duration-300 shadow-md">
        {buttonText}
      </button>

      {footerText && <FooterDetails footerText={footerText} footerAction={footerAction} />}
    </>
  );
}
