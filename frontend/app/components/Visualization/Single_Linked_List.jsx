"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function SingleLinkedList() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [highlight, setHighlight] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  /* ✅ Structured Status */
  const [status, setStatus] = useState({
    operation: "None",
    value: "-",
    position: "-",
    length: 0,
    head: "-",
    tail: "-",
  });

  /* ---------- INSERT AT END ---------- */
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
  };

  /* ---------- INSERT AT START ---------- */
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
  };

  /* ---------- DELETE VALUE ---------- */
  const deleteValue = async () => {
    if (value === "") return;

    let index = list.indexOf(Number(value));

    if (index === -1) {
      setStatus({
        ...status,
        operation: "Delete",
        value,
      });
      return;
    }

    setHighlight(index);
    await sleep(500);

    const newList = list.filter((v) => v !== Number(value));
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
    setSelectedIndex(null);
    setValue("");
  };

  /* ---------- RESET ---------- */
  const reset = () => {
    setList([]);
    setHighlight(null);
    setSelectedIndex(null);

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
    <section className="bg-white mx-8 mt-6 p-10 rounded-2xl border shadow-sm space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Singly Linked List</h2>
        <p className="text-sm text-gray-500">Node → Data + Pointer</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT VISUAL */}
        <div className="lg:col-span-3 border rounded-xl p-6 bg-gray-50 min-h-[200px] flex items-center flex-wrap gap-4">
          {list.length === 0 && (
            <span className="text-gray-400">List is empty</span>
          )}

          {list.map((val, index) => (
            <div key={index} className="flex items-center gap-3">
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

              {index !== list.length - 1 && (
                <span className="text-xl font-bold">→</span>
              )}

              {index === list.length - 1 && (
                <span className="text-sm text-gray-500">null</span>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT PANEL */}
        <div className="border rounded-xl p-4 bg-white space-y-6">
          {/* LINKED LIST STATUS */}
          <div>
            <h3 className="font-bold text-lg mb-2 text-black">
              Linked List Status
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

          {/* NODE INFO */}
          <div className="pt-2 border-t">
            <h3 className="font-semibold text-lg mb-2">Node Info</h3>

            {selectedIndex === null ? (
              <div className="text-sm">Click a node</div>
            ) : (
              <div className="text-sm space-y-1">
                <div>Value: {list[selectedIndex]}</div>
                <div>Index: {selectedIndex}</div>
                <div>
                  Next:{" "}
                  {selectedIndex === list.length - 1
                    ? "null"
                    : list[selectedIndex + 1]}
                </div>
              </div>
            )}
          </div>

          {/* Color Key */}
          <div className="pt-2 border-t text-sm space-y-1">
            <div className="font-bold text-lg">Color Key</div>
            <div>🟡 Normal node</div>
            <div>🔵 Selected node</div>
            <div>🟨 Active operation</div>
          </div>
        </div>
      </div>
    </section>
  );
}