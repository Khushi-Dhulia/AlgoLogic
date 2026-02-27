"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function RadixSort() {
  const [array, setArray] = useState([]);
  const [buckets, setBuckets] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [digitPlace, setDigitPlace] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState("");

  const maxValue = Math.max(...array, 1);
  const speed = 400; // fixed speed

  // Add value with validation
  const addValue = () => {
    setError("");
    if (!inputValue) return;

    if (array.length >= 20) {
      setError("Maximum 20 values allowed");
      return;
    }

    const num = Number(inputValue);
    if (isNaN(num) || num < 0) {
      setError("Please enter a non-negative integer");
      return;
    }

    if (num > 200) {
      setError("Maximum value allowed is 200");
      return;
    }

    setArray((prev) => [...prev, num]);
    setInputValue("");
  };

  const clearAll = () => {
    if (isRunning) return;
    setArray([]);
    setBuckets([]);
    setDigitPlace(1);
    setActiveIndex(null);
    setError("");
  };

  const getMax = (arr) => Math.max(...arr);

  const startRadixSort = async () => {
    if (isRunning || array.length === 0) return;

    setIsRunning(true);
    let arr = [...array];
    const max = getMax(arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      setDigitPlace(exp);
      arr = await countingSortByDigit(arr, exp);
    }

    setBuckets([]);
    setActiveIndex(null);
    setArray(arr);
    setIsRunning(false);
  };

  const countingSortByDigit = async (arr, exp) => {
    const output = Array(arr.length).fill(0);
    let bucketTemp = Array.from({ length: 10 }, () => []);

    // Distribute into buckets
    for (let i = 0; i < arr.length; i++) {
      setActiveIndex(i);
      await sleep(speed);

      const digit = Math.floor(arr[i] / exp) % 10;
      bucketTemp[digit].push(arr[i]);

      setBuckets([...bucketTemp]);
      await sleep(speed);
    }

    // Merge buckets
    let index = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < bucketTemp[i].length; j++) {
        output[index++] = bucketTemp[i][j];
        await sleep(speed);
      }
    }

    setArray([...output]);
    return output;
  };

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow">

      {/* Header */}
      <h2 className="text-3xl font-bold mb-6">Radix Sort</h2>

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
          onClick={startRadixSort}
          disabled={isRunning}
          className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          Sort
        </button>

        <button
          onClick={clearAll}
          disabled={isRunning}
          className="border px-5 py-2 rounded-lg"
        >
          Clear
        </button>
      </div>

      {/* Remaining slots */}
      <div className="text-sm text-gray-500 mb-1">{array.length}/20 values used</div>
      {error && <div className="text-red-500 text-sm mb-4 font-medium">{error}</div>}

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">

        {/* LEFT — Array & Buckets */}
        <div className="lg:col-span-3 border rounded-xl p-4 bg-gray-50 flex flex-col gap-4 h-full min-h-[320px]">

          {/* Current Digit Place */}
          {isRunning && (
            <div className="text-lg font-semibold text-purple-600">
              Sorting by Digit Place: {digitPlace}
            </div>
          )}

          {/* Main Array */}
          <div>
            <h3 className="font-semibold mb-2">Array</h3>
            <div className="flex gap-2 h-25 items-end">
              {array.map((val, i) => (
                <div
                  key={i}
                  className={`w-10 flex items-end justify-center text-xs font-bold text-white transition-all duration-300 ${
                    i === activeIndex ? "bg-red-500" : "bg-blue-500"
                  }`}
                  style={{ height: `${(val / maxValue) * 100}%` }}
                >
                  {val}
                </div>
              ))}
            </div>
          </div>

          {/* Buckets */}
          {buckets.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Buckets (0–9)</h3>
              <div className="space-y-2">
                {buckets.map((bucket, i) => (
                  <div key={i} className="border p-2 rounded-lg bg-gray-100">
                    <div className="text-sm mb-1">Digit {i}</div>
                    <div className="flex gap-2 flex-wrap">
                      {bucket.map((val, idx) => (
                        <div
                          key={idx}
                          className="w-12 h-12 flex items-center justify-center bg-green-500 text-white rounded-lg"
                        >
                          {val}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT — Side Panel */}
        <div className="border rounded-xl p-4 bg-white space-y-4 flex flex-col h-full">

          {/* Legend */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Legend</h3>
            <div className="text-sm space-y-2">
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-500 rounded"></div> Array</div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-500 rounded"></div> Active Element</div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-500 rounded"></div> Inside Bucket</div>
            </div>
          </div>

          {/* Limits */}
          <div className="pt-4 border-t">
            <h3 className="font-semibold text-lg mb-2">Limits</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div><strong>Maximum Values:</strong> 20</div>
              <div><strong>Number Range:</strong> 0 – 200</div>
            </div>
          </div>

          {/* Info */}
          <div className="pt-4 border-t">
            <h3 className="font-semibold text-lg mb-2">Info</h3>
            <p className="text-sm text-gray-600">
              Radix Sort sorts numbers digit by digit, from least significant to most significant, using counting sort for each digit. It is stable and efficient for non-negative integers.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}