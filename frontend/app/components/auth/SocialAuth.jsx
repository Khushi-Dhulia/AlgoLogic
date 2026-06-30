export default function SocialAuth() {
  return (
    <>
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-[var(--gray-200)]" />
        <span className="px-3 text-sm text-[var(--gray-600)]">Or sign up with</span>
        <div className="flex-grow h-px bg-[var(--gray-200)]" />
      </div>

      <div className="flex gap-4 mb-2">
        <button className="allbutton flex-1 border border-[var(--gray-200)] rounded-full py-3 text-sm font-medium">
          Google
        </button>
        <button className="allbutton flex-1 border border-[var(--gray-200)] rounded-full py-3 text-sm font-medium hover:bg-[var(--yellow-primary)]">
          GitHub
        </button>
      </div>
    </>
  );
}
