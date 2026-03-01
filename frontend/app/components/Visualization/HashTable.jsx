"use client";

import { useState } from "react";

const TABLE_SIZE = 7;

/* ---------- HASH FUNCTION ---------- */
function hash(key) {
  const strKey = key.toString();
  let hashValue = 0;

  for (let i = 0; i < strKey.length; i++) {
    hashValue = (hashValue + strKey.charCodeAt(i)) % TABLE_SIZE;
  }

  return hashValue;
}

/* ---------- MAIN COMPONENT ---------- */
export default function HashTable() {
  const [table, setTable] = useState(
    Array.from({ length: TABLE_SIZE }, () => []),
  );

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  /* ✅ STATUS DEFAULT ENABLED */
  const [status, setStatus] = useState({
    operation: "None",
    key: "-",
    index: "-",
    bucketSize: 0,
    collision: false,
    loadFactor: "0.00",
  });

  /* ---------- INSERT ---------- */
  const handleInsert = () => {
    if (!key || !value) {
      setMessage("⚠️ Key and Value required");
      return;
    }

    const index = hash(key);
    const bucketSize = table[index].length;
    const collision = bucketSize > 0;

    for (let pair of table[index]) {
      if (pair.key === key) {
        setMessage("❌ Duplicate key not allowed");
        return;
      }
    }

    const newTable = [...table];
    newTable[index] = [...newTable[index], { key, value }];
    setTable(newTable);

    const totalItems = newTable.reduce((acc, bucket) => acc + bucket.length, 0);
    const loadFactor = (totalItems / TABLE_SIZE).toFixed(2);

    setStatus({
      operation: "Insert",
      key,
      index,
      bucketSize,
      collision,
      loadFactor,
    });

    setKey("");
    setValue("");
    setMessage(`✅ Inserted at index ${index}`);
  };

  /* ---------- DELETE ---------- */
  const handleDelete = () => {
    if (!key) {
      setMessage("⚠️ Enter key to delete");
      return;
    }

    const index = hash(key);
    const bucket = table[index];
    const filtered = bucket.filter((pair) => pair.key !== key);

    if (bucket.length === filtered.length) {
      setMessage("❌ Key not found");
      return;
    }

    const newTable = [...table];
    newTable[index] = filtered;
    setTable(newTable);

    const totalItems = newTable.reduce((acc, bucket) => acc + bucket.length, 0);
    const loadFactor = (totalItems / TABLE_SIZE).toFixed(2);

    setStatus({
      operation: "Delete",
      key,
      index,
      bucketSize: bucket.length,
      collision: bucket.length > 1,
      loadFactor,
    });

    setKey("");
    setValue("");
    setMessage(`🗑️ Deleted from index ${index}`);
  };

  /* ---------- RESET ---------- */
  const resetTable = () => {
    setTable(Array.from({ length: TABLE_SIZE }, () => []));

    setStatus({
      operation: "None",
      key: "-",
      index: "-",
      bucketSize: 0,
      collision: false,
      loadFactor: "0.00",
    });

    setMessage("");
  };

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow">
      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-6">Hash Table</h2>

      {/* CONTROLS */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter key"
          className="border px-3 py-2 rounded-lg w-40"
        />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          className="border px-3 py-2 rounded-lg w-40"
        />
        <button
          onClick={handleInsert}
          className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold"
        >
          Insert
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-100 text-red-700 px-5 py-2 rounded-lg font-semibold"
        >
          Delete
        </button>

        <button
          onClick={resetTable}
          className="border px-5 py-2 rounded-lg text-gray-600"
        >
          Reset
        </button>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="text-sm mb-4 text-gray-700 font-medium">{message}</div>
      )}

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT — HASH TABLE VISUAL */}
        <div className="lg:col-span-3 border rounded-xl p-6 bg-gray-50 space-y-4">
          {table.every((bucket) => bucket.length === 0) && (
            <div className="text-gray-400 text-sm">Hash table is empty</div>
          )}

          {table.map((bucket, index) => (
            <div
              key={index}
              className="border rounded-lg p-3 flex gap-4 items-center bg-white"
            >
              <div className="w-24 font-semibold text-blue-600">
                Hash {index}
              </div>

              <div className="flex gap-3 flex-wrap">
                {bucket.length === 0 && (
                  <div className="text-gray-400 text-sm">Empty Bucket</div>
                )}

                {bucket.map((item, i) => (
                  <div
                    key={i}
                    className="bg-yellow-100 border px-4 py-2 rounded-lg font-semibold"
                  >
                    {item.key} → {item.value}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — SIDE PANEL */}
        <div className="border rounded-xl p-4 bg-white space-y-6">
          {/* HASH STATUS*/}
          <div>
            <h3 className="font-bold text-lg mb-2">Hash Status</h3>
            <div className="text-sm space-y-1">
              <div>
                <span className="font-semibold">Operation:</span>{" "}
                {status.operation}
              </div>
              <div>
                <span className="font-semibold">Key:</span> {status.key}
              </div>
              <div>
                <span className="font-semibold">Hash Index:</span>{" "}
                {status.index}
              </div>
              <div>
                <span className="font-semibold">Bucket Size:</span>{" "}
                {status.bucketSize}
              </div>
              <div>
                <span className="font-semibold">Collision:</span>{" "}
                {status.collision ? (
                  <span className="text-red-600 font-semibold">Yes ⚠️</span>
                ) : (
                  <span className="text-green-600 font-semibold">No ✅</span>
                )}
              </div>
              <div>
                <span className="font-semibold">Load Factor:</span>{" "}
                {status.loadFactor}
              </div>
            </div>
          </div>
          {/* COLOR KEY */}
          <div className="border-t pt-4">
            <h3 className="font-bold text-lg mb-2">Color Key</h3>
            <div className="text-sm space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 border rounded"></div>
                Key → Value Pair
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-white border rounded"></div>
                Empty Bucket
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 border rounded"></div>
                Index Slot
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}