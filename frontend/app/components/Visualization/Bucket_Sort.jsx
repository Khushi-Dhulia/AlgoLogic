"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function BucketSort() {
  const [array, setArray] = useState([]);
  const [buckets, setBuckets] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState("");

  const speed = 500; // fixed speed
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

  const clearAll = () => {
    if (isRunning) return;
    setArray([]);
    setBuckets([]);
    setActiveIndex(null);
    setError("");
  };

  const startBucketSort = async () => {
    if (isRunning || array.length === 0) return;

    setIsRunning(true);

    const arr = [...array];
    const bucketCount = 5;
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = (max - min + 1) / bucketCount;

    let tempBuckets = Array.from({ length: bucketCount }, () => []);

    // Distribute into buckets
    for (let i = 0; i < arr.length; i++) {
      setActiveIndex(i);
      await sleep(speed);

      const bucketIndex = Math.floor((arr[i] - min) / range);
      const index = Math.min(bucketIndex, bucketCount - 1);
      tempBuckets[index].push(arr[i]);

      setBuckets([...tempBuckets]);
      await sleep(speed);
    }

    // Sort each bucket
    for (let i = 0; i < bucketCount; i++) {
      tempBuckets[i].sort((a, b) => a - b);
      setBuckets([...tempBuckets]);
      await sleep(speed);
    }

    // Merge buckets
    const sortedArray = tempBuckets.flat();
    setArray(sortedArray);
    setActiveIndex(null);
    setIsRunning(false);
  };

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow">

      {/* Header */}
      <h2 className="text-3xl font-bold mb-6">Bucket Sort</h2>

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
          onClick={startBucketSort}
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

        {/* LEFT — Original Array + Buckets */}
        <div className="lg:col-span-3 border rounded-xl p-4 bg-gray-50 flex flex-col gap-4 h-full min-h-[320px]">

          {/* Original Array */}
          <div className="flex items-end gap-2 h-40 border rounded-lg p-4 bg-gray-100">
            {array.length === 0 && (
              <div className="text-gray-400 text-sm">Add values to begin...</div>
            )}

            {array.map((value, index) => (
              <div
                key={index}
                className={`w-10 flex items-end justify-center text-xs font-bold text-white transition-all duration-300 ${
                  index === activeIndex ? "bg-red-500" : "bg-blue-500"
                }`}
                style={{ height: `${(value / maxValue) * 100}%` }}
              >
                {value}
              </div>
            ))}
          </div>

          {/* Buckets */}
          {buckets.length > 0 && (
            <div className="space-y-4">
              {buckets.map((bucket, i) => (
                <div key={i} className="border p-3 rounded-lg bg-gray-100">
                  <div className="text-sm mb-2">Bucket {i + 1}</div>
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
          )}

        </div>

        {/* RIGHT — Side Panel */}
        <div className="border rounded-xl p-4 bg-white space-y-4 flex flex-col h-full">

          {/* Legend */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Legend</h3>
            <div className="text-sm space-y-2">
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-500 rounded"></div> Original Array</div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-500 rounded"></div> Currently distributing</div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-500 rounded"></div> Inside bucket</div>
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
              Bucket Sort distributes elements into buckets, sorts each bucket, and then merges them into a final sorted array.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}