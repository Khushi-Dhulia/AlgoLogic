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
export default function HashTableVisualizer() {
  const [table, setTable] = useState(
    Array.from({ length: TABLE_SIZE }, () => [])
  );

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  /* ---------- INSERT ---------- */
  const handleInsert = () => {
    if (!key || !value) {
      setMessage("⚠️ Key and Value both are required");
      return;
    }

    const index = hash(key);

    for (let pair of table[index]) {
      if (pair.key === key) {
        setMessage("❌ Duplicate key not allowed");
        return;
      }
    }

    const newTable = [...table];
    newTable[index] = [...newTable[index], { key, value }];

    setTable(newTable);
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

    const filteredBucket = bucket.filter((pair) => pair.key !== key);

    if (bucket.length === filteredBucket.length) {
      setMessage("❌ Key not found");
      return;
    }

    const newTable = [...table];
    newTable[index] = filteredBucket;

    setTable(newTable);
    setKey("");
    setValue("");
    setMessage(`🗑️ Deleted key from index ${index}`);
  };

  /* ---------- RESET ---------- */
  const resetTable = () => {
    setTable(Array.from({ length: TABLE_SIZE }, () => []));
    setMessage("");
  };

  return (
    <section className="bg-white mx-8 mt-6 p-10 rounded-2xl border shadow-sm space-y-8">
      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold">Hash Table (Key → Value)</h2>
        <p className="text-sm text-gray-500 mt-1">
          Separate Chaining | Size = {TABLE_SIZE}
        </p>
      </div>

      {/* INPUTS */}
      <div className="flex gap-4 items-center flex-wrap">
        <input
          className="border px-4 py-2 rounded-lg w-40"
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />

        <input
          className="border px-4 py-2 rounded-lg w-40"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button
          onClick={handleInsert}
          className="bg-[#FFEA00] px-6 py-2 rounded-lg font-semibold"
        >
          Insert
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-100 text-red-700 px-6 py-2 rounded-lg font-semibold"
        >
          Delete
        </button>

        <button
          onClick={resetTable}
          className="border px-6 py-2 rounded-lg text-gray-600"
        >
          Reset
        </button>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="text-sm font-medium text-gray-700">{message}</div>
      )}

      {/* HASH TABLE */}
      <div className="space-y-4">
        {table.map((bucket, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 flex gap-4 items-center"
          >
            <div className="w-24 font-semibold">Index {index}</div>

            {bucket.length === 0 ? (
              <span className="text-gray-400">Empty</span>
            ) : (
              <div className="flex gap-3 flex-wrap">
                {bucket.map((item, i) => (
                  <div
                    key={i}
                    className="bg-[#FFF9C4] border px-4 py-2 rounded-lg font-semibold"
                  >
                    {item.key} → {item.value}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}