"use client";

import { useState } from "react";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

export default function Stack() {

  const [stack, setStack] = useState([]);
  const [value, setValue] = useState("");

  const [activeIndex, setActiveIndex] = useState(null);
  const [message, setMessage] = useState("");

  const [isOperating, setIsOperating] = useState(false);

  /* ---------- PUSH ---------- */
  const pushValue = async () => {

    if (!value || isOperating) return;

    setIsOperating(true);

    const newStack = [...stack, value];
    setStack(newStack);

    setActiveIndex(newStack.length - 1);
    setMessage(`✅ Pushed "${value}" to stack`);

    await sleep(600);

    setActiveIndex(null);
    setValue("");
    setIsOperating(false);
  };


  /* ---------- POP ---------- */
  const popValue = async () => {

    if (stack.length === 0 || isOperating) {

      setMessage("❌ Stack is Empty");
      return;
    }

    setIsOperating(true);

    const topIndex = stack.length - 1;

    setActiveIndex(topIndex);
    setMessage(`Removing "${stack[topIndex]}"`);

    await sleep(600);

    const newStack = [...stack];
    newStack.pop();

    setStack(newStack);

    setActiveIndex(null);
    setIsOperating(false);
  };


  /* ---------- PEEK ---------- */
  const peekValue = () => {

    if (stack.length === 0) {

      setMessage("❌ Stack is Empty");
      return;
    }

    setMessage(`Top element is "${stack[stack.length - 1]}"`);
  };


  /* ---------- CLEAR ---------- */
  const clearStack = () => {

    if (isOperating) return;

    setStack([]);
    setActiveIndex(null);
    setMessage("Stack cleared");
  };


  return (

    <section className="bg-white m-8 p-8 rounded-2xl border shadow space-y-6">

      <h2 className="text-3xl font-bold">
        Stack Visualizer
      </h2>


      {/* CONTROLS */}
      <div className="flex gap-4 flex-wrap">

        <input
          type="text"
          placeholder="Enter value"
          value={value}
          disabled={isOperating}
          onChange={(e) => setValue(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        />

        <button
          onClick={pushValue}
          disabled={isOperating}
          className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold"
        >
          Push
        </button>

        <button
          onClick={popValue}
          disabled={isOperating}
          className="border px-5 py-2 rounded-lg text-red-600"
        >
          Pop
        </button>

        <button
          onClick={peekValue}
          disabled={isOperating}
          className="border px-5 py-2 rounded-lg text-blue-600"
        >
          Peek
        </button>

        <button
          onClick={clearStack}
          disabled={isOperating}
          className="border px-5 py-2 rounded-lg"
        >
          Reset
        </button>

      </div>



      {/* MAIN LAYOUT */}
      <div className="flex gap-8">

        {/* LEFT → STACK VISUAL */}
        <div className="flex-1 border rounded-xl p-6 bg-gray-50 min-h-[300px] flex justify-center">

          <div className="flex flex-col-reverse gap-3">

            {stack.length === 0 && (
              <div className="text-gray-400">
                Stack is empty
              </div>
            )}

            {stack.map((item, index) => {

              const isTop = index === stack.length - 1;

              return (

                <div key={index} className="flex flex-col items-center">

                  {isTop && (
                    <span className="text-green-600 text-xs font-semibold">
                      TOP
                    </span>
                  )}

                  <div
                    className={`
                    w-32 h-12 flex items-center justify-center rounded-lg font-bold border transition-all duration-300

                    ${activeIndex === index
                        ? "bg-yellow-400 scale-110"
                        : "bg-yellow-200"
                      }
                    `}
                  >
                    {item}
                  </div>

                </div>

              );

            })}

          </div>

        </div>



        {/* RIGHT → DETAILS PANEL */}
        <div className="w-64 border rounded-xl p-6 bg-white shadow space-y-4">


          {/* STATUS */}
          <div>

            <div className="font-semibold text-gray-700">
              Status
            </div>

            <div className="text-blue-600 text-sm mt-1 min-h-[40px]">
              {message || "Waiting for operation..."}
            </div>

          </div>


          {/* INFO */}
          <div className="space-y-2 text-sm">

            <div>
              📊 Stack Size: {stack.length}
            </div>

            <div>
              🔝 Top Index: {stack.length > 0 ? stack.length - 1 : "-"}
            </div>

            <div>
              📦 Top Value: {stack.length > 0 ? stack[stack.length - 1] : "-"}
            </div>

          </div>



          {/* LEGEND */}
          <div className="border-t pt-3 text-sm space-y-1">

            <div className="font-medium">
              Legend
            </div>

            <div>🟡 Active element</div>
            <div>🟢 Top indicator</div>
            <div>⬜ Normal element</div>

          </div>



          {/* STACK INFO */}
          <div className="border-t pt-3 text-sm space-y-1 text-gray-600">

            <div>• LIFO (Last In First Out)</div>
            <div>• Push → Add to top</div>
            <div>• Pop → Remove from top</div>
            <div>• Peek → View top element</div>
            <div>• Time Complexity: O(1)</div>

          </div>


        </div>

      </div>

    </section>

  );

}