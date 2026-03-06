"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export default function TestPage() {
  const TOTAL_TIME = 35 * 60;

  const questions = [
    {
      id: 1,
      title:
        "Given an integer array nums, find the contiguous subarray which has the largest sum.",
      options: [
        "Kadane's Algorithm - O(n)",
        "Binary Search - O(log n)",
        "Two Pointers - O(n)",
        "Dynamic Programming - O(n²)",
      ],
    },
    {
      id: 2,
      title: "Which data structure is used in BFS traversal?",
      options: ["Stack", "Queue", "Heap", "Tree"],
    },
    {
      id: 3,
      title: "What is the time complexity of Binary Search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    },
  ];

  const totalQuestions = 20;

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(TOTAL_TIME);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const selectAnswer = (index) => {
    setAnswers({
      ...answers,
      [current]: index,
    });
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const prevQuestion = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const skipQuestion = () => {
    nextQuestion();
  };

  return (
    <div className="min-h-screen bg-neutral-100 p-22">
      {/* HEADER */}
      <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-400 w-10 h-10 rounded-full flex items-center justify-center font-bold">
            DS
          </div>

          <div>
            <h2 className="font-semibold">DSA Learning</h2>
            <p className="text-xs text-neutral-500">Test Session</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-neutral-100 px-4 py-2 rounded-full">
          <Clock size={16} />
          <span className="font-semibold">{formatTime(time)}</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* SIDEBAR */}
        <div className="col-span-3 space-y-6">
          {/* PROGRESS */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-xs text-neutral-500">PROGRESS</p>

            <h2 className="text-lg font-bold mt-2">
              {Object.keys(answers).length} / {totalQuestions}
            </h2>

            <div className="w-full bg-neutral-200 h-2 rounded-full mt-3">
              <div
                className="bg-yellow-400 h-2 rounded-full"
                style={{
                  width: `${
                    (Object.keys(answers).length / totalQuestions) * 100
                  }%`,
                }}
              />
            </div>
          </div>

          {/* QUESTION MAP */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <p className="text-xs text-neutral-500 mb-4">QUESTION MAP</p>

            <div className="grid grid-cols-5 gap-3">
              {[...Array(totalQuestions)].map((_, i) => {
                let color = "bg-neutral-100";

                if (answers[i] !== undefined)
                  color = "bg-green-200 text-green-700";

                if (i === current) color = "bg-yellow-400 text-black";

                return (
                  <div
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-sm ${color}`}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* QUESTION PANEL */}
        <div className="col-span-9">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-6">
              {questions[current]?.title || "More questions coming soon..."}
            </h2>

            {/* OPTIONS */}
            <div className="space-y-4">
              {questions[current]?.options.map((opt, i) => (
                <div
                  key={i}
                  onClick={() => selectAnswer(i)}
                  className={`p-4 border rounded-xl cursor-pointer flex justify-between
                  ${
                    answers[current] === i
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-neutral-200"
                  }`}
                >
                  {opt}

                  {answers[current] === i && (
                    <div className="w-5 h-5 rounded-full bg-yellow-400"></div>
                  )}
                </div>
              ))}
            </div>

            {/* NAVIGATION */}
            {/* NAVIGATION */}
            <div className="flex justify-between mt-10">
              <button
                onClick={prevQuestion}
                disabled={current === 0}
                className="px-5 py-2 rounded-full bg-neutral-100 disabled:opacity-40"
              >
                Previous
              </button>

              <div className="flex gap-3">
                {/* Skip button */}
                {current !== questions.length - 1 && (
                  <button
                    onClick={skipQuestion}
                    className="px-5 py-2 rounded-full bg-neutral-200"
                  >
                    Skip
                  </button>
                )}

                {/* Next button */}
                {current !== questions.length - 1 && (
                  <button
                    onClick={nextQuestion}
                    className="px-5 py-2 rounded-full bg-black text-white"
                  >
                    Next
                  </button>
                )}

                {/* Submit button on last question */}
                {current === questions.length - 1 && (
                  <button className="px-8 py-3 rounded-full bg-yellow-400 font-semibold shadow-md hover:bg-yellow-300">
                    Submit Test
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
