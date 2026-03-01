"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function HeapSort() {
  const [input, setInput] = useState("");
  const [array, setArray] = useState([]);
  const [active, setActive] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [sortedIndex, setSortedIndex] = useState([]);
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const maxValue = Math.max(...array, 1);
  const speed = 400;

  /* ---------- ADD VALUE ---------- */
  const addValue = () => {
    setError("");

    if (!input) return;

    if (array.length >= 20) {
      setError("Maximum 20 values allowed");
      return;
    }

    const num = Number(input);

    if (isNaN(num) || num < 0) {
      setError("Enter a valid non-negative number");
      return;
    }

    if (num > 200) {
      setError("Maximum value allowed is 200");
      return;
    }

    setArray([...array, num]);
    setInput("");
  };

  /* ---------- RESET ---------- */
  const reset = () => {
    if (isRunning) return;
    setArray([]);
    setSortedIndex([]);
    setActive([]);
    setSwapping([]);
    setError("");
  };

  /* ---------- HEAPIFY ---------- */
  const heapify = async (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      setActive([i, left]);
      await sleep(speed);

      if (arr[left] > arr[largest]) largest = left;
    }

    if (right < n) {
      setActive([largest, right]);
      await sleep(speed);

      if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== i) {
      setSwapping([i, largest]);
      await sleep(speed);

      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);

      setSwapping([]);

      await heapify(arr, n, largest);
    }

    setActive([]);
  };

  /* ---------- START SORT ---------- */
  const startSort = async () => {
    if (isRunning || array.length === 0) return;

    setIsRunning(true);

    let arr = [...array];
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      setSwapping([0, i]);
      await sleep(speed);

      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);

      setSortedIndex((prev) => [...prev, i]);

      setSwapping([]);

      await heapify(arr, i, 0);
    }

    setSortedIndex((prev) => [...prev, 0]);
    setIsRunning(false);
  };

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow">
      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-6">Heap Sort</h2>

      {/* CONTROLS */}
      <div className="flex flex-wrap gap-3 mb-2">
        <input
          type="number"
          value={input}
          disabled={isRunning}
          min="0"
          max="200"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter number (0–200)"
          className="border px-3 py-2 rounded-lg w-48"
        />

        <button
          onClick={addValue}
          disabled={isRunning || array.length >= 20}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Add
        </button>

        <button
          onClick={startSort}
          disabled={isRunning}
          className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          Sort
        </button>

        <button
          onClick={reset}
          disabled={isRunning}
          className="border px-5 py-2 rounded-lg"
        >
          Clear
        </button>
      </div>

      {/* COUNT */}
      <div className="text-sm text-gray-500 mb-1">
        {array.length}/20 values used
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-4 font-medium">{error}</div>
      )}

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
        {/* LEFT PANEL */}
        <div className="lg:col-span-3 border rounded-xl p-4 bg-gray-50 h-full min-h-[320px] flex items-end gap-2">
          {array.length === 0 && (
            <div className="text-gray-400 text-sm">
              Add values to begin Heap Sort
            </div>
          )}

          {array.map((val, index) => {
            let bg = "bg-blue-500";

            if (sortedIndex.includes(index)) bg = "bg-green-500";
            else if (swapping.includes(index)) bg = "bg-red-500";
            else if (active.includes(index)) bg = "bg-yellow-400";

            return (
              <div
                key={index}
                className={`w-10 flex items-end justify-center text-xs font-bold text-white transition-all duration-300 ${bg}`}
                style={{
                  height: `${(val / maxValue) * 100}%`,
                  minHeight: "20px",
                }}
              >
                {val}
              </div>
            );
          })}
        </div>

        {/* RIGHT PANEL */}
        <div className="border rounded-xl p-4 bg-white space-y-4 h-full flex flex-col">
          {/* Color Key */}
          <div>
            <h3 className="font-bold text-lg mb-2">Color key</h3>

            <div className="text-sm space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                Unsorted Element
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                Comparing
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                Swapping
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