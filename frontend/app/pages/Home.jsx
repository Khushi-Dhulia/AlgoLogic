"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { PlayIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import { HomeSection,StatsCard,Reveal,TestimonialCard,LanguageCard,InfoSection, FeatureItem, Section2 } from "../components/HomeSection";
import {TestimonialData} from "../components/data/TestimonialData"

export default function HomePage() {
  return (
    <div><Reveal>
      <section className="relative bg-[var(--yellow-background)]">
        <div className="absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-30 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="inline-block px-4 py-1 pb-1 text-sm font-semibold bg-yellow-100 text-yellow-700 rounded-full">
              Master DSA Visually
            </span>
            <h1 className="text-5xl font-extrabold text-gray-900 leading-[1.15] tracking-tight">
              Master DSA With{" "}
              <span className="relative inline-block">
                <span className="absolute left-0 bottom-2 h-10 w-full bg-[#FFEA00] rounded-md -z-0 skew-x-[-2deg]" />
                <span className="relative z-10">Visuals</span>
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Learn Data Structures & Algorithms through interactive visuals,
              real-world examples, and clean explanations designed for clarity.
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                Step-by-step algorithm animations
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                Beginner to advanced DSA coverage
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                Interview-focused problem solving
              </li>
            </ul>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/dashboard">
              <button className="px-8 py-4 rounded-full font-semibold  allbutton text-gray-900 transition">
                Start Learning →
              </button>
              </Link>
              <button className="px-6 py-4 rounded-full font-semibold border border-gray-300 text-gray-700 bg-transparent hover:bg-white/60 transition flex items-center gap-2">
                <PlayIcon className="h-4 w-4 text-gray-800" />
                <span>View Demo</span>
              </button>
            </div>
          </div>
          {/* RIGHT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex justify-center"
          >
            {/* Knowledge glow */}
            <div className="absolute w-80 h-80 bg-[#FFEA00]/15 rounded-full blur-3xl -z-10 right-24 top-32" />

            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.03, rotate: -1 }}
              className="bg-[#292524]/95 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-white/10"
            >
              {/* Subtle graph hint */}
              <div className="absolute inset-0 opacity-[0.05] text-white font-mono text-xs p-6 pointer-events-none"></div>

              <div className="relative rotate-[3deg]">
                {/* Code icon */}
                <span className="absolute top-0 right-10 text-[#44403c] text-7xl font-mono font-semibold select-none">
                  {"<>"}
                </span>

                {/* Code card */}
                <div className="relative z-10 mt-16 bg-[#44403c] rounded-2xl p-8 font-mono text-sm leading-relaxed shadow-xl max-w-md ring-1 ring-white/10">
                  {/* Window dots */}
                  <div className="flex gap-2 pb-3">
                    <span className="w-3 h-3 bg-red-400 rounded-full" />
                    <span className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <span className="w-3 h-3 bg-green-400 rounded-full" />
                  </div>

                  {/* Execution line */}
                  <motion.div
                    animate={{ width: ["0%", "100%"] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="h-[2px] bg-gradient-to-r from-transparent via-[#FFEA00] to-transparent mb-4"
                  />

                  <p>
                    <span className="text-[#FFEA00]">function</span>{" "}
                    <span className="text-blue-400">MasterDSA</span>
                    <span className="text-white">() {"{"}</span>
                  </p>

                  <p className="pl-4 text-gray-300">
                    <span className="text-green-300">
                      visualize(); <br />
                      understand(); <br />
                      practice(); <br />
                      repeat(); <br />
                    </span>
                    <br />
                    return{" "}
                    <span className="text-[#FFEA00]">
                      "Clarity over complexity."
                    </span>
                    ;
                  </p>

                  <p className="text-white">{"}"}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section></Reveal>
      <Reveal delay={0.1}>
      <section className="bg-[#FFFBCF] py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <FeatureItem
            icon="🎓"
            title="Personalized Learning"
            description="Adapts to your pace and style"
          />
          <FeatureItem
            icon="👁️"
            title="Visual Explanations"
            description="See algorithms come to life"
          />
          <FeatureItem
            icon="✨"
            title="Structured Pathways"
            description="Curated roadmap to success"
          />
        </div>
      </section></Reveal><Reveal  delay={0.2}>
      <section>
       <Section2>
  <StatsCard
    title="Daily Stack"
    value="12"
    suffix="Days"
    description="Keep it up! You're on fire!"
  />
<StatsCard
    title="Problem Solved"
    value="500K+"
    description="Keep it up! You're on fire!"
    highlight
  />

  <StatsCard
    title="Animations"
    value="100+"
    description="Concepts explained visually"
  />

  <StatsCard
    title="Pathways"
    value="20+"
    description="Structured learning tracks"
  />
</Section2>
      </section></Reveal>
<Reveal  delay={0.3}>
<section className="bg-[var(--yellow-background)] py-20">
  {/* Heading */}
  <div className="text-center mb-12">
    <h1 className="font-bold text-3xl text-[#1C1B17]">
      Why Choose Us?
    </h1>
    <p className="mt-3 text-[#3A382E]">
      Everything you need to crack your next technical interview.
    </p>
  </div>

  {/* Cards */}
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
    
    {[
      {
        icon: "👁️",
        title: "Interactive Visualizer",
        desc: "See how algorithms work step-by-step with our proprietary visualization engine.",
      },
      {
        icon: "< />",
        title: "Code Playground",
        desc: "Write, run and debug code in our powerful in-browser IDE supporting 10+ languages.",
      },
      {
        icon: "📋",
        title: "Mock Tests",
        desc: "Practice with real interview questions from top tech companies under time constraints.",
      },
      {
        icon: "▶️",
        title: "Video Solutions",
        desc: "Get unstuck with expert video explanations for the toughest problems.",
      },
      {
        icon: "👥",
        title: "Community Support",
        desc: "Learn together with peers, discuss approaches, and code pair in real-time.",
      },
      {
        icon: "🏅",
        title: "Certified Courses",
        desc: "Earn verified certificates upon completion to showcase on your LinkedIn profile.",
      },
    ].map((item, index) => (
      <div
        key={index}
        className="bg-white border border-[#FFE066] rounded-xl p-6
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:shadow-[0_8px_30px_rgba(255,234,0,0.35)]"
      >
        <div className="w-12 h-12 rounded-full bg-[#FFFBCF] flex items-center justify-center mb-4">
          <span className="text-lg">{item.icon}</span>
        </div>

        <h3 className="font-semibold text-lg text-[#1C1B17] mb-2">
          {item.title}
        </h3>

        <p className="text-sm text-[#3A382E] leading-relaxed">
          {item.desc}
        </p>
      </div>
    ))}

  </div>
</section>
</Reveal>
<Reveal  delay={0.4}>
<section>
  <InfoSection
iconType="tick"
  reverse
  accentColor="yellow"
  // bgClass="bg-[#FFFBEA]"
  image="/images/datastructure.png"
  tag="FOUNDATION"
  title="What is a Data Structure?"
  description="Think of data structures as containers for your data. Just as you
        wouldn’t store water in a paper bag, you need the right structure
        for your specific data needs to ensure efficiency and speed."
  points={["Array", "Stack", "Tree"]}
  linkText="Explore Data Structures"
  linkHref="#"
/>
<InfoSection
  iconType="gear"
  accentColor="blue"
  bgClass="bg-[#FFFDF0]"
  image="/images/algorithm.png"
  tag="LOGIC & PROCESS"
  title="What is an Algorithm?"
  description="An algorithm is a step-by-step recipe for solving a problem. From
        sorting a list of names to finding the shortest path on a map,
        algorithms are the brains behind the operation."
  points={["Sorting & Searching", "Dynamic Programming", "Greedy Algorithms"]}
  linkText="Explore Algorithms"
  linkHref="#"
/>
</section></Reveal><Reveal  delay={0.5}>
<section className="bg-white py-20">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#1C1B17]">
          Pick Your Language
        </h2>
        <p className="mt-2 text-[#3A382E]">
          Master DSA in your preferred syntax.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        <LanguageCard
          short="Py"
          title="Python Track"
          description="Perfect for beginners. Clean syntax and powerful libraries."
          buttonText="Start Python"
          accentText="text-blue-600"
          highlighted
        />

        <LanguageCard
          short="Ja"
          title="Java Track"
          description="Industry standard. Object-oriented and strictly typed."
          buttonText="Start Java"
          accentText="text-orange-600"
          highlighted
        />

        <LanguageCard
          short="C++"
          title="C++ Track"
          description="High performance. The choice for competitive programming."
          buttonText="Start C++"
          accentText="text-blue-700"
          highlighted
        />

        <LanguageCard
          short="Go"
          title="Golang Track"
          description="Simple, fast, and great for scalable backend systems."
          buttonText="Start Golang"
          accentText="text-sky-500"
          highlighted
        />
      </div>
    </section></Reveal><Reveal  delay={0.6}>
 <section className="py-20 bg-[#FFFDF5]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">
          Learner Success Stories
        </h2>
        <p className="text-center text-gray-500 mb-12">
          Join thousands of students who transformed their careers.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
  {TestimonialData.map((item, i) => (
    <TestimonialCard  key={i} {...item} />
  ))}
</div>
      </div>
    </section></Reveal><Reveal  delay={0.7}>
     <section className="py-20">
      <div
        className="max-w-6xl mx-auto px-6 py-20 rounded-3xl text-center
      bg-gradient-to-br from-[#23210F] via-[#2F2E0E] to-[#383726]
        shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full
          bg-white/10 text-white text-base font-bold mb-6">
          ⏱️ Mock Interview Mode
        </span>

        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to test your skills?
        </h2>

        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Take full-length mock tests curated by engineers from FAANG companies.
          Get instant performance reports and identify weak areas.
        </p>

        <button className="allbutton
          text-black font-bold px-8 py-3 rounded-full
          transition-all duration-300 shadow-lg">
          Take a Free Mock Test
        </button>
      </div>
    </section></Reveal>
    <footer className="bg-[#FFFDF5] border-t border-[#FFE066]">
      <div className="max-w-7xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-4">
        
        {/* Brand */}
        <div>
          <h3 className="font-bold text-lg mb-3">AlgoLogic</h3>
          <p className="text-gray-500 text-sm">
            The smartest way to master Data Structures & Algorithms.
          </p>
        </div>

        {/* Platform */}
        <div>
          <h4 className="font-semibold mb-3">Platform</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>Visualizer</li>
            <li>Playground</li>
            <li>Mock Tests</li>
            <li>Pricing</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>Blog</li>
            <li>Cheat Sheets</li>
            <li>Interview Guide</li>
            <li>Community</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>About</li>
            <li>Careers</li>
            <li>Privacy</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 py-4 border-t">
        © 2026 AlgoLogic. All rights reserved.
      </div>
    </footer>
  </div>
  );
}
