"use client";
import { useState } from "react";

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
export function Video_Section(){
  return(
  <section className="p-8">
    <div className="grid grid-cols-3 gap-10">
          {/* VIDEO SIDE */}
          <div className="col-span-2 space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-neutral-800">
                Video Explanation
              </h2>
              <span className="text-sm text-neutral-400">12 min watch</span>
            </div>

            <div className="bg-[#e5e5e2] rounded-[32px] p-10 shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]">
              <div className="relative bg-[#dcdcd8] h-[360px] rounded-[28px] flex items-center justify-center shadow-[0_15px_30px_rgba(0,0,0,0.08)]">
                {/* Play Button */}
                <button className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg hover:scale-105 transition">
                  <div className="ml-1 w-0 h-0 border-l-[10px] border-l-black border-y-[6px] border-y-transparent" />
                </button>
              </div>
            </div>
          </div>

          {/* QUICK SUMMARY */}
          <div className="bg-[var(--yellow-background)] border-[var(--yellow-border)] border-2 rounded-[28px] p-8 shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
            <h3 className="text-lg font-semibold text-neutral-800 mb-8">
              Quick Summary
            </h3>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-neutral-200" />

              <ul className="space-y-8 text-sm text-neutral-500">
                {/* Active Item */}
                <li className="relative flex gap-4">
                  <div className="relative z-10">
                    <div className="w-4 h-4 rounded-full bg-yellow-400" />
                  </div>
                  <div>
                    <p className="text-neutral-700 font-medium">0:00 - 2:15</p>
                    <p>Concept of "Divide and Conquer"</p>
                  </div>
                </li>

                {/* Other Items */}
                <li className="relative flex gap-4">
                  <div className="relative z-10">
                    <div className="w-4 h-4 rounded-full bg-neutral-300" />
                  </div>
                  <div>
                    <p className="text-neutral-700 font-medium">2:16 - 5:40</p>
                    <p>Iterative Implementation</p>
                  </div>
                </li>

                <li className="relative flex gap-4">
                  <div className="relative z-10">
                    <div className="w-4 h-4 rounded-full bg-neutral-300" />
                  </div>
                  <div>
                    <p className="text-neutral-700 font-medium">5:41 - 9:00</p>
                    <p>Recursive Implementation</p>
                  </div>
                </li>

                <li className="relative flex gap-4">
                  <div className="relative z-10">
                    <div className="w-4 h-4 rounded-full bg-neutral-300" />
                  </div>
                  <div>
                    <p className="text-neutral-700 font-medium">9:01 - 12:00</p>
                    <p>Time Complexity Analysis</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </section>);
}
export function Complexity_Section(){
  return( 
<section  className="p-8">
    <div className="grid grid-cols-3 gap-10">
          {/* Time Complexity */}
          <div className="bg-[var(--yellow-background)] border-[var(--yellow-border)] border-2 rounded-[28px] p-8 shadow-[0_6px_18px_rgba(0,0,0,0.04)]">
            <p className="text-xs uppercase tracking-wider text-neutral-500 mb-3">
              Time Complexity
            </p>
            <h3 className="text-3xl font-bold text-neutral-800">O(log n)</h3>
            <span className="text-green-600 text-sm font-medium">
              Best Case
            </span>
            <p className="text-sm text-neutral-500 mt-3">
              Significantly faster than linear search for large datasets.
            </p>
          </div>

          {/* Space Complexity */}
          <div className="bg-[var(--yellow-background)] border-[var(--yellow-border)] border-2 rounded-[28px] p-8 shadow-[0_6px_18px_rgba(0,0,0,0.04)]">
            <p className="text-xs uppercase tracking-wider text-neutral-500 mb-3">
              Space Complexity
            </p>
            <h3 className="text-3xl font-bold text-neutral-800">O(1)</h3>
            <p className="text-sm text-neutral-500 mt-3">
              Iterative approach. Recursive is O(log n).
            </p>
          </div>

          {/* Key Principle */}
          <div className="bg-[var(--yellow-background)] border-[var(--yellow-border)] border-2 rounded-[28px] p-8 shadow-[0_6px_18px_rgba(0,0,0,0.04)]">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">
              💡 Key Principle
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              The search space is reduced by half in every step. This
              logarithmic behavior makes binary search extremely efficient for
              large sorted arrays.
            </p>
          </div>
      </div></section>)
}
export function Implementation(){
  const [activeLang, setActiveLang] = useState("Python");

  const code = `def binary_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        # Check if target is present
        if arr[mid] == target:
            return mid

        # If target is greater, ignore left half
        elif arr[mid] < target:
            left = mid + 1

        # If target is smaller, ignore right half
        else:
            right = mid - 1

    return -1`;

  return(
<section><div className="bg-white rounded-[32px] p-10 shadow-[0_8px_20px_rgba(0,0,0,0.04)] space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-neutral-800">
              Implementation
            </h2>

            <div className="flex items-center gap-6">
              {["Python", "Java", "C++", "Go", "JavaScript"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`text-sm font-medium transition-all duration-200 ${
                    activeLang === lang
                      ? "bg-yellow-400 text-black px-4 py-1 rounded-full shadow-sm"
                      : "text-neutral-400 hover:text-neutral-600"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#f6f6f4] rounded-[24px] p-8 overflow-x-auto border border-neutral-200">
            <pre className="text-sm text-neutral-700 whitespace-pre-wrap leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        </div>
</section>)
}
export function DeepDiveSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const data = [
    {
      title: "Advantages & Disadvantages",
      content: (
        <div className="text-sm text-neutral-600 mt-4 space-y-2">
          <p><b>Advantages:</b></p>
          <ul className="list-disc ml-5">
            <li>Fast searching with O(log n) time complexity</li>
            <li>Efficient for large sorted datasets</li>
          </ul>

          <p className="mt-2"><b>Disadvantages:</b></p>
          <ul className="list-disc ml-5">
            <li>Works only on sorted arrays</li>
            <li>Not suitable for linked lists</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Real World Applications",
      content: (
        <div className="text-sm text-neutral-600 mt-4 space-y-2">
          <ul className="list-disc ml-5">
            <li>Searching in large databases</li>
            <li>Dictionary / word search systems</li>
            <li>Finding elements in sorted collections</li>
            <li>Used in many library search functions</li>
          </ul>
        </div>
      ),
    },
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-6 p-8">
      <h2 className="text-2xl font-bold text-neutral-800">Deep Dive</h2>

      {data.map((item, i) => (
        <div
          key={i}
          className="bg-[#ececea] rounded-[32px] px-8 py-6 hover:bg-[#e6e6e4] transition cursor-pointer"
          onClick={() => toggle(i)}
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">{item.title}</span>

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-neutral-500 transition-transform ${
                openIndex === i ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {openIndex === i && item.content}
        </div>
      ))}
    </div>
  );
}
export function SubmitAnswer(){
  return(<section className="p-8">
  <div className="relative overflow-hidden rounded-[36px] bg-[#f3f3f1] px-12 py-12 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
        {/* Right soft gradient glow */}
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-yellow-200/40 to-transparent pointer-events-none" />

        <div className="relative space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-neutral-800">
              Submit Your Solution
            </h3>
            <p className="text-sm text-neutral-500 mt-2">
              Solved a variation? Share your code with the community to earn points.
            </p>
          </div>

          <textarea
            placeholder="Paste your optimized solution here..."
            className="w-full h-44 rounded-[28px] bg-white border border-neutral-200 p-6 text-sm text-neutral-700 outline-none focus:ring-2 focus:ring-yellow-400 resize-none shadow-sm"
          />

          <div className="flex justify-between items-center">
            <button className="text-sm text-neutral-500 hover:text-neutral-700">
              Attach File
            </button>

            <button className="bg-yellow-400 px-7 py-2.5 rounded-full text-sm font-medium text-black shadow-md hover:scale-105 transition">
              Submit Solution
            </button>
          </div>
        </div>
      </div></section>)
}
export function Previous_Topic(){
  return(<div className="grid grid-cols-2 gap-10 p-8">
        {/* Previous */}
        <div className="bg-[#ececea] rounded-[32px] p-10 space-y-4">
          <p className="text-lg font-bold tracking-wider text-gray-600">
            Previous Topic
          </p>

          <h4 className="text-lg font-semibold text-neutral-800">
            Linear Search
          </h4>

          <div className="h-[3px] bg-neutral-300 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 w-full rounded-full" />
          </div>

          <p className="text-xs text-green-600">Completed</p>
        </div>

        {/* Next */}
        <div className="bg-[#ececea] rounded-[32px] p-8 space-y-4">
          <p className="text-lg font-bold tracking-wider text-gray-600">
            Next Topic
          </p>

          <h4 className="text-lg font-semibold text-neutral-800">
            Bubble Sort
          </h4>

          <div className="h-[3px] bg-neutral-300 rounded-full" />
          <p className="text-xs text-neutral-400">Start Learning</p>
        </div>
      </div>)
}
export function FAQ(){
  const [openFAQ, setOpenFAQ] = useState(null);
  return(      
  <div className="space-y-8 text-center pt-6 pb-6">
        <h3 className="text-xl font-semibold text-neutral-800">
          Frequently Asked Questions
        </h3>

        <div className="max-w-3xl mx-auto space-y-4 text-left">

          {[
            "Does Binary Search work on unsorted arrays?",
            "Why do we calculate mid as left + (right - left) / 2?"
          ].map((question, index) => (
            <div
              key={index}
              onClick={() =>
                setOpenFAQ(openFAQ === index ? null : index)
              }
              className="bg-[#ececea] rounded-[28px] px-8 py-6 cursor-pointer hover:bg-[#e6e6e4] transition"
            >
              <div className="flex justify-between items-center">
                <span className="text-[15px] font-medium text-neutral-700">
                  {question}
                </span>

                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`text-neutral-500 transition ${
                    openFAQ === index ? "rotate-180" : ""
                  }`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {openFAQ === index && (
                <p className="text-sm text-neutral-500 mt-4 leading-relaxed">
                  Binary search only works on sorted arrays. The algorithm relies
                  on ordered data to eliminate half of the search space at each step.
                </p>
              )}
            </div>
          ))}

        </div>
      </div>)
}