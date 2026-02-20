export function AlgoHeader() {
  return (
    <section className="pt-20 px-8">
      <h1 className="text-3xl font-bold mb-2">Binary Search</h1>

      <p className="text-gray-600 max-w-2xl">
        An efficient algorithm for finding an item from a sorted list of items.
        It works by repeatedly dividing the search interval in half.
      </p>

      <div className="flex gap-3 mt-4">
        <span className="px-3 flex items-center justify-center rounded-full allbutton text-sm font-semibold">
          Medium
        </span>
        <span className="px-3 py-1 flex items-center justify-center rounded-full border text-sm">
          Searching
        </span>
        <span className="px-3 py-1 flex items-center justify-center rounded-full border text-sm">
          Arrays
        </span>

        <button className="ml-auto allbutton px-5 py-2 rounded-full font-bold">
          Start Learning ↓
        </button>
      </div>
    </section>
    
  );
}
export function VideoAndSummary() {
  return (
    <section className="grid md:grid-cols-3 gap-6 px-8 py-12">
      {/* Video */}
      <div className="md:col-span-2 bg-gray-200 rounded-xl flex items-center justify-center h-64">
        <button className="bg-[#FFEA00] w-14 h-14 rounded-full font-bold">
          ▶
        </button>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl p-6 border">
        <h4 className="font-bold mb-4">Quick Summary</h4>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>• Divide and Conquer</li>
          <li>• Iterative Approach</li>
          <li>• Recursive Approach</li>
          <li>• Time Complexity</li>
        </ul>
      </div>
    </section>
  );
}
export function ComplexitySection() {
  return (
    <section className="grid md:grid-cols-3 gap-6 px-8">
      <div className="p-6 bg-[#FFFDE6] rounded-xl">
        <h4 className="font-semibold">Time Complexity</h4>
        <p className="text-2xl font-bold mt-2">O(log n)</p>
      </div>

      <div className="p-6 bg-[#FFFDE6] rounded-xl">
        <h4 className="font-semibold">Space Complexity</h4>
        <p className="text-2xl font-bold mt-2">O(1)</p>
      </div>

      <div className="p-6 bg-[#FFFDE6] rounded-xl">
        <h4 className="font-semibold">Key Principle</h4>
        <p className="text-sm mt-2 text-gray-600">
          Search space is reduced by half in every step.
        </p>
      </div>
    </section>
  );
}