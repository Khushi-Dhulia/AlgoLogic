"use client";

import { useState } from "react";

export default function MapDS() {
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [myMap, setMyMap] = useState(new Map());

  const [operation, setOperation] = useState("");
  const [message, setMessage] = useState("");
  const [operationCount, setOperationCount] = useState(0);

  /* ---------- ADD / UPDATE PAIR ---------- */
  const addPair = () => {
    if (!keyInput || !valueInput) return;

    const newMap = new Map(myMap);
    setOperation("Add");

    if (newMap.has(keyInput)) {
      setMessage(`⚠ "${keyInput}" updated`);
    } else {
      setMessage(`✅ "${keyInput}" added`);
    }

    newMap.set(keyInput, valueInput);
    setMyMap(newMap);

    setOperationCount((prev) => prev + 1);
    setKeyInput("");
    setValueInput("");
  };

  /* ---------- DELETE BY KEY ---------- */
  const deletePair = () => {
    if (!keyInput) {
      setOperation("Delete");
      setMessage("❌ Enter key to delete");
      return;
    }

    const newMap = new Map(myMap);
    setOperation("Delete");

    if (!newMap.has(keyInput)) {
      setMessage(`❌ "${keyInput}" not found`);
      return;
    }

    newMap.delete(keyInput);
    setMyMap(newMap);

    setMessage(`🗑 "${keyInput}" deleted`);
    setOperationCount((prev) => prev + 1);
    setKeyInput("");
  };

  /* ---------- CLEAR MAP ---------- */
  const clearMap = () => {
    setOperation("Clear");
    setMessage("Map cleared");
    setMyMap(new Map());
    setOperationCount((prev) => prev + 1);
  };

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow space-y-6">
      <h2 className="text-3xl font-bold">Map</h2>

      {/* CONTROLS */}
      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Enter key"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        />

        <input
          type="text"
          placeholder="Enter value"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        />

        <button
          onClick={addPair}
          className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold"
        >
          Add / Update
        </button>

        <button
          onClick={deletePair}
          className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold"
        >
          Delete
        </button>

        <button onClick={clearMap} className="border px-5 py-2 rounded-lg">
          Reset
        </button>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex gap-8">
        {/* LEFT → MAP VISUAL */}
        <div className="flex-1 border rounded-xl p-6 bg-gray-50 min-h-[200px] flex flex-wrap gap-4">
          {myMap.size === 0 && (
            <div className="text-gray-400">Map is empty</div>
          )}

          {[...myMap.entries()].map(([key, value], index) => (
            <div
              key={index}
              className="px-4 py-3 rounded-lg border font-bold bg-yellow-200"
            >
              <div className="text-gray-800">{key}</div>
              <div className="text-sm font-normal text-gray-600">→ {value}</div>
            </div>
          ))}
        </div>

        {/* RIGHT → DETAILS PANEL (QUEUE STYLE) */}
        <div className="w-64 border rounded-xl p-6 bg-white shadow space-y-4">
          {/* STATUS */}
          <div>
            <div className="font-bold text-lg">Map Status</div>
            <div className="text-sm">
              <span className="font-semibold">Operation: </span>
              {message || "Waiting for operation..."}
              <div>
                <span className="font-semibold">Size:</span> {myMap.size}
              </div>
              <div>
                <span className="font-semibold">Is Empty:</span>{" "}
                {myMap.size === 0 ? "Yes" : "No"}
              </div>
              <div>
                <span className="font-semibold">Last Operation:</span>{" "}
                {operation || "None"}
              </div>
              <div>
                <span className="font-semibold">Operations Count:</span>{" "}
                {operationCount}
              </div>
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
