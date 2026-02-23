"use client";

import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function ArrayVisualizer() {
  const [input, setInput] = useState("4,7,2,9");
  const [value, setValue] = useState("");
  const [arr, setArr] = useState([]);
  const [operation, setOperation] = useState("push");

  const containerRef = useRef(null);
  const boxRefs = useRef([]);

  /* ---------- LAYOUT ANIMATION FOR RE-INDEXING ---------- */
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      boxRefs.current,
      { x: 20, opacity: 0.8 },
      {
        x: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.05,
      }
    );
  }, [arr]);

  /* ---------- CREATE ARRAY ---------- */
  const createArray = () => {
    const parsed = input
      .split(",")
      .map((n) => Number(n.trim()))
      .filter((n) => !isNaN(n));

    setArr(parsed);
  };

  /* ---------- RESET ---------- */
  const resetAll = () => {
    gsap.killTweensOf("*"); // stop running animations
    setArr([]);
    setValue("");
    setOperation("push");
  };

  /* ---------- APPLY OPERATION ---------- */
  const applyOperation = () => {
    if (!arr.length) return;

    // PUSH
    if (operation === "push" && value !== "") {
      setArr([...arr, Number(value)]);
    }

    // POP
    if (operation === "pop") {
      const last = boxRefs.current[arr.length - 1];
      gsap.to(last, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        onComplete: () => setArr(arr.slice(0, -1)),
      });
      return;
    }

    // SHIFT
    if (operation === "shift") {
      const first = boxRefs.current[0];

      gsap.to(first, {
        x: -40,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setArr(arr.slice(1));
        },
      });
      return;
    }

    // UNSHIFT
    if (operation === "unshift" && value !== "") {
      setArr([Number(value), ...arr]);
    }

    setValue("");
  };

  return (
    <section className="bg-white mx-8 mt-6 p-10 rounded-2xl border shadow-sm space-y-10">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Array Operations
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Observe how indices change when array operations are applied.
        </p>
      </div>

      {/* CREATE ARRAY */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">1️⃣ Create Array</h3>

        <div className="flex gap-4">
          <input
            className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-yellow-400 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            onClick={createArray}
            className="bg-[#FFEA00] px-6 py-2 rounded-lg font-semibold hover:scale-105 transition"
          >
            Create
          </button>

          {arr.length > 0 && (
            <button
              onClick={resetAll}
              className="border px-6 py-2 rounded-lg font-semibold text-gray-600 hover:bg-gray-100 transition"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* OPERATIONS */}
      {arr.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">2️⃣ Choose Operation</h3>

          <div className="flex gap-4 flex-wrap items-center">
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="border px-4 py-2 rounded-lg"
            >
              <option value="push">push() – add at end</option>
              <option value="pop">pop() – remove last</option>
              <option value="shift">shift() – remove first</option>
              <option value="unshift">unshift() – add at start</option>
            </select>

            {(operation === "push" || operation === "unshift") && (
              <input
                className="border px-4 py-2 rounded-lg"
                placeholder="Value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            )}

            <button
              onClick={applyOperation}
              className="bg-yellow-100 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-200 transition"
            >
              Apply
            </button>
          </div>

          <p className="text-sm text-gray-500">
            {operation === "shift" &&
              "All remaining elements shift left → index decreases by 1"}
          </p>
        </div>
      )}

      {/* VISUALIZATION */}
      {arr.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">3️⃣ Visualization</h3>

          <div
            ref={containerRef}
            className="flex gap-6 items-start"
          >
            {arr.map((num, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  ref={(el) => (boxRefs.current[i] = el)}
                  className="w-16 h-16 bg-[#FFF9C4] rounded-xl
                             flex items-center justify-center
                             font-bold text-lg shadow-md"
                >
                  {num}
                </div>

                <span className="text-xs text-gray-500 mt-2">
                  index {i}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}