export default function SocialAuth() {
  return (
    <>
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-200" />
        <span className="px-3 text-sm text-gray-600">Or sign up with</span>
        <div className="flex-grow h-px bg-gray-200" />
      </div>

      <div className="flex gap-4 mb-2">
        <button className="allbutton flex-1 border border-gray-200 rounded-full py-3 text-sm font-medium">
          Google
        </button>
        <button className="flex-1 border border-gray-200 rounded-full py-3 text-sm font-medium hover:bg-[#FFEA00]">
          GitHub
        </button>
      </div>
    </>
  );
}
