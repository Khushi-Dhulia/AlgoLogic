"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function SingleLinkedListVisualizer() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [highlight, setHighlight] = useState(null);
  const [message, setMessage] = useState("");

  /* ---------- INSERT AT END ---------- */
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

  /* ---------- INSERT AT START ---------- */
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

  /* ---------- DELETE VALUE ---------- */
  const deleteValue = async () => {
    if (value === "") return;

    setMessage("");
    let index = list.indexOf(Number(value));

    if (index === -1) {
      setMessage("❌ Value not found in list");
      return;
    }

    setHighlight(index);
    await sleep(500);

    const newList = list.filter((v) => v !== Number(value));
    setList(newList);

    setHighlight(null);
    setValue("");
  };

  /* ---------- RESET ---------- */
  const reset = () => {
    setList([]);
    setMessage("");
    setHighlight(null);
  };

  return (
    <section className="bg-white mx-8 mt-6 p-10 rounded-2xl border shadow-sm space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold">Singly Linked List</h2>
        <p className="text-sm text-gray-500 mt-1">
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

      {message && (
        <div className="text-red-500 text-sm">{message}</div>
      )}

      {/* LINKED LIST VISUAL */}
      <div className="flex items-center gap-4 flex-wrap">
        {list.length === 0 && (
          <span className="text-gray-400">List is empty</span>
        )}

        {list.map((val, index) => (
          <div key={index} className="flex items-center gap-4">
            {/* NODE */}
            <div
              className={`px-4 py-2 border rounded-md font-bold transition-all
                ${
                  highlight === index
                    ? "bg-yellow-300"
                    : "bg-yellow-100"
                }`}
            >
              {val}
            </div>

            {/* ARROW */}
            {index !== list.length - 1 && (
              <span className="text-xl font-bold">→</span>
            )}

            {/* NULL */}
            {index === list.length - 1 && (
              <span className="text-sm text-gray-500 ml-2">null</span>
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