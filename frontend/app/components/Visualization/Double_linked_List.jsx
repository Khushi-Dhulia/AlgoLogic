"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function DoublyLinkedListVisualizer() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [highlight, setHighlight] = useState(null);
  const [message, setMessage] = useState("");

  /* ---------- INSERT END ---------- */
  const insertEnd = async () => {
    if (value === "") return;

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

    let index = list.indexOf(Number(value));

    if (index === -1) {
      setMessage("❌ Value not found");
      return;
    }

    setMessage("");

    setHighlight(index);
    await sleep(500);

    const newList = list.filter((v, i) => i !== index);
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
    <section className="bg-white mx-8 mt-6 p-10 rounded-2xl border shadow-sm space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold">Doubly Linked List</h2>
        <p className="text-sm text-gray-500 mt-1">
          Each node has Prev + Data + Next
        </p>
      </div>

      {/* CONTROLS */}
      <div className="flex gap-4 flex-wrap items-center">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border px-4 py-2 rounded-lg w-40"
          placeholder="Enter value"
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

      {message && (
        <div className="text-red-500 text-sm">{message}</div>
      )}

      {/* VISUALIZATION */}
      <div className="flex items-center gap-4 flex-wrap">

        {list.length === 0 && (
          <span className="text-gray-400">List is empty</span>
        )}

        {list.map((val, index) => (
          <div key={index} className="flex items-center gap-4">

            {/* LEFT NULL (for first) */}
            {index === 0 && (
              <span className="text-sm text-gray-500">null ←</span>
            )}

            {/* NODE */}
            <div
              className={`px-4 py-3 border rounded-lg font-bold transition-all min-w-[60px] text-center
                ${
                  highlight === index
                    ? "bg-yellow-300"
                    : "bg-yellow-100"
                }`}
            >
              {val}
            </div>

            {/* ARROWS */}
            {index !== list.length - 1 && (
              <span className="text-xl font-bold">⇄</span>
            )}

            {/* RIGHT NULL (for last) */}
            {index === list.length - 1 && (
              <span className="text-sm text-gray-500">→ null</span>
            )}
          </div>
        ))}
      </div>

      {/* LEGEND */}
      <div className="text-sm text-gray-500">
        🟡 Highlighted → active node
      </div>

    </section>
  );
}