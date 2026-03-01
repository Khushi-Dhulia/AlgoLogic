"use client";

import { useState } from "react";

/* ---------- TREE NODE ---------- */
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/* ---------- INSERT ---------- */
function insertNode(root, value) {
  if (!root) {
    return { node: new TreeNode(value), inserted: true };
  }

  if (value === root.value) {
    return { node: root, inserted: false };
  }

  if (value < root.value) {
    const result = insertNode(root.left, value);
    root.left = result.node;
    return { node: root, inserted: result.inserted };
  } else {
    const result = insertNode(root.right, value);
    root.right = result.node;
    return { node: root, inserted: result.inserted };
  }
}

/* ---------- COUNT ---------- */
function countNodes(node) {
  if (!node) return 0;
  return 1 + countNodes(node.left) + countNodes(node.right);
}

/* ---------- DEPTH ---------- */
function getTreeDepth(node) {
  if (!node) return 0;
  return 1 + Math.max(getTreeDepth(node.left), getTreeDepth(node.right));
}

/* ---------- MAIN ---------- */
export default function BinaryTree() {
  const [value, setValue] = useState("");
  const [root, setRoot] = useState(null);
  const [message, setMessage] = useState("");

  const MAX_NODES = 15;

  const handleInsert = () => {
    if (value === "") return;

    const number = Number(value);

    if (countNodes(root) >= MAX_NODES) {
      setMessage("⚠️ Maximum 15 nodes allowed");
      return;
    }

    const result = insertNode(root, number);

    if (!result.inserted) {
      setMessage("⚠️ Duplicate values not allowed");
    } else {
      setRoot(result.node);
      setMessage("Node inserted");
    }

    setValue("");
  };

  const resetTree = () => {
    setRoot(null);
    setMessage("");
  };

  const totalNodes = countNodes(root);
  const depth = getTreeDepth(root);
  const svgHeight = Math.max(400, depth * 100);

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow">
      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-6">Binary Search Tree</h2>

      {/* CONTROLS */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="number"
          max="999"
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= 3) setValue(e.target.value);
          }}
          placeholder="Enter value"
          className="border px-3 py-2 rounded-lg w-40"
        />

        <button
          onClick={handleInsert}
          disabled={totalNodes >= MAX_NODES}
          className={`px-5 py-2 rounded-lg font-semibold ${
            totalNodes >= MAX_NODES ? "bg-gray-300" : "bg-yellow-400"
          }`}
        >
          Insert
        </button>

        {root && (
          <button onClick={resetTree} className="border px-5 py-2 rounded-lg">
            Reset
          </button>
        )}
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="text-sm mb-4 text-gray-700 font-medium">{message}</div>
      )}

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT — TREE */}
        <div className="lg:col-span-3 border rounded-xl p-4 bg-gray-50">
          {!root && <div className="text-gray-400 text-sm">Tree is empty</div>}

          {root && (
            <div className="overflow-x-auto">
              <svg width="1200" height={svgHeight}>
                <TreeNodeView node={root} x={600} y={40} gap={240} />
              </svg>
            </div>
          )}
        </div>

        {/* RIGHT — SIDE PANEL */}
        <div className="border rounded-xl p-4 bg-white space-y-4">
                    {/*status */}
          <div>
            <h3 className="font-bold text-lg mb-2">Binary Tree Status</h3>
            <div className="text-sm space-y-1">
              <div>
                <span className="font-semibold">Nodes:</span> {totalNodes}
              </div>
              <div>
                <span className="font-semibold">Max Nodes:</span> {MAX_NODES}
              </div>
              <div>
                <span className="font-semibold">Depth:</span> {depth}
              </div>
              <div>
                <span className="font-semibold">Status:</span>{" "}
                {root ? "Active" : "Empty"}
              </div>
            </div>
          </div>
          {/* COLOR KEY */}
          <div className="pt-4 border-t">
            <h3 className="font-bold text-lg mb-2">Color Key</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 border rounded-full"></div>
                Tree Node
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-gray-400"></div>
                Parent → Child Link
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- TREE VIEW ---------- */
function TreeNodeView({ node, x, y, gap }) {
  if (!node) return null;

  const nextGap = Math.max(gap / 1.5, 80);

  return (
    <>
      {node.left && (
        <>
          <line x1={x} y1={y} x2={x - nextGap} y2={y + 90} stroke="#999" />
          <TreeNodeView
            node={node.left}
            x={x - nextGap}
            y={y + 90}
            gap={nextGap}
          />
        </>
      )}

      {node.right && (
        <>
          <line x1={x} y1={y} x2={x + nextGap} y2={y + 90} stroke="#999" />
          <TreeNodeView
            node={node.right}
            x={x + nextGap}
            y={y + 90}
            gap={nextGap}
          />
        </>
      )}

      <circle cx={x} cy={y} r={22} fill="#FFF9C4" stroke="#333" />

      <text x={x} y={y + 5} textAnchor="middle" fontWeight="bold" fontSize="14">
        {node.value}
      </text>
    </>
  );
}