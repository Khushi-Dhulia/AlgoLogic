"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function BinarySearch() {
  const [array, setArray] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const [low, setLow] = useState(null);
  const [high, setHigh] = useState(null);
  const [mid, setMid] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);

  const [message, setMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const addNumber = () => {
    if (!inputValue || isSearching) return;

    const num = Number(inputValue);
    const newArray = [...array, num].sort((a, b) => a - b);

    setArray(newArray);
    setInputValue("");
  };

  const startSearch = async () => {
    if (!searchValue || isSearching || array.length === 0) return;

    setIsSearching(true);

    let left = 0;
    let right = array.length - 1;

    setMessage("Starting Binary Search...");
    setFoundIndex(null);

    while (left <= right) {
      const middle = Math.floor((left + right) / 2);

      setLow(left);
      setHigh(right);
      setMid(middle);

      setMessage(`Checking index ${middle}`);
      await sleep(800);

      if (array[middle] === Number(searchValue)) {
        setFoundIndex(middle);
        setMessage(`✅ Found at index ${middle}`);
        setIsSearching(false);
        return;
      }

      if (array[middle] < Number(searchValue)) {
        setMessage("Searching Right Half");
        left = middle + 1;
      } else {
        setMessage("Searching Left Half");
        right = middle - 1;
      }

      await sleep(800);
    }

    setMessage("❌ Value not found");
    setIsSearching(false);
  };

  const reset = () => {
    if (isSearching) return;

    setArray([]);
    setLow(null);
    setHigh(null);
    setMid(null);
    setFoundIndex(null);
    setMessage("");
    setSearchValue("");
  };

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow space-y-6">
      <h2 className="text-3xl font-bold">
        Binary Search Visualizer
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
          Add & Sort
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
        {/* LEFT SIDE → ARRAY */}
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
                  : mid === index
                  ? "bg-yellow-400 scale-110"
                  : index === low
                  ? "bg-blue-400 text-white"
                  : index === high
                  ? "bg-red-400 text-white"
                  : "bg-yellow-200"
                }
                `}
              >
                {item}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE → DETAILS PANEL */}
        <div className="w-64 border rounded-xl p-6 bg-white space-y-4 shadow">
          <div>
            <div className="font-bold text-gray-700">
              Status
            </div>

            <div className="text-blue-600 text-sm mt-1 min-h-[40px]">
              {message || "Waiting to start..."}
            </div>
          </div>

          <div className="space-y-2 text-sm">

            <div>
              🔵 Low Index: {low ?? "-"}
            </div>

            <div>
              🔴 High Index: {high ?? "-"}
            </div>

            <div>
              🟡 Mid Index: {mid ?? "-"}
            </div>

            <div>
              🟢 Found Index: {foundIndex ?? "-"}
            </div>
          </div>
          <div className="border-t pt-3 text-sm space-y-1">
            <div className="font-bold text-lg">Color Key:</div>
            <div>🔵 Low Pointer</div>
            <div>🔴 High Pointer</div>
            <div>🟡 Middle Pointer</div>
            <div>🟢 Found Value</div>
          </div>
        </div>
      </div>
    </section>
  );
}