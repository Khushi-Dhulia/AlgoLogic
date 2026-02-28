"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function MergeSort() {
  const [array, setArray] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState("");
  const speed = 350;
  const maxValue = Math.max(...array, 1);

  // ADD VALUE WITH VALIDATION
  const addValue = () => {
    setError("");

    if (!inputValue) return;

    if (array.length >= 20) {
      setError("Maximum 20 values allowed");
      return;
    }

    const number = Number(inputValue);

    if (isNaN(number)) {
      setError("Please enter a valid number");
      return;
    }

    if (number > 200) {
      setError("Maximum value allowed is 200");
      return;
    }

    if (number < 0) {
      setError("Minimum value allowed is 0");
      return;
    }

    setArray((prev) => [...prev, number]);
    setInputValue("");
  };

  const clearArray = () => {
    if (isRunning) return;

    setArray([]);
    setActiveIndices([]);
    setSortedIndices([]);
    setError("");
  };

  const startMergeSort = async () => {
    if (isRunning || array.length === 0) return;

    setError("");
    setIsRunning(true);

    const arr = [...array];

    await mergeSort(arr, 0, arr.length - 1);

    setSortedIndices(arr.map((_, i) => i));
    setActiveIndices([]);
    setIsRunning(false);
  };

  async function mergeSort(arr, left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);

    await merge(arr, left, mid, right);
  }

  async function merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
      setActiveIndices([k]);

      await sleep(speed);

      if (leftArr[i] <= rightArr[j]) {
        arr[k++] = leftArr[i++];
      } else {
        arr[k++] = rightArr[j++];
      }

      setArray([...arr]);
    }

    while (i < leftArr.length) {
      setActiveIndices([k]);

      await sleep(speed);

      arr[k++] = leftArr[i++];
      setArray([...arr]);
    }

    while (j < rightArr.length) {
      setActiveIndices([k]);

      await sleep(speed);

      arr[k++] = rightArr[j++];
      setArray([...arr]);
    }
  }

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-6">Merge Sort</h2>

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
          onClick={startMergeSort}
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
            if (activeIndices.includes(index)) color = "bg-red-500";
            return (
              <div
                key={index}
                className={`w-10 flex items-end justify-center text-xs font-bold text-white rounded transition-all duration-300 ${color}`}
                style={{
                  height: `${(value / maxValue) * 100}%`,
                }}
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
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                Unsorted
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                Currently Merging
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                Sorted
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
