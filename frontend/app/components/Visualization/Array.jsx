"use client";

import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

export default function Array() {
  const [input, setInput] = useState("4,7,2,9");
  const [value, setValue] = useState("");
  const [arr, setArr] = useState([]);
  const [operation, setOperation] = useState("push");

  const containerRef = useRef(null);
  const boxRefs = useRef([]);

  /* ---------- ANIMATION ---------- */
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      boxRefs.current,
      { x: 20, opacity: 0.7 },
      {
        x: 0,
        opacity: 1,
        duration: 0.35,
        stagger: 0.05,
      },
    );
  }, [arr]);

  /* ---------- CREATE ---------- */
  const createArray = () => {
    const parsed = input
      .split(",")
      .map((n) => Number(n.trim()))
      .filter((n) => !isNaN(n));

    setArr(parsed);
  };

  /* ---------- RESET ---------- */
  const resetAll = () => {
    gsap.killTweensOf("*");

    setArr([]);
    setValue("");
    setOperation("push");
  };

  /* ---------- APPLY ---------- */
  const applyOperation = () => {
    if (!arr.length) return;

    if (operation === "push" && value !== "") {
      setArr([...arr, Number(value)]);
    }

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

    if (operation === "shift") {
      const first = boxRefs.current[0];

      gsap.to(first, {
        x: -40,
        opacity: 0,
        duration: 0.3,
        onComplete: () => setArr(arr.slice(1)),
      });

      return;
    }

    if (operation === "unshift" && value !== "") {
      setArr([Number(value), ...arr]);
    }

    setValue("");
  };

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow">
      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-6">Array Operations</h2>
      {/* CREATE */}
      <div className="flex gap-3 mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border px-3 py-2 rounded-lg w-60"
        />

        <button
          onClick={createArray}
          className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold"
        >
          Create
        </button>

        {arr.length > 0 && (
          <button onClick={resetAll} className="border px-5 py-2 rounded-lg">
            Reset
          </button>
        )}
      </div>
      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT PANEL */}
        <div className="lg:col-span-3 border rounded-xl p-6 bg-gray-50 space-y-6">
          {/* OPERATIONS */}
          {arr.length > 0 && (
            <div className="flex gap-3 flex-wrap items-center">
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                className="border px-3 py-2 rounded-lg"
              >
                <option value="push">push()</option>
                <option value="pop">pop()</option>
                <option value="shift">shift()</option>
                <option value="unshift">unshift()</option>
              </select>

              {(operation === "push" || operation === "unshift") && (
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Value"
                  className="border px-3 py-2 rounded-lg w-32"
                />
              )}

              <button
                onClick={applyOperation}
                className="bg-yellow-100 px-5 py-2 rounded-lg font-semibold"
              >
                Apply
              </button>
            </div>
          )}

          {/* VISUAL */}
          {arr.length === 0 && (
            <div className="text-gray-400 text-sm">Array is empty</div>
          )}

          <div ref={containerRef} className="flex gap-6 flex-wrap">
            {arr.map((num, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  ref={(el) => (boxRefs.current[i] = el)}
                  className="w-16 h-16 bg-yellow-100
                             flex items-center justify-center
                             rounded-xl font-bold shadow"
                >
                  {num}
                </div>

                <span className="text-xs text-gray-500 mt-1">index {i}</span>
              </div>
            ))}
          </div>
        </div>
        {/* RIGHT SIDE PANEL */}
        <div className="border rounded-xl p-4 bg-white space-y-4">
          {/* COLOR KEY */}
          <div>
            <h3 className="font-bold text-lg mb-2">Color Key</h3>
            <div className="space-y-2 text-sm">
              <div className="flex gap-2 items-center">
                <div className="w-4 h-4 bg-yellow-100 border rounded"></div>
                Array Element
              </div>

              <div className="flex gap-2 items-center">
                <div className="w-4 h-4 bg-white border rounded"></div>
                Empty Space
              </div>
            </div>
          </div>
          {/* STAUTS */}
          <div className="pt-2 border-t">
            <h3 className="font-bold text-lg mb-2">Status</h3>
            <div className="text-sm space-y-1">
              <div>
                <span className="font-semibold">Size: </span>
                {arr.length}
              </div>

              <div>
                <span className="font-semibold">First Element:</span>{" "}
                {arr.length ? arr[0] : "None"}
              </div>

              <div>
                <span className="font-semibold">Last Element:</span>{" "}
                {arr.length ? arr[arr.length - 1] : "None"}
              </div>

              <div>
                <span className="font-semibold">Current Operation:</span>{" "}
                {operation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
