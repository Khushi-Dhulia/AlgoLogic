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

/* ---------- INSERT INTO BST (SAFE VERSION) ---------- */
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

/* ---------- COUNT NODES ---------- */
function countNodes(node) {
  if (!node) return 0;
  return 1 + countNodes(node.left) + countNodes(node.right);
}

/* ---------- GET TREE DEPTH ---------- */
function getTreeDepth(node) {
  if (!node) return 0;
  return 1 + Math.max(
    getTreeDepth(node.left),
    getTreeDepth(node.right)
  );
}

/* ---------- MAIN COMPONENT ---------- */
export default function BinaryTreeVisualizer() {
  const [value, setValue] = useState("");
  const [root, setRoot] = useState(null);
  const [message, setMessage] = useState("");

  const MAX_NODES = 15;

  const handleInsert = () => {
    if (value === "") return;

    const number = Number(value);
    const currentCount = countNodes(root);

    if (currentCount >= MAX_NODES) {
      setMessage("⚠️ Maximum 15 nodes allowed");
      return;
    }

    const result = insertNode(root, number);

    if (!result.inserted) {
      setMessage("⚠️ Value already exists in tree");
    } else {
      setRoot(result.node);
      setMessage("");
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
    <section className="bg-white mx-8 mt-6 p-10 rounded-2xl border shadow-sm space-y-8">

      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold">Binary Search Tree</h2>
        <p className="text-sm text-gray-500 mt-1">
          Left &lt; Root &lt; Right (No duplicates)
        </p>
      </div>

      {/* CONTROLS */}
      <div className="flex gap-4 items-center flex-wrap">
        <input
          type="number"
          max="999"
          className="border px-4 py-2 rounded-lg w-40"
          placeholder="Enter value"
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= 3) {
              setValue(e.target.value);
            }
          }}
        />

        <button
          onClick={handleInsert}
          disabled={totalNodes >= MAX_NODES}
          className={`px-6 py-2 rounded-lg font-semibold ${
            totalNodes >= MAX_NODES
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#FFEA00]"
          }`}
        >
          Insert
        </button>

        {root && (
          <button
            onClick={resetTree}
            className="border px-6 py-2 rounded-lg text-gray-600"
          >
            Reset
          </button>
        )}
      </div>

      {/* INFO */}
      <div className="text-sm text-gray-500">
        Nodes: {totalNodes} / {MAX_NODES}
      </div>

      {message && (
        <div className="text-red-500 text-sm font-medium">
          {message}
        </div>
      )}

      {/* TREE */}
      {root && (
        <div className="overflow-x-auto border rounded-xl p-4">
          <svg width="1200" height={svgHeight}>
            <TreeNodeView
              node={root}
              x={600}
              y={40}
              gap={240}
            />
          </svg>
        </div>
      )}
    </section>
  );
}

/* ---------- TREE RENDER ---------- */
function TreeNodeView({ node, x, y, gap }) {
  if (!node) return null;

  const valueStr = node.value.toString();

  const fontSize =
    valueStr.length <= 2 ? 14 :
    valueStr.length === 3 ? 12 :
    10;

  const displayText =
    valueStr.length > 3 ? valueStr.slice(0, 3) + "…" : valueStr;

  const nextGap = Math.max(gap / 1.5, 80);

  return (
    <>
      {/* LEFT EDGE */}
      {node.left && (
        <>
          <line
            x1={x}
            y1={y}
            x2={x - nextGap}
            y2={y + 90}
            stroke="#999"
          />
          <TreeNodeView
            node={node.left}
            x={x - nextGap}
            y={y + 90}
            gap={nextGap}
          />
        </>
      )}

      {/* RIGHT EDGE */}
      {node.right && (
        <>
          <line
            x1={x}
            y1={y}
            x2={x + nextGap}
            y2={y + 90}
            stroke="#999"
          />
          <TreeNodeView
            node={node.right}
            x={x + nextGap}
            y={y + 90}
            gap={nextGap}
          />
        </>
      )}

      {/* NODE */}
      <circle cx={x} cy={y} r={22} fill="#FFF9C4" stroke="#333" />

      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fontWeight="bold"
        fontSize={fontSize}
      >
        {displayText}
        <title>{node.value}</title>
      </text>
    </>
  );
}