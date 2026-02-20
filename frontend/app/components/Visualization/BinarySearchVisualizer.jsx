"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function BinarySearchVisualizer() {
  const barsRef = useRef([]);

  useEffect(() => {
    // reset
    gsap.set(barsRef.current, { backgroundColor: "#FFF9C4" });

    // animate middle element
    gsap.to(barsRef.current[4], {
      backgroundColor: "#FFEA00",
      scaleY: 1.2,
      duration: 0.6,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <section className="bg-white p-6 rounded-xl border">
      <h3 className="text-sm font-semibold text-gray-500 mb-4">
        VISUALIZER
      </h3>

      <div className="flex items-end gap-2 h-48">
        {[10, 20, 30, 40, 50, 60, 70, 80].map((value, i) => (
          <div
            key={i}
            ref={(el) => (barsRef.current[i] = el)}
            className="flex-1 rounded-md bg-[#FFF9C4] flex items-end justify-center text-sm font-semibold"
            style={{ height: `${value}%` }}
          >
            {value}
          </div>
        ))}
      </div>
    </section>
  );
}