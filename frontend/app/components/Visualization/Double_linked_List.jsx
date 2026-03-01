"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function DoublyLinkedList() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [highlight, setHighlight] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({
    operation: "None",
    value: "-",
    position: "-",
    length: 0,
    head: "-",
    tail: "-",
  });

  /* ---------- INSERT END ---------- */
  const insertEnd = async () => {
    if (value === "") return;

    const newList = [...list, Number(value)];
    setList(newList);

    setStatus({
      operation: "Insert End",
      value,
      position: "Tail",
      length: newList.length,
      head: newList[0],
      tail: newList[newList.length - 1],
    });

    setHighlight(newList.length - 1);
    await sleep(500);
    setHighlight(null);
    setValue("");
    setMessage("");
  };

  /* ---------- INSERT START ---------- */
  const insertStart = async () => {
    if (value === "") return;

    const newList = [Number(value), ...list];
    setList(newList);

    setStatus({
      operation: "Insert Start",
      value,
      position: "Head",
      length: newList.length,
      head: newList[0],
      tail: newList[newList.length - 1],
    });

    setHighlight(0);
    await sleep(500);
    setHighlight(null);
    setValue("");
    setMessage("");
  };

  /* ---------- DELETE ---------- */
  const deleteValue = async () => {
    if (value === "") return;

    const index = list.indexOf(Number(value));

    if (index === -1) {
      setMessage("❌ Value not found");

      setStatus({
        ...status,
        operation: "Delete",
        value,
      });

      return;
    }

    setHighlight(index);
    await sleep(500);

    const newList = list.filter((_, i) => i !== index);
    setList(newList);

    setStatus({
      operation: "Delete",
      value,
      position:
        index === 0
          ? "Head"
          : index === list.length - 1
          ? "Tail"
          : `Index ${index}`,
      length: newList.length,
      head: newList[0] ?? "-",
      tail: newList[newList.length - 1] ?? "-",
    });

    setHighlight(null);
    setValue("");
    setMessage("");
  };

  /* ---------- RESET ---------- */
  const reset = () => {
    setList([]);
    setHighlight(null);
    setMessage("");

    setStatus({
      operation: "Reset",
      value: "-",
      position: "-",
      length: 0,
      head: "-",
      tail: "-",
    });
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
              {index === 0 && (
                <span className="text-gray-400 text-sm">null ⇄</span>
              )}

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

              {index !== list.length - 1 && (
                <span className="font-bold text-lg">⇄</span>
              )}

              {index === list.length - 1 && (
                <span className="text-gray-400 text-sm">⇄ null</span>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT PANEL */}
        <div className="border rounded-xl p-4 bg-white space-y-6">
          {/* DOUBLY LINKED LIST STATUS */}
          <div>
            <h3 className="font-bold text-lg mb-2 text-black">
              Doubly Linked List Status
            </h3>

            <div className="text-sm space-y-1 text-black">
              <div>
                <span className="font-semibold">Operation:</span>{" "}
                <span>{status.operation}</span>
              </div>

              <div>
                <span className="font-semibold">Value:</span>{" "}
                <span>{status.value}</span>
              </div>

              <div>
                <span className="font-semibold">Position:</span>{" "}
                <span>{status.position}</span>
              </div>

              <div>
                <span className="font-semibold">List Length:</span>{" "}
                <span>{status.length}</span>
              </div>

              <div>
                <span className="font-semibold">Head:</span>{" "}
                <span>{status.head}</span>
              </div>

              <div>
                <span className="font-semibold">Tail:</span>{" "}
                <span>{status.tail}</span>
              </div>
            </div>
          </div>

          {/* COLOR KEY */}
          <div className="pt-2 border-t">
            <h3 className="font-bold text-lg mb-2">Color Key</h3>
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