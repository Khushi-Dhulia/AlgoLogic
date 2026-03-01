"use client";

import { useState } from "react";

export default function SetDS() {
  const [input, setInput] = useState("");
  const [mySet, setMySet] = useState(new Set());

  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");
  const [operationCount, setOperationCount] = useState(0);

  /* ---------- ADD VALUE ---------- */
  const addValue = () => {
    if (!input) return;

    setOperation("Add");

    if (mySet.has(input)) {
      setResult("❌ Duplicate values not allowed");
      return;
    }

    const newSet = new Set(mySet);
    newSet.add(input);

    setMySet(newSet);
    setResult(`✅ "${input}" added`);
    setOperationCount((prev) => prev + 1);
    setInput("");
  };

  /* ---------- DELETE VALUE ---------- */
  const deleteValue = () => {
    if (!input) {
      setOperation("Delete");
      setResult("❌ Enter value to delete");
      return;
    }

    setOperation("Delete");

    if (!mySet.has(input)) {
      setResult(`❌ "${input}" not found`);
      return;
    }

    const newSet = new Set(mySet);
    newSet.delete(input);

    setMySet(newSet);
    setResult(`🗑 "${input}" deleted`);
    setOperationCount((prev) => prev + 1);
    setInput("");
  };

  /* ---------- CLEAR SET ---------- */
  const clearSet = () => {
    setOperation("Clear");
    setResult("Set cleared");
    setMySet(new Set());
    setOperationCount((prev) => prev + 1);
  };

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow space-y-6">
      <h2 className="text-3xl font-bold">Set</h2>

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
          onClick={deleteValue}
          className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold"
        >
          Delete
        </button>

        <button onClick={clearSet} className="border px-5 py-2 rounded-lg">
          Reset
        </button>
      </div>

      <div className="flex gap-8">
        {/* LEFT → SET VISUAL */}
        <div className="flex-1 border rounded-xl p-6 bg-gray-50 min-h-[200px] flex flex-wrap gap-4">
          {mySet.size === 0 && (
            <div className="text-gray-400">Set is empty</div>
          )}

          {[...mySet].map((item, index) => (
            <div
              key={index}
              className="w-16 h-16 flex items-center justify-center rounded-lg border font-bold bg-yellow-200"
            >
              {item}
            </div>
          ))}
        </div>
{/* RIGHT → DETAILS PANEL (Queue Style) */}
<div className="w-64 border rounded-xl p-6 bg-white shadow space-y-4">

  {/* STATUS */}
  <div>
    <div className="font-bold text-lg">Set Status</div>
    <div className="text-sm"><span className="font-semibold">Operation: </span>
      {result || "Waiting for operation..."}
      <div><span className="font-semibold">Size:</span> {mySet.size}</div>
    <div><span className="font-semibold">Is Empty:</span> {mySet.size === 0 ? "Yes" : "No"}</div>
    <div><span className="font-semibold">Last Operation:</span> {operation || "None"}</div>
    <div><span className="font-semibold">Operations Count:</span> {operationCount}</div>
    </div>
  </div>
  {/* Color Key*/}
  <div className="border-t pt-3 text-sm space-y-1">
    <div className="font-bold text-lg">Color Key</div>
    <div>🟡 Normal</div>
     </div>
</div>
      </div>
    </section>
  );
}