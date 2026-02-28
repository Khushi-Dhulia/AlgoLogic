"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function CountingSort() {
  const [array, setArray] = useState([]);
  const [countArray, setCountArray] = useState([]);
  const [outputArray, setOutputArray] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCountIndex, setActiveCountIndex] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState("");

  const speed = 400; // fixed speed
  const maxValue = Math.max(...array, 1);

  // ADD VALUE WITH VALIDATION
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

    if (num < 0) {
      setError("Minimum value allowed is 0");
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
    setCountArray([]);
    setOutputArray([]);
    setActiveIndex(null);
    setActiveCountIndex(null);
    setError("");
  };

  const startCountingSort = async () => {
    if (isRunning || array.length === 0) return;

    setIsRunning(true);

    const arr = [...array];
    const max = Math.max(...arr);
    const count = Array(max + 1).fill(0);
    const output = Array(arr.length).fill(null);

    setCountArray([...count]);
    setOutputArray([...output]);

    // Step 1: Count occurrences
    for (let i = 0; i < arr.length; i++) {
      setActiveIndex(i);
      setActiveCountIndex(arr[i]);
      await sleep(speed);

      count[arr[i]]++;
      setCountArray([...count]);
      await sleep(speed);
    }

    // Step 2: Prefix sum
    for (let i = 1; i < count.length; i++) {
      setActiveCountIndex(i);
      await sleep(speed);

      count[i] += count[i - 1];
      setCountArray([...count]);
      await sleep(speed);
    }

    // Step 3: Build output (stable)
    for (let i = arr.length - 1; i >= 0; i--) {
      setActiveIndex(i);
      setActiveCountIndex(arr[i]);
      await sleep(speed);

      output[count[arr[i]] - 1] = arr[i];
      count[arr[i]]--;
      setOutputArray([...output]);
      setCountArray([...count]);
      await sleep(speed);
    }

    setArray([...output]);
    setActiveIndex(null);
    setActiveCountIndex(null);
    setIsRunning(false);
  };

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6">Counting Sort</h2>

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
          onClick={startCountingSort}
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
      <div className="text-sm text-gray-500 mb-1">
        {array.length}/20 values used
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-500 text-sm mb-4 font-medium">{error}</div>
      )}

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
        {/* LEFT — Arrays Visualization */}
        <div className="lg:col-span-3 border rounded-xl p-4 bg-gray-50 flex flex-col gap-4 h-full min-h-[320px]">
          {/* Original Array */}
          <div>
            <h3 className="font-semibold mb-2">Original Array</h3>
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

          {/* Count Array */}
          {countArray.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Count Array</h3>
              <div className="flex gap-2 flex-wrap">
                {countArray.map((val, i) => (
                  <div
                    key={i}
                    className={`w-12 h-12 flex flex-col items-center justify-center rounded-lg text-white ${
                      i === activeCountIndex ? "bg-purple-500" : "bg-green-500"
                    }`}
                  >
                    <div className="text-xs">{i}</div>
                    <div className="font-bold">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Output Array */}
          {outputArray.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Output Array</h3>
              <div className="flex gap-2 h-4 items-end">
                {outputArray.map((val, i) => (
                  <div
                    key={i}
                    className="w-10 h-6 pb-1 flex items-end justify-center text-xs font-bold text-white rounded-lg bg-yellow-500"
                  >
                    {val !== null ? val : "-"}
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
            <h3 className="font-bold text-lg mb-2">Legend</h3>
            <div className="text-sm space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div> Original
                Array
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div> Current
                element
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div> Count Array
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded"></div> Active
                count index
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div> Output
                Array
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