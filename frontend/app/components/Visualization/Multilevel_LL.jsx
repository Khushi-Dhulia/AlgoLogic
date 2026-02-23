"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// Node structure: { value: string, child: [] }
export default function MultiLevelLinkedList() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState("");
  const [highlight, setHighlight] = useState(null);
  const [error, setError] = useState("");
  const containerRef = useRef(null);

  /* ---------- INSERT ROOT NODE ---------- */
  const insertRoot = async () => {
    if (!value) return;
    setError("");
    const newList = [...list, { value, child: [] }];
    setList(newList);

    setHighlight(newList.length - 1);
    await sleep(500);
    setHighlight(null);
    setValue("");
  };

  /* ---------- INSERT CHILD NODE ---------- */
  const insertChild = async (parentIndex) => {
    if (!value) return;
    setError("");
    const newList = [...list];
    if (!newList[parentIndex].child) newList[parentIndex].child = [];
    newList[parentIndex].child.push({ value, child: [] });
    setList(newList);

    setHighlight(`root-${parentIndex}-child-${newList[parentIndex].child.length - 1}`);
    await sleep(500);
    setHighlight(null);
    setValue("");
  };

  /* ---------- DELETE ROOT NODE ---------- */
  const deleteRoot = async (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  /* ---------- DELETE CHILD NODE ---------- */
  const deleteChild = async (rootIndex, childIndex) => {
    const newList = [...list];
    newList[rootIndex].child.splice(childIndex, 1);
    setList(newList);
  };

  /* ---------- RESET ---------- */
  const reset = () => {
    setList([]);
    setHighlight(null);
    setError("");
  };

  /* ---------- GSAP Animation on list update ---------- */
  useEffect(() => {
    const nodes = containerRef.current?.querySelectorAll(".node");
    if (nodes) {
      gsap.fromTo(
        nodes,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [list]);

  /* ---------- RENDER MULTILEVEL LIST ---------- */
  const renderList = (nodes, rootIndex = null) => {
    return nodes.map((node, index) => {
      const key = rootIndex !== null ? `root-${rootIndex}-child-${index}` : `root-${index}`;
      return (
        <div key={key} className="flex flex-col gap-2 ml-0">
          <div
            className={`node px-5 py-3 border rounded-lg font-bold transition-all
              ${
                highlight === key
                  ? "bg-yellow-300"
                  : "bg-yellow-100"
              }`}
          >
            {node.value}
            <div className="text-xs text-gray-500 mt-1">
              {rootIndex === null ? "Root Node" : "Child Node"}
            </div>
          </div>

          {/* CHILDREN */}
          {node.child && node.child.length > 0 && (
            <div className="flex flex-col gap-2 ml-10">
              {renderList(node.child, index)}
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex gap-2 mt-1">
            {rootIndex === null ? (
              <>
                <button
                  className="text-sm text-green-700"
                  onClick={() => insertChild(index)}
                >
                  Add Child
                </button>
                <button
                  className="text-sm text-red-600"
                  onClick={() => deleteRoot(index)}
                >
                  Delete
                </button>
              </>
            ) : (
              <button
                className="text-sm text-red-600"
                onClick={() => deleteChild(rootIndex, index)}
              >
                Delete Child
              </button>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <section className="bg-white m-8 p-10 rounded-2xl border shadow space-y-8">
      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold">Multilevel Linked List</h2>
        <p className="text-sm text-gray-500">Supports nested child nodes</p>
      </div>

      {/* CONTROLS */}
      <div className="flex gap-4 flex-wrap items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          className="border px-4 py-2 rounded-lg w-40"
        />
        <button
          onClick={insertRoot}
          className="bg-[#FFEA00] px-5 py-2 rounded-lg font-semibold"
        >
          Add Root
        </button>
        <button
          onClick={reset}
          className="border px-5 py-2 rounded-lg text-gray-600"
        >
          Reset
        </button>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* VISUALIZATION */}
      <div className="relative flex flex-col gap-4" ref={containerRef}>
        {list.length === 0 ? (
          <span className="text-gray-400">List is empty</span>
        ) : (
          renderList(list)
        )}
      </div>

      {/* LEGEND */}
      <div className="text-sm text-gray-500 mt-4">
        🟡 Highlighted = active node  
        🔁 Child nodes can be nested  
        🚫 No NULL pointers
      </div>
    </section>
  );
}