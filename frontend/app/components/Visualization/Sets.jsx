"use client";

import { useState } from "react";

export default function SetDS() {

  const [input, setInput] = useState("");
  const [mySet, setMySet] = useState(new Set());
  const [selectedValue, setSelectedValue] = useState(null);
  const [message, setMessage] = useState("");



  /* ---------- ADD VALUE ---------- */
  const addValue = () => {

    if (!input) return;

    if (mySet.has(input)) {

      setMessage("❌ Duplicate values not allowed");
      return;
    }

    const newSet = new Set(mySet);
    newSet.add(input);

    setMySet(newSet);
    setSelectedValue(input);
    setMessage(`✅ "${input}" added`);

    setInput("");
  };



  /* ---------- DELETE SELECTED ---------- */
  const deleteSelected = () => {

    if (!selectedValue) {

      setMessage("❌ Select a value to delete");
      return;
    }

    const newSet = new Set(mySet);
    newSet.delete(selectedValue);

    setMySet(newSet);

    setMessage(`Removed "${selectedValue}"`);

    setSelectedValue(null);
  };



  /* ---------- CLEAR SET ---------- */
  const clearSet = () => {

    setMySet(new Set());
    setSelectedValue(null);
    setMessage("Set cleared");

  };



  return (

    <section className="bg-white m-8 p-8 rounded-2xl border shadow space-y-6">

      <h2 className="text-3xl font-bold">
        Set
      </h2>



      {/* CONTROLS */}
      <div className="flex gap-4 flex-wrap">

        <input
          type="text"
          placeholder="Enter value"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        />

        <button
          onClick={addValue}
          className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold"
        >
          Add
        </button>

        <button
          onClick={deleteSelected}
          className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold"
        >
          Delete Selected
        </button>

        <button
          onClick={clearSet}
          className="border px-5 py-2 rounded-lg"
        >
          Clear
        </button>

      </div>



      {/* MAIN LAYOUT */}
      <div className="flex gap-8">

        {/* LEFT SIDE → SET VISUAL */}
        <div className="flex-1 border rounded-xl p-6 bg-gray-50 min-h-[200px] flex flex-wrap gap-4">

          {mySet.size === 0 && (
            <div className="text-gray-400">
              Set is empty
            </div>
          )}

          {[...mySet].map((item, index) => (

            <div
              key={index}
              onClick={() => setSelectedValue(item)}
              className={`
                w-16 h-16 flex items-center justify-center rounded-lg border font-bold cursor-pointer transition-all duration-300

                ${selectedValue === item
                  ? "bg-red-400 text-white scale-110"
                  : "bg-yellow-200 hover:bg-yellow-300"
                }
              `}
            >
              {item}
            </div>

          ))}

        </div>



        {/* RIGHT SIDE → DETAILS */}
        <div className="w-64 border rounded-xl p-6 bg-white shadow space-y-4">

          {/* STATUS */}
          <div>

            <div className="font-semibold text-gray-700">
              Status
            </div>

            <div className="text-blue-600 text-sm mt-1 min-h-[40px]">
              {message || "Waiting for operation..."}
            </div>

          </div>



          {/* INFO */}
          <div className="space-y-2 text-sm">

            <div>📊 Size: {mySet.size}</div>

            <div>
              Selected: {selectedValue ?? "None"}
            </div>

            <div>⚡ Lookup: O(1)</div>

          </div>



          {/* LEGEND */}
          <div className="border-t pt-3 text-sm space-y-1">

            <div className="font-medium">
              Legend
            </div>

            <div>🟡 Normal</div>
            <div>🔴 Selected</div>

          </div>



          {/* INFO */}
          <div className="border-t pt-3 text-sm text-gray-600 space-y-1">

            <div>• Stores unique values</div>
            <div>• No duplicates allowed</div>
            <div>• Unordered structure</div>
            <div>• Fast insert & delete</div>
            <div>• Uses hashing internally</div>

          </div>

        </div>

      </div>

    </section>

  );

}