"use client";

import { useState } from "react";

export default function MapDS() {

  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");

  const [myMap, setMyMap] = useState(new Map());

  const [selectedKey, setSelectedKey] = useState(null);

  const [message, setMessage] = useState("");


  /* ---------- ADD PAIR ---------- */
  const addPair = () => {

    if (!keyInput || !valueInput) return;

    const newMap = new Map(myMap);

    if (newMap.has(keyInput)) {
      setMessage(`⚠ "${keyInput}" updated`);
    } else {
      setMessage(`✅ "${keyInput}" added`);
    }

    newMap.set(keyInput, valueInput);

    setMyMap(newMap);
    setSelectedKey(keyInput);

    setKeyInput("");
    setValueInput("");
  };


  /* ---------- DELETE SELECTED ---------- */
  const deleteSelected = () => {

    if (!selectedKey) {

      setMessage("❌ Select a key to delete");
      return;
    }

    const newMap = new Map(myMap);

    newMap.delete(selectedKey);

    setMyMap(newMap);

    setMessage(`Removed "${selectedKey}"`);

    setSelectedKey(null);
  };


  /* ---------- CLEAR MAP ---------- */
  const clearMap = () => {

    setMyMap(new Map());

    setSelectedKey(null);

    setMessage("Map cleared");
  };



  return (

    <section className="bg-white m-8 p-8 rounded-2xl border shadow space-y-6">

      <h2 className="text-3xl font-bold">
        Map
      </h2>


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
          Add
        </button>

        <button
          onClick={deleteSelected}
          className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold"
        >
          Delete Selected
        </button>

        <button
          onClick={clearMap}
          className="border px-5 py-2 rounded-lg"
        >
          Clear
        </button>

      </div>



      {/* MAIN LAYOUT */}
      <div className="flex gap-8">


        {/* LEFT SIDE → MAP VISUAL */}
        <div className="flex-1 border rounded-xl p-6 bg-gray-50 min-h-[200px] flex flex-wrap gap-4">

          {myMap.size === 0 && (
            <div className="text-gray-400">
              Map is empty
            </div>
          )}

          {[...myMap.entries()].map(([key, value], index) => (

            <div
              key={index}
              onClick={() => setSelectedKey(key)}
              className={`
                px-4 py-3 rounded-lg border font-bold cursor-pointer transition-all duration-300

                ${selectedKey === key
                  ? "bg-red-400 text-white scale-110"
                  : "bg-yellow-200 hover:bg-yellow-300"
                }
              `}
            >

              <div>{key}</div>
              <div className="text-sm font-normal">→ {value}</div>

            </div>

          ))}

        </div>



        {/* RIGHT SIDE → DETAILS PANEL */}
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

            <div>📊 Size: {myMap.size}</div>

            <div>
              Selected: {selectedKey ?? "None"}
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

            <div>• Stores key-value pairs</div>
            <div>• Keys are unique</div>
            <div>• Values can repeat</div>
            <div>• Fast insert & delete</div>
            <div>• Uses hashing internally</div>

          </div>


        </div>


      </div>

    </section>

  );

}