"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
const topics = [
  {
    id: "sorting",
    title: "Sorting",
    description: "Test your knowledge of sorting algorithms.",
    questions: 10,
    duration: "15 min",
  },
  {
    id: "searching",
    title: "Searching",
    description: "Practice different searching techniques.",
    questions: 10,
    duration: "15 min",
  },
  {
    id: "graph",
    title: "Graph",
    description: "Challenge yourself with graph problems.",
    questions: 10,
    duration: "20 min",
  },
  {
    id: "data-structures",
    title: "Data Structures",
    description: "Test your understanding of core data structures.",
    questions: 10,
    duration: "20 min",
  },
];

const difficultyOptions = [
  {
    value: "easy",
    label: "Easy",
    description: "Perfect for beginners",
    icon: "🌱",
  },
  {
    value: "medium",
    label: "Medium",
    description: "A balanced challenge",
    icon: "⚡",
  },
  {
    value: "hard",
    label: "Hard",
    description: "For advanced practice",
    icon: "🔥",
  },
];

function Configuration({ difficulty, setDifficulty, questionCount, setQuestionCount }) {
  const selectedDifficulty = difficultyOptions.find(
    (item) => item.value === difficulty
  );

  return (
    <div className="rounded-2xl border border-gray-100 bg-[#fafafa] p-5 sm:p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-300 text-lg">
            ⚙️
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Configuration
            </h3>

            <p className="mt-0.5 text-xs text-gray-500">
              Customize your practice session
            </p>
          </div>
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-gray-800">
          Difficulty
        </label>

        <div className="relative">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="
              h-14
              w-full
              appearance-none
              rounded-xl
              border
              border-gray-200
              bg-white
              pl-12
              pr-12
              text-sm
              font-medium
              text-gray-800
              shadow-sm
              outline-none
              transition-all
              hover:border-gray-300
              focus:border-yellow-400
              focus:ring-4
              focus:ring-yellow-100
            "
          >
            {difficultyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} — {option.description}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
            {selectedDifficulty?.icon}
          </div>

          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
            ▼
          </div>
        </div>

        <p className="mt-2 text-xs text-gray-400">
          {selectedDifficulty?.description}
        </p>
      </div>

      {/* Question Count */}
      <div className="mt-6">
        <label className="mb-3 block text-sm font-semibold text-gray-800">
          Number of Questions
        </label>

        <div className="grid grid-cols-3 gap-2">
          {[5, 10, 20].map((count) => {
            const selected = questionCount === count;

            return (
              <button
                key={count}
                type="button"
                onClick={() => setQuestionCount(count)}
                className={`
                  rounded-xl
                  border
                  px-3
                  py-3
                  text-sm
                  font-semibold
                  transition-all
                  ${
                    selected
                      ? "border-yellow-400 bg-yellow-300 text-gray-900 shadow-sm"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                  }
                `}
              >
                {count} Questions
              </button>
            );
          })}
        </div>
      </div>

      {/* Session Preview */}
      <div className="mt-6 rounded-xl border border-gray-100 bg-white p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Session Preview
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {selectedDifficulty?.label} Practice
            </p>

            <p className="mt-1 text-xs text-gray-400">
              {questionCount} questions
            </p>
          </div>

          <div className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-600">
            ~{Math.ceil(questionCount * 1.5)} min
          </div>
        </div>
      </div>
    </div>
  );
}

function TopicTests({ topics }) {
  const router = useRouter();

  function startTopicTest(topic) {
    router.push(`/practice/${topic.id}`);
  }

  return (
    <section className="mt-12">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Topic Tests
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Choose a topic and test your DSA knowledge.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="
              rounded-2xl
              bg-white
              p-6
              shadow-[0_4px_20px_rgba(0,0,0,0.06)]
              transition
              duration-200
              hover:-translate-y-1
              hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)]
            "
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold text-gray-900">
                {topic.title}
              </h3>

              <span
                className="
                  shrink-0
                  rounded-full
                  bg-gray-100
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-gray-500
                "
              >
                {topic.questions} Q
              </span>
            </div>

            <p className="mt-4 min-h-[48px] text-sm leading-6 text-gray-500">
              {topic.description}
            </p>

            <div className="mt-6 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-400">
                {topic.duration}
              </span>

              <button
                type="button"
                onClick={() => startTopicTest(topic)}
                className="
                  rounded-lg
                  bg-[#ffd400]
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-gray-900
                  transition
                  hover:bg-[#f5c900]
                  active:scale-[0.97]
                "
              >
                Start Test
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
function MixedQuestions() {
  const router = useRouter();

  const [selectedTopics, setSelectedTopics] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [questionCount, setQuestionCount] = useState(10);

  function toggleTopic(topic) {
    setSelectedTopics((current) => {
      if (current.includes(topic)) {
        return current.filter((item) => item !== topic);
      }

      return [...current, topic];
    });
  }

  function startPractice() {
    const params = new URLSearchParams();

    if (selectedTopics.length > 0) {
      params.set("topics", selectedTopics.join(","));
    }

    params.set("difficulty", difficulty);
    params.set("questions", questionCount);

    router.push(`/practice/mixed?${params.toString()}`);
  }

  return (
    <section
      className="
        mt-12
        rounded-2xl
        bg-white
        px-6
        py-8
        shadow-[0_4px_20px_rgba(0,0,0,0.06)]
        sm:px-8
        sm:py-9
      "
    >
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Mixed Questions
        </h2>

        <p className="mt-2 max-w-[600px] text-sm leading-6 text-gray-500">
          Challenge yourself with questions from multiple DSA
          topics to build comprehensive problem-solving skills.
        </p>
      </div>

      <div className="mt-9 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Topics */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900">
              Select Topics
            </p>

            {selectedTopics.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedTopics([])}
                className="text-xs font-medium text-gray-400 transition hover:text-gray-700"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            {topics.map((topic) => {
              const selected = selectedTopics.includes(topic.id);

              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => toggleTopic(topic.id)}
                  className={`
                    rounded-xl
                    border
                    px-4
                    py-4
                    text-left
                    transition-all
                    ${
                      selected
                        ? "border-yellow-400 bg-yellow-50 shadow-sm"
                        : "border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`
                        text-sm
                        font-semibold
                        ${
                          selected
                            ? "text-gray-900"
                            : "text-gray-600"
                        }
                      `}
                    >
                      {topic.title}
                    </span>

                    <span
                      className={`
                        flex
                        h-5
                        w-5
                        items-center
                        justify-center
                        rounded-full
                        text-xs
                        ${
                          selected
                            ? "bg-yellow-400 text-gray-900"
                            : "bg-gray-200 text-gray-400"
                        }
                      `}
                    >
                      {selected ? "✓" : "+"}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-gray-400">
                    {topic.questions} questions
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Configuration */}
        <Configuration
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          questionCount={questionCount}
          setQuestionCount={setQuestionCount}
        />
      </div>

      {/* Selected Topics */}
      {selectedTopics.length > 0 && (
        <div className="mt-7 rounded-xl bg-gray-50 px-4 py-3">
          <p className="text-xs text-gray-500">
            Selected topics:
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {selectedTopics.map((topicId) => {
              const found = topics.find(
                (item) => item.id === topicId
              );

              return (
                <span
                  key={topicId}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm"
                >
                  {found?.title}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Start Button */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={startPractice}
          className="
            rounded-xl
            bg-[#ffd400]
            px-7
            py-3.5
            text-sm
            font-semibold
            text-gray-900
            shadow-sm
            transition-all
            hover:-translate-y-0.5
            hover:bg-[#f5c900]
            hover:shadow-md
            active:translate-y-0
          "
        >
          Start Mixed Practice →
        </button>
      </div>
    </section>
  );
}
export default function TestPage() {
  return (
    <main className="min-h-screen bg-[#fafaf9]">
      {/* Hero */}
      <section className="px-5 pt-12 text-center sm:pt-16">
        <div
          className="
            inline-flex
            rounded-full
            bg-yellow-300
            px-4
            py-2
            text-xs
            font-semibold
            uppercase
            tracking-wide
            text-gray-900
          "
        >
          DSA Practice & Assessment
        </div>

        <h1
          className="
            mt-5
            text-4xl
            font-bold
            tracking-tight
            text-gray-950
            sm:text-5xl
          "
        >
          Test Your DSA Skills
        </h1>

        <p
          className="
            mx-auto
            mt-4
            max-w-[600px]
            text-base
            leading-7
            text-gray-500
          "
        >
          Practice what you learn, challenge yourself with mixed
          questions, and prepare with timed mock tests.
        </p>
      </section>

      <div className="mx-auto max-w-[1200px] px-5 pb-16 sm:px-8">
        <TopicTests topics={topics} />
        <MixedQuestions />
      </div>
    </main>
  );
}