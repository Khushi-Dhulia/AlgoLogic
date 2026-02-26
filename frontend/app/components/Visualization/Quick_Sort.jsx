"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function QuickSort() {
  const [array, setArray] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [pivotIndex, setPivotIndex] = useState(null);
  const [compareIndex, setCompareIndex] = useState(null);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const speed = 400; // fixed speed

  const maxValue = Math.max(...array, 1);

  const addValue = () => {
    if (!inputValue) return;
    const num = Number(inputValue);
    if (isNaN(num)) return;

    setArray((prev) => [...prev, num]);
    setInputValue("");
  };

  const clearArray = () => {
    if (isRunning) return;
    setArray([]);
    setSortedIndices([]);
    setPivotIndex(null);
    setCompareIndex(null);
    setActiveIndices([]);
  };

  const startQuickSort = async () => {
    if (isRunning || array.length === 0) return;

    setIsRunning(true);

    const arr = [...array];
    await quickSort(arr, 0, arr.length - 1);

    setSortedIndices(arr.map((_, i) => i));
    setPivotIndex(null);
    setCompareIndex(null);
    setActiveIndices([]);
    setIsRunning(false);
  };

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      const pi = await partition(arr, low, high);

      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    setPivotIndex(high);

    let i = low - 1;

    for (let j = low; j < high; j++) {
      setCompareIndex(j);
      await sleep(speed);

      if (arr[j] < pivot) {
        i++;

        setActiveIndices([i, j]);

        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);

        await sleep(speed);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);

    setSortedIndices((prev) => [...prev, i + 1]);

    await sleep(speed);

    return i + 1;
  };

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow">

      {/* Header */}
      <h2 className="text-3xl font-bold mb-6">Quick Sort</h2>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6">

        <input
          type="number"
          value={inputValue}
          disabled={isRunning}
          onChange={(e) => setInputValue(e.target.value)}
          className="border px-3 py-2 rounded-lg w-40"
          placeholder="Enter number"
        />

        <button
          onClick={addValue}
          disabled={isRunning}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Add
        </button>

        <button
          onClick={startQuickSort}
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

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* LEFT — Visualization */}
        <div className="lg:col-span-3 border rounded-xl p-4 bg-gray-50 h-80 flex items-end gap-2">

          {array.length === 0 && (
            <div className="text-gray-400 text-sm">
              Add values to begin...
            </div>
          )}

          {array.map((value, index) => {

            let color = "bg-blue-500";

            if (sortedIndices.includes(index))
              color = "bg-green-500";

            if (index === pivotIndex)
              color = "bg-purple-500";

            if (index === compareIndex)
              color = "bg-red-500";

            if (activeIndices.includes(index))
              color = "bg-yellow-500";

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

        {/* RIGHT — Side Panel */}
        <div className="border rounded-xl p-4 bg-white space-y-4">

          <h3 className="font-semibold text-lg">
            Legend
          </h3>

          <div className="text-sm space-y-2">

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              Unsorted
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              Sorted
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              Pivot
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              Comparing
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              Swapping
            </div>

          </div>

          <div className="pt-4 border-t">

            <h3 className="font-semibold text-lg mb-2">
              Info
            </h3>

            <p className="text-sm text-gray-600">
              Quick Sort uses divide and conquer strategy.
              It selects a pivot and partitions the array
              around it recursively.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}