"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function BubbleSort() {
  const [array, setArray] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [compareIndices, setCompareIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState("");

  const speed = 400; // fixed speed
  const maxValue = Math.max(...array, 1);

  // Add value with validation
  const addValue = () => {
    setError("");
    if (!inputValue) return;

    if (array.length >= 20) {
      setError("Maximum 20 values allowed");
      return;
    }

    const num = Number(inputValue);
    if (isNaN(num)) {
      setError("Please enter a valid number");
      return;
    }

    if (num > 200) {
      setError("Maximum value allowed is 200");
      return;
    }

    if (num < 0) {
      setError("Minimum value allowed is 0");
      return;
    }

    setArray((prev) => [...prev, num]);
    setInputValue("");
  };

  const clearArray = () => {
    if (isRunning) return;
    setArray([]);
    setSortedIndices([]);
    setCompareIndices([]);
    setError("");
  };

  const startBubbleSort = async () => {
    if (isRunning || array.length === 0) return;

    setIsRunning(true);
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      let swapped = false;

      for (let j = 0; j < n - i - 1; j++) {
        setCompareIndices([j, j + 1]);
        await sleep(speed);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          swapped = true;
          await sleep(speed);
        }
      }
      setSortedIndices((prev) => [...prev, n - i - 1]);
      if (!swapped) break;
    }

    setCompareIndices([]);
    setSortedIndices(arr.map((_, i) => i));
    setIsRunning(false);
  };

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6">Bubble Sort</h2>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-2">
        <input
          type="number"
          value={inputValue}
          disabled={isRunning}
          min="0"
          max="200"
          onChange={(e) => setInputValue(e.target.value)}
          className="border px-3 py-2 rounded-lg w-48"
          placeholder="Enter number (0–200)"
        />

        <button
          onClick={addValue}
          disabled={isRunning || array.length >= 20}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Add
        </button>

        <button
          onClick={startBubbleSort}
          disabled={isRunning}
          className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          Sort
        </button>

        <button
          onClick={clearArray}
          disabled={isRunning}
          className="border px-5 py-2 rounded-lg"
        >
          Clear
        </button>
      </div>

      {/* Remaining slots */}
      <div className="text-sm text-gray-500 mb-1">
        {array.length}/20 values used
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-500 text-sm mb-4 font-medium">{error}</div>
      )}

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
        {/* LEFT Visualization */}
        <div className="lg:col-span-3 border rounded-xl p-4 bg-gray-50 h-full min-h-[320px] flex items-end gap-2">
          {array.length === 0 && (
            <div className="text-gray-400 text-sm">Add values to begin...</div>
          )}

          {array.map((value, index) => {
            let color = "bg-blue-500";
            if (sortedIndices.includes(index)) color = "bg-green-500";
            if (compareIndices.includes(index)) color = "bg-red-500";

            return (
              <div
                key={index}
                className={`w-10 flex items-end justify-center text-xs font-bold text-white rounded transition-all duration-300 ${color}`}
                style={{ height: `${(value / maxValue) * 100}%` }}
              >
                {value}
              </div>
            );
          })}
        </div>

        {/* RIGHT Panel */}
        <div className="border rounded-xl p-4 bg-white space-y-4 h-full flex flex-col">
          {/* Color Key */}
          <div>
            <h3 className="font-bold text-lg mb-2">Color Key</h3>
            <div className="text-sm space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div> Unsorted
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div> Comparing
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div> Sorted
                (bubbled to end)
              </div>
            </div>
          </div>

          {/* Limits */}
          <div className="pt-4 border-t">
            <h3 className="font-bold text-lg mb-2">Limits</h3>
            <div className="text-sm space-y-1">
              <div>
                <strong>Maximum Values:</strong> 20
              </div>
              <div>
                <strong>Number Range:</strong> 0 – 200
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}