"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function InsertionSort() {

  const [array, setArray] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [compareIndex, setCompareIndex] = useState(null);
  const [sortedIndex, setSortedIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState("");

  const speed = 400;

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
    setSortedIndex(-1);
    setActiveIndex(null);
    setCompareIndex(null);
    setError("");
  };

  const startInsertionSort = async () => {
    if (isRunning || array.length === 0) return;

    setIsRunning(true);
    const arr = [...array];

    for (let i = 1; i < arr.length; i++) {

      let key = arr[i];
      let j = i - 1;

      setActiveIndex(i);
      await sleep(speed);

      while (j >= 0 && arr[j] > key) {

        setCompareIndex(j);
        await sleep(speed);

        arr[j + 1] = arr[j];
        setArray([...arr]);

        j--;
        await sleep(speed);
      }

      arr[j + 1] = key;
      setArray([...arr]);

      setSortedIndex(i);
      setCompareIndex(null);

      await sleep(speed);
    }

    setActiveIndex(null);
    setCompareIndex(null);
    setSortedIndex(arr.length - 1);
    setIsRunning(false);
  };

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow">

      {/* Header */}
      <h2 className="text-3xl font-bold mb-6">
        Insertion Sort
      </h2>

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
          onClick={startInsertionSort}
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
        <div className="text-red-500 text-sm mb-4 font-medium">
          {error}
        </div>
      )}

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">

        {/* LEFT Visualization */}
        <div className="lg:col-span-3 border rounded-xl p-4 bg-gray-50 h-full min-h-[320px] flex items-end gap-2">

          {array.length === 0 && (
            <div className="text-gray-400 text-sm">
              Add values to begin...
            </div>
          )}

          {array.map((value, index) => {

            let color = "bg-blue-500";

            if (index <= sortedIndex) color = "bg-green-500";
            if (index === activeIndex) color = "bg-yellow-500";
            if (index === compareIndex) color = "bg-red-500";

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

          {/* Legend */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Legend</h3>

            <div className="text-sm space-y-2">

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                Unsorted
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                Sorted Portion
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                Current Key
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                Comparing
              </div>

            </div>
          </div>

          {/* Limits */}
          <div className="pt-4 border-t">
            <h3 className="font-semibold text-lg mb-2">Limits</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div>
                <strong>Maximum Values:</strong> 20
              </div>
              <div>
                <strong>Number Range:</strong> 0 – 200
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="pt-4 border-t">
            <h3 className="font-semibold text-lg mb-2">Info</h3>
            <p className="text-sm text-gray-600">
              Insertion Sort builds the sorted array one element at a time.
              It takes each element and inserts it into its correct position
              in the already sorted portion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}