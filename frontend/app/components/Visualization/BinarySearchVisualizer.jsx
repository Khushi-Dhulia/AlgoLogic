"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function BinarySearchVisualizer() {
  const bars = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      bars.current,
      { scaleY: 0.3 },
      {
        scaleY: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      }
    );

    // highlight mid
    gsap.to(bars.current[4], {
      backgroundColor: "#FFEA00",
      repeat: -1,
      yoyo: true,
      duration: 0.8,
    });
  }, []);

  return (
    <section className="grid lg:grid-cols-[3fr_1.2fr] gap-6 mt-8 px-8">
      {/* VISUALIZER */}
      <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
        <p className="text-xs text-gray-600 mb-3 font-semibold">
          VISUALIZER
        </p>

        <div className="flex items-end gap-3 h-56">
          {[8, 16, 24, 32, 40, 48, 56].map((v, i) => (
            <div
              key={i}
              ref={(el) => (bars.current[i] = el)}
              className="flex-1 bg-[#FFF9C4] rounded-md flex items-end justify-center text-xs font-semibold"
              style={{ height: `${v}%` }}
            >
              {v}
            </div>
          ))}
        </div>

        <div className="flex gap-6 text-xs mt-4 text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-[#FFEA00] rounded-full" /> Target
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-[#FFF9C4] rounded-full" /> Search Space
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-gray-300 rounded-full" /> Eliminated
          </span>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="bg-white rounded-xl p-6 border space-y-6">
        <div>
          <p className="text-xs text-gray-400 mb-2">TARGET VALUE</p>
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm"
            value="16"
            readOnly
          />
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-2">PLAYBACK CONTROLS</p>
          <div className="flex items-center gap-3">
            <button className="p-2 border rounded">⏮</button>
            <button className="p-3 bg-[#FFEA00] rounded-full">▶</button>
            <button className="p-2 border rounded">⏭</button>
          </div>
        </div>

        <div className="bg-[#F0F9FF] p-3 rounded-lg text-xs text-blue-700">
          <strong>Current Step:</strong> Comparing target (16) with
          middle element (16). Match found!
        </div>
      </div>
    </section>
  );
}