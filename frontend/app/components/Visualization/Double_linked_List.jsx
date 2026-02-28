"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function DoublyLinkedList() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [highlight, setHighlight] = useState(null);
  const [message, setMessage] = useState("");

  /* ---------- INSERT END ---------- */
  const insertEnd = async () => {
    if (value === "") return;

    setMessage("");

    const newList = [...list, Number(value)];
    setList(newList);

    setHighlight(newList.length - 1);
    await sleep(500);

    setHighlight(null);
    setValue("");
  };

  /* ---------- INSERT START ---------- */
  const insertStart = async () => {
    if (value === "") return;

    setMessage("");

    const newList = [Number(value), ...list];
    setList(newList);

    setHighlight(0);
    await sleep(500);

    setHighlight(null);
    setValue("");
  };

  /* ---------- DELETE ---------- */
  const deleteValue = async () => {
    if (value === "") return;

    const index = list.indexOf(Number(value));

    if (index === -1) {
      setMessage("❌ Value not found");
      return;
    }

    setMessage("");

    setHighlight(index);
    await sleep(500);

    const newList = list.filter((_, i) => i !== index);
    setList(newList);

    setHighlight(null);
    setValue("");
  };

  /* ---------- RESET ---------- */
  const reset = () => {
    setList([]);
    setHighlight(null);
    setMessage("");
  };

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow">
      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-6">Doubly Linked List</h2>

      {/* CONTROLS */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border px-3 py-2 rounded-lg w-40"
          placeholder="Enter number"
        />

        <button
          onClick={insertEnd}
          className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold"
        >
          Insert End
        </button>

        <button onClick={insertStart} className="border px-5 py-2 rounded-lg">
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

      {message && <div className="text-red-500 text-sm mb-4">{message}</div>}

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT — VISUALIZATION */}
        <div className="lg:col-span-3 border rounded-xl p-4 bg-gray-50 min-h-[120px] flex items-center flex-wrap gap-4">
          {list.length === 0 && (
            <div className="text-gray-400 text-sm">List is empty</div>
          )}

          {list.map((val, index) => (
            <div key={index} className="flex items-center gap-3">
              {/* LEFT NULL */}
              {index === 0 && (
                <span className="text-gray-400 text-sm">null ⇄</span>
              )}

              {/* NODE */}
              <div
                className={`px-5 py-3 rounded-lg border font-bold min-w-[60px] text-center transition-all
                  ${
                    highlight === index
                      ? "bg-yellow-300 border-yellow-500"
                      : "bg-yellow-100"
                  }`}
              >
                {val}
              </div>

              {/* ARROW */}
              {index !== list.length - 1 && (
                <span className="font-bold text-lg">⇄</span>
              )}

              {/* RIGHT NULL */}
              {index === list.length - 1 && (
                <span className="text-gray-400 text-sm">⇄ null</span>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT — SIDE PANEL */}
        <div className="border rounded-xl p-4 bg-white space-y-4">
          {/* Color Key */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Color Key</h3>
            <div className="text-sm space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 border rounded"></div>
                Normal Node
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-300 border rounded"></div>
                Active / Modified Node
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold">⇄</span>
                Bidirectional Pointer
              </div>

              <div className="flex items-center gap-2">
                <span>null</span>
                End of List
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}