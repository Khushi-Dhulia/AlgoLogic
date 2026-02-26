"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function SingleLinkedList() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [highlight, setHighlight] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [message, setMessage] = useState("");

  /* ---------- INSERT AT END ---------- */
  const insertEnd = async () => {
    if (value === "") return;

    setMessage("Inserted at end");
    const newList = [...list, Number(value)];
    setList(newList);

    setHighlight(newList.length - 1);
    await sleep(500);
    setHighlight(null);
    setValue("");
  };

  /* ---------- INSERT AT START ---------- */
  const insertStart = async () => {
    if (value === "") return;

    setMessage("Inserted at start");
    const newList = [Number(value), ...list];
    setList(newList);

    setHighlight(0);
    await sleep(500);
    setHighlight(null);
    setValue("");
  };

  /* ---------- DELETE VALUE ---------- */
  const deleteValue = async () => {
    if (value === "") return;

    let index = list.indexOf(Number(value));

    if (index === -1) {
      setMessage("❌ Value not found");
      return;
    }

    setMessage(`Deleting ${value}`);

    setHighlight(index);
    await sleep(500);

    const newList = list.filter((v) => v !== Number(value));
    setList(newList);

    setHighlight(null);
    setSelectedIndex(null);
    setValue("");
  };

  /* ---------- RESET ---------- */
  const reset = () => {
    setList([]);
    setMessage("List reset");
    setHighlight(null);
    setSelectedIndex(null);
  };

  return (
    <section className="bg-white mx-8 mt-6 p-10 rounded-2xl border shadow-sm space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold">
          Singly Linked List
        </h2>
        <p className="text-sm text-gray-500">
          Node → Data + Pointer
        </p>
      </div>


      {/* CONTROLS */}
      <div className="flex gap-4 flex-wrap items-center">

        <input
          type="number"
          className="border px-4 py-2 rounded-lg w-40"
          placeholder="Enter value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button
          onClick={insertEnd}
          className="bg-[#FFEA00] px-5 py-2 rounded-lg font-semibold"
        >
          Insert End
        </button>

        <button
          onClick={insertStart}
          className="border px-5 py-2 rounded-lg"
        >
          Insert Start
        </button>

        <button
          onClick={deleteValue}
          className="border px-5 py-2 rounded-lg text-red-600"
        >
          Delete
        </button>

        <button
          onClick={reset}
          className="border px-5 py-2 rounded-lg text-gray-600"
        >
          Reset
        </button>

      </div>


      {/* MAIN GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">


        {/* LEFT → VISUALIZATION */}
        <div className="lg:col-span-3 border rounded-xl p-6 bg-gray-50 min-h-[200px] flex items-center flex-wrap gap-4">

          {list.length === 0 && (
            <span className="text-gray-400">
              List is empty
            </span>
          )}

          {list.map((val, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
            >

              {/* NODE */}
              <div
                onClick={() => setSelectedIndex(index)}
                className={`px-4 py-2 rounded-md font-bold cursor-pointer transition-all
                  ${
                    highlight === index
                      ? "bg-yellow-300 scale-110"
                      : selectedIndex === index
                      ? "bg-blue-500 text-white"
                      : "bg-yellow-100"
                  }`}
              >
                {val}
              </div>

              {/* ARROW */}
              {index !== list.length - 1 && (
                <span className="text-xl font-bold">
                  →
                </span>
              )}

              {/* NULL */}
              {index === list.length - 1 && (
                <span className="text-sm text-gray-500">
                  null
                </span>
              )}

            </div>
          ))}

        </div>



        {/* RIGHT → SIDE PANEL */}
        <div className="border rounded-xl p-4 bg-white space-y-4">

          {/* STATUS */}
          <div>

            <h3 className="font-semibold text-lg">
              Status
            </h3>

            <div className="text-blue-600 text-sm min-h-[40px]">
              {message || "Waiting for operation..."}
            </div>

          </div>


          {/* NODE INFO */}
          <div className="pt-2 border-t">

            <h3 className="font-semibold text-lg mb-2">
              Node Info
            </h3>

            {selectedIndex === null ? (
              <div className="text-gray-400 text-sm">
                Click a node
              </div>
            ) : (
              <div className="text-sm space-y-1">

                <div>
                  Value: {list[selectedIndex]}
                </div>

                <div>
                  Index: {selectedIndex}
                </div>

                <div>
                  Next:{" "}
                  {selectedIndex === list.length - 1
                    ? "null"
                    : list[selectedIndex + 1]}
                </div>

              </div>
            )}

          </div>


          {/* STATS */}
          <div className="pt-2 border-t text-sm space-y-1">

            <div>
              📊 Size: {list.length}
            </div>

            <div>
              ⚡ Insert: O(1)
            </div>

            <div>
              ⚡ Delete: O(n)
            </div>

            <div>
              ⚡ Access: O(n)
            </div>

          </div>


          {/* LEGEND */}
          <div className="pt-2 border-t text-sm space-y-1">

            <div className="font-medium">
              Legend
            </div>

            <div>🟡 Normal node</div>
            <div>🔵 Selected node</div>
            <div>🟨 Active operation</div>

          </div>


          {/* INFO */}
          <div className="pt-2 border-t text-sm text-gray-600 space-y-1">

            <div>• Stores elements in nodes</div>
            <div>• Each node points to next</div>
            <div>• Dynamic size</div>
            <div>• No random access</div>

          </div>

        </div>

      </div>

    </section>
  );
}