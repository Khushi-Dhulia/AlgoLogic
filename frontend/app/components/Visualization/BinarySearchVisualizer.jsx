"use client";

import { useState, useRef } from "react";
import gsap from "gsap";

export default function BinarySearchVisualizer() {
  const [input, setInput] = useState("12,3,25,7,18,1");
  const [target, setTarget] = useState("");
  const [arr, setArr] = useState([]);
  const [error, setError] = useState("");

  const boxRefs = useRef([]);
  const windowRef = useRef(null);

  const visualize = () => {
    reset(false);
    setError("");

    const parsed = input
      .split(",")
      .map((n) => Number(n.trim()))
      .filter((n) => !isNaN(n));

    if (!parsed.length) {
      setError("Enter valid numbers.");
      return;
    }

    const t = Number(target || 0);

    if (!parsed.includes(t)) {
      setError("Target must exist in input array.");
      return;
    }

    const sorted = [...parsed].sort((a, b) => a - b);
    setArr(sorted);

    setTimeout(() => runBinarySearch(sorted, t), 400);
  };

  const runBinarySearch = (nums, target) => {
    gsap.killTweensOf("*");

    gsap.set(boxRefs.current, {
      opacity: 1,
      backgroundColor: "#FFF9C4",
      scale: 1,
    });

    let left = 0;
    let right = nums.length - 1;

    const tl = gsap.timeline();

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      // Slide active window
      tl.to(windowRef.current, {
        x: boxRefs.current[left].offsetLeft,
        width:
          boxRefs.current[right].offsetLeft -
          boxRefs.current[left].offsetLeft +
          boxRefs.current[right].offsetWidth,
        duration: 0.6,
        ease: "power2.out",
      });

      // Highlight mid
      tl.to(
        boxRefs.current[mid],
        {
          backgroundColor: "#FFEA00",
          scale: 1.2,
          duration: 0.4,
        },
        "<"
      );

      // Found
      if (nums[mid] === target) {
        tl.to(boxRefs.current[mid], {
          backgroundColor: "#4ADE80",
          scale: 1.3,
          duration: 0.4,
        });
        break;
      }

      // Discard LEFT (too small)
      if (nums[mid] < target) {
        for (let i = left; i <= mid; i++) {
          tl.to(
            boxRefs.current[i],
            {
              backgroundColor: "#FCA5A5", // red
              opacity: 0.7,
            },
            "<"
          );
        }
        left = mid + 1;
      }
      // Discard RIGHT (too large)
      else {
        for (let i = mid; i <= right; i++) {
          tl.to(
            boxRefs.current[i],
            {
              backgroundColor: "#93C5FD", // blue
              opacity: 0.7,
            },
            "<"
          );
        }
        right = mid - 1;
      }

      tl.to(boxRefs.current[mid], {
        backgroundColor: "#FFF9C4",
        scale: 1,
        duration: 0.3,
      });
    }
  };

  const reset = (clearArray = true) => {
    gsap.killTweensOf("*");
    setError("");
    if (clearArray) setArr([]);
  };

  return (
    <section className="bg-white mx-8 mt-4 p-8 rounded-xl border space-y-6">

      <h2 className="text-2xl font-bold">
        Binary Search
      </h2>

      {/* Controls */}
      <div className="grid md:grid-cols-3 gap-4">
        <input
          className="border rounded-lg px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="12,3,25,7,18,1"
        />

        <input
          className="border rounded-lg px-3 py-2"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Target (default 0)"
        />

        <div className="flex gap-3">
          <button
            onClick={visualize}
            className="bg-[#FFEA00] font-bold rounded-lg px-4 py-2"
          >
            Visualize
          </button>

          <button
            onClick={() => reset()}
            className="border px-4 py-2 rounded-lg"
          >
            Reset
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {arr.length > 0 && (
        <p className="text-sm text-gray-600">
          Internally sorted: <b>{arr.join(", ")}</b>
        </p>
      )}

      {/* Visualization */}
      {arr.length > 0 && (
        <>
          <div className="relative mt-10">

            {/* Active window */}
            <div
              ref={windowRef}
              className="absolute top-0 h-16 bg-yellow-200/50 rounded-lg"
            />

            <div className="relative flex gap-4">
              {arr.map((num, i) => (
                <div
                  key={i}
                  ref={(el) => (boxRefs.current[i] = el)}
                  className="w-16 h-16 bg-[#FFF9C4] rounded-lg
                             flex items-center justify-center
                             font-bold shadow-sm"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          {/* Color Legend */}
          <div className="flex flex-wrap gap-4 mt-6 text-xs">
            <Legend color="bg-yellow-300" label="Active Range" />
            <Legend color="bg-red-300" label="Left Eliminated" />
            {/* <Legend color="bg-blue-300" label="Right Eliminated" /> */}
            <Legend color="bg-green-400" label="Target Found" />
          </div>
        </>
      )}

    </section>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-4 h-4 rounded-sm ${color}`}></span>
      <span>{label}</span>
    </div>
  );
}