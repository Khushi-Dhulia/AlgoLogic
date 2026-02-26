"use client";

import { useState } from "react";

const TABLE_SIZE = 7;

/* ---------- HASH FUNCTION ---------- */
function hash(key) {

  const strKey = key.toString();
  let hashValue = 0;

  for (let i = 0; i < strKey.length; i++) {
    hashValue =
      (hashValue + strKey.charCodeAt(i)) % TABLE_SIZE;
  }

  return hashValue;
}

/* ---------- MAIN COMPONENT ---------- */
export default function HashTable() {

  const [table, setTable] = useState(
    Array.from({ length: TABLE_SIZE }, () => [])
  );

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  /* ---------- INSERT ---------- */
  const handleInsert = () => {

    if (!key || !value) {
      setMessage("⚠️ Key and Value required");
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

    newTable[index] = [
      ...newTable[index],
      { key, value }
    ];

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

    const filtered =
      bucket.filter((pair) => pair.key !== key);

    if (bucket.length === filtered.length) {
      setMessage("❌ Key not found");
      return;
    }

    const newTable = [...table];

    newTable[index] = filtered;

    setTable(newTable);

    setKey("");
    setValue("");

    setMessage(`🗑️ Deleted from index ${index}`);
  };

  /* ---------- RESET ---------- */
  const resetTable = () => {

    setTable(
      Array.from({ length: TABLE_SIZE }, () => [])
    );

    setMessage("");
  };

  return (
    <section className="bg-white m-8 p-8 rounded-2xl border shadow">

      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-6">
        Hash Table
      </h2>

      {/* CONTROLS */}
      <div className="flex flex-wrap gap-3 mb-6">

        <input
          value={key}
          onChange={(e) =>
            setKey(e.target.value)
          }
          placeholder="Enter key"
          className="border px-3 py-2 rounded-lg w-40"
        />

        <input
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
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
        <div className="text-sm mb-4 text-gray-700 font-medium">
          {message}
        </div>
      )}

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* LEFT — HASH TABLE VISUAL */}
<div className="lg:col-span-3 border rounded-xl p-6 bg-gray-50 space-y-4">

  {table.every(bucket => bucket.length === 0) && (
    <div className="text-gray-400 text-sm">
      Hash table is empty
    </div>
  )}

  {table
    .map((bucket, index) => ({ bucket, index }))
    .filter(({ bucket }) => bucket.length > 0)
    .map(({ bucket, index }) => (

      <div
        key={index}
        className="border rounded-lg p-3 flex gap-4 items-center bg-white"
      >

        <div className="w-24 font-semibold text-blue-600">
          Hash {index}
        </div>

        <div className="flex gap-3 flex-wrap">
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
        <div className="border rounded-xl p-4 bg-white space-y-4">

          {/* LEGEND */}
          <div>

            <h3 className="font-semibold text-lg mb-2">
              Legend
            </h3>

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

          {/* INFO */}
          <div className="pt-4 border-t">

            <h3 className="font-semibold text-lg mb-2">
              Info
            </h3>

            <p className="text-sm text-gray-600">
              A Hash Table stores key-value pairs using a hash
              function to compute an index. This implementation
              uses Separate Chaining, where collisions are handled
              using arrays (buckets) at each index.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}