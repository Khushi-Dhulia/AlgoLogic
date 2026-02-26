"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function LinearSearch() {

  const [array, setArray] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [activeIndex, setActiveIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);

  const [message, setMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  /* ---------- ADD ---------- */
  const addNumber = () => {
    if (!inputValue || isSearching) return;

    setArray([...array, Number(inputValue)]);
    setInputValue("");
  };

  /* ---------- SEARCH ---------- */
  const startSearch = async () => {

    if (!searchValue || isSearching || array.length === 0) return;

    setIsSearching(true);
    setFoundIndex(null);
    setMessage("Starting Linear Search...");

    for (let i = 0; i < array.length; i++) {

      setActiveIndex(i);
      setMessage(`Checking index ${i}`);

      await sleep(700);

      if (array[i] === Number(searchValue)) {

        setFoundIndex(i);
        setActiveIndex(null);

        setMessage(`✅ Found at index ${i}`);
        setIsSearching(false);
        return;
      }
    }

    setActiveIndex(null);
    setMessage("❌ Value not found");
    setIsSearching(false);
  };

  const reset = () => {

    if (isSearching) return;

    setArray([]);
    setSearchValue("");
    setActiveIndex(null);
    setFoundIndex(null);
    setMessage("");
  };

  return (

    <section className="bg-white m-8 p-8 rounded-2xl border shadow space-y-6">

      <h2 className="text-3xl font-bold">
        Linear Search Visualizer
      </h2>

      {/* INPUTS */}
      <div className="flex gap-4 flex-wrap">

        <input
          type="number"
          placeholder="Add number"
          value={inputValue}
          disabled={isSearching}
          onChange={(e) => setInputValue(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        />

        <button
          onClick={addNumber}
          disabled={isSearching}
          className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold"
        >
          Add
        </button>

        <input
          type="number"
          placeholder="Search value"
          value={searchValue}
          disabled={isSearching}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        />

        <button
          onClick={startSearch}
          disabled={isSearching}
          className="border px-5 py-2 rounded-lg text-blue-600"
        >
          Search
        </button>

        <button
          onClick={reset}
          disabled={isSearching}
          className="border px-5 py-2 rounded-lg"
        >
          Reset
        </button>

      </div>


      {/* MAIN LAYOUT */}
      <div className="flex gap-8">

        {/* LEFT → ARRAY */}
        <div className="flex-1 border rounded-xl p-6 bg-gray-50 flex gap-4 flex-wrap min-h-[200px]">

          {array.length === 0 && (
            <div className="text-gray-400">
              Add numbers to begin
            </div>
          )}

          {array.map((item, index) => (

            <div key={index} className="flex flex-col items-center">

              <div className="text-xs text-gray-500">
                {index}
              </div>

              <div
                className={`w-16 h-16 rounded-lg flex items-center justify-center font-bold transition-all duration-300

                ${foundIndex === index
                  ? "bg-green-500 text-white scale-110"
                  : activeIndex === index
                  ? "bg-yellow-400 scale-110"
                  : "bg-yellow-200"
                }
                `}
              >
                {item}
              </div>

            </div>

          ))}

        </div>


        {/* RIGHT → DETAILS PANEL */}
        <div className="w-64 border rounded-xl p-6 bg-white shadow space-y-4">

          {/* STATUS */}
          <div>

            <div className="font-semibold text-gray-700">
              Status
            </div>

            <div className="text-blue-600 text-sm mt-1 min-h-[40px]">
              {message || "Waiting to start..."}
            </div>

          </div>


          {/* POINTER INFO */}
          <div className="space-y-2 text-sm">

            <div>
              🔍 Current Index: {activeIndex ?? "-"}
            </div>

            <div>
              ✅ Found Index: {foundIndex ?? "-"}
            </div>

            <div>
              📊 Array Size: {array.length}
            </div>

          </div>


          {/* LEGEND */}
          <div className="border-t pt-3 text-sm space-y-1">

            <div className="font-medium">
              Legend
            </div>

            <div>🟡 Checking element</div>
            <div>🟢 Found element</div>
            <div>⬜ Not checked</div>

          </div>
        </div>

      </div>

    </section>

  );
}