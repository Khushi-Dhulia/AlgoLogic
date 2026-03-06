"use client";

import { Flame, Zap, Bell, Search, Trophy } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f3] p-20">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">
            Welcome back, Alex! 👋
          </h1>
          <p className="text-neutral-500">
            You've earned <b>450 XP</b> this week. Keep pushing!
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <div className="bg-white px-5 py-2 rounded-full flex items-center gap-2 shadow-sm">
            <Zap size={16} className="text-yellow-500" />
            <span className="font-semibold">12,450 XP</span>
          </div>

          <div className="bg-white p-2 rounded-full shadow-sm">
            <Bell size={18} />
          </div>

          <div className="bg-white p-2 rounded-full shadow-sm">
            <Search size={18} />
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6 mb-6">

        {/* XP */}
        <div className="bg-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-yellow-200 rounded-bl-full"></div>

          <p className="text-sm text-neutral-500">Total XP</p>
          <h2 className="text-2xl font-bold mt-1">12.4k</h2>
          <p className="text-green-500 text-sm mt-1">+450 this week</p>
        </div>

        {/* RANK */}
        <div className="bg-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-purple-200 rounded-bl-full"></div>

          <p className="text-sm text-neutral-500">League Rank</p>
          <h2 className="text-2xl font-bold mt-1">
            Diamond III
          </h2>
          <p className="text-blue-500 text-sm mt-1">Top 5%</p>
        </div>

        {/* STREAK */}
        <div className="bg-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-orange-200 rounded-bl-full"></div>

          <p className="text-sm text-neutral-500">Daily Streak</p>
          <h2 className="text-2xl font-bold mt-1 flex items-center gap-2">
            12 Days <Flame className="text-orange-500" size={18}/>
          </h2>
          <p className="text-orange-500 text-sm mt-1">On fire!</p>
        </div>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="col-span-2 space-y-6">

          {/* RECOMMENDED */}
          <div className="bg-[#f1f0db] rounded-3xl p-6 shadow-sm">

            <span className="text-xs bg-yellow-300 px-3 py-1 rounded-full font-semibold">
              ★ RECOMMENDED
            </span>

            <h2 className="text-2xl font-bold mt-4">
              Binary Search Trees
            </h2>

            <p className="text-neutral-600 mt-2">
              Continue your Binary Search Trees module.
            </p>

            {/* Progress */}
            <div className="w-full bg-neutral-300 h-2 rounded-full mt-5">
              <div className="bg-yellow-400 h-2 rounded-full w-[65%]"></div>
            </div>

            <button className="mt-6 bg-yellow-400 hover:bg-yellow-300 transition px-6 py-3 rounded-full font-semibold">
              ▶ Resume Learning
            </button>

            <p className="text-sm text-neutral-600 mt-2">
              65% Complete
            </p>
          </div>

          {/* ACTIVITY */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">
              Activity
            </h3>

            <div className="flex items-end gap-4 h-32">
              {[30, 50, 20, 60, 90, 35, 25].map((h, i) => (
                <div
                  key={i}
                  className="bg-yellow-400 rounded w-6"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {/* WEEKLY GOALS */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">
              Weekly Goals
            </h3>

            <Goal text="Complete Arrays Topic" done />
            <Goal text="Solve Daily Challenge" done />
            <Goal text="Solve 5 Quizzes" />
            <Goal text="Hard Problem" />

          </div>

          {/* BADGES */}
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <h3 className="font-semibold mb-4">
              Your Badges
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <Badge name="Algorithm Ace" color="bg-yellow-200"/>
              <Badge name="Graph Guru" color="bg-blue-200"/>
              <Badge name="Early Riser" color="bg-green-200"/>
              <Badge name="Next Badge" color="bg-neutral-200"/>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

/* COMPONENTS */

function Goal({ text, done }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div
        className={`w-4 h-4 rounded-full border ${
          done ? "bg-green-400 border-green-400" : ""
        }`}
      ></div>
      <span className="text-sm">{text}</span>
    </div>
  );
}

function Badge({ name, color }) {
  return (
    <div className={`rounded-xl p-4 text-center ${color}`}>
      <Trophy className="mx-auto mb-2 text-neutral-700" />
      <p className="text-sm font-medium">{name}</p>
    </div>
  );
}