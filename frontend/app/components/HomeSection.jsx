import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";


export function HomeSection({ children }) {
  return (
    <div className="mx-36 my-15 h-36 w-52 border-2 rounded-md">{children}</div>
  );
}

export function Section2({ children }) {
  return (
    <section className="mx-24 my-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {children}
    </section>
  );
}

export function FeatureItem({ icon, title, description }) {
  return (
    <div className="flex items-center gap-4 flex-1 px-6">
      <div className="w-12 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
        <span className="text-xl">{icon}</span>
      </div>

      <div>
        <h3 className="font-bold text-[#1C1B17]">{title}</h3>
        <p className="text-sm text-[#3A382E]">{description}</p>
      </div>
    </div>
  );
}

export function StatsCard({ title, value, suffix, description, highlight }) {
  return (
    <div
      className={`rounded-xl mx-15 p-6 border w-50 h-40 border-[#FFE066] bg-[var(--yellow-background)]
${highlight && "hover:shadow-[0_12px_40px_rgba(255,234,0,0.55)]"}
transition-all duration-300 ease-out
hover:-translate-y-1
hover:shadow-lg
hover:shadow-[0_8px_30px_rgba(255,234,0,0.35)]`}
    >
      <h3 className="text-lg font-bold text-[var(--header-color)] mb-2">
        {title}
      </h3>

      <p className="text-lg font-bold text-[var(--header-color)]">
        {value} <span className="text-base font-medium">{suffix}</span>
      </p>

      <p className="text-sm font-semibold text-[#3A382E] mt-2">{description}</p>
    </div>
  );
}
export function InfoSection ({
  image,
  tag,
  title,
  description,
  points,
  linkText,
  linkHref,
  reverse = false,
  bgClass = "bg-[#FAFAF8]",
  accentColor = "blue", // "blue" | "yellow"
iconType = "tick", // "tick" | "gear"]
}) {
  const accentMap = {
    blue: {
      tag: "text-blue-600",
      iconBg: "bg-blue-600",
      underline: "decoration-blue-600",
      iconText: "text-white",
    },
    yellow: {
      tag: "text-[#FFEA00]",
      iconBg: "bg-[#FFEA00]",
      underline: "decoration-[#FFEA00]",
      iconText: "text-black",
    },
  };

  const iconMap = {
    tick: "✓",
    gear: "⚙",
  };

  const accent = accentMap[accentColor];

  return (
    <section className={`${bgClass} py-20`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Image */}
        <div className={reverse ? "lg:order-2" : "lg:order-1"}>
          <img src={image} alt={title} className="rounded-xl shadow-lg mx-auto" />
        </div>

        {/* Content */}
        <div className={reverse ? "lg:order-1" : "lg:order-2"}>
          <p className={`text-xs font-semibold tracking-widest mb-3 ${accent.tag}`}>
            {tag}
          </p>

          <h2 className="text-3xl font-bold text-[#1C1B17] mb-4">
            {title}
          </h2>

          <p className="text-[#3A382E] mb-6 leading-relaxed">
            {description}
          </p>

          <ul className="space-y-3 mb-6">
            {points.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold
                  ${accent.iconBg} ${accent.iconText}`}
                >
                  {iconMap[iconType]}
                </span>
                <span className="text-[#1C1B17]">{item}</span>
              </li>
            ))}
          </ul>

          <a
            href={linkHref}
            className={`inline-flex items-center gap-2 font-semibold text-[#1C1B17] underline ${accent.underline}`}
          >
            {linkText} →
          </a>
        </div>
      </div>
    </section>
  );
};
export function LanguageCard ({
  short,
  title,
  description,
  buttonText,
  accentText,
  highlighted = false,
})  {
  return (
    <div
      className="group relative bg-[#FFFDF0] border border-[#FFE066] rounded-xl p-8 text-center
      transition-all duration-300
      hover:-translate-y-1
      hover:shadow-[0_8px_30px_rgba(255,234,0,0.25)]"
    >
      {highlighted && (
        <span
          className="absolute top-4 right-4 text-xs font-bold
          bg-[#FFEA00] px-3 py-1 rounded-full
          opacity-0 scale-95
          transition-all duration-300
          group-hover:opacity-100 group-hover:scale-100"
        >
          POPULAR
        </span>
      )}

      <div className={`text-3xl font-bold mb-4 ${accentText}`}>
        {short}
      </div>

      <h3 className="font-semibold text-lg text-[#1C1B17] mb-2">
        {title}
      </h3>

      <p className="text-sm text-[#3A382E] mb-6">
        {description}
      </p>

      <button
        className={`px-6 py-2 rounded-full font-semibold text-[#1C1B17]
        ${highlighted ? "bg-[#FFEA00]" : "border border-[#FFE066]"}
        allbutton`}
      >
        {buttonText}
      </button>
    </div>
  );
};
export function TestimonialCard({ text, name, role, image }) {
  return (
      <div
      className="flex flex-col bg-white rounded-xl p-6
      border border-[#FFE066]
      transition-all duration-300 ease-out
      hover:-translate-y-1
      hover:shadow-[0_12px_40px_rgba(255,234,0,0.35)]"
    >
      {/* ⭐ Stars */}
      <div className="flex gap-1 text-[#FFEA00] mb-3">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <span key={i}>★</span>
          ))}
      </div>

      {/* 💬 Review */}
      <p className="text-gray-600 italic mb-6">
        “{text}”
      </p>

      {/* 👤 User Info */}
      <div className="mt-auto flex items-center gap-3">
        <Image
          src={image}
          alt={name}
          width={40}
          height={40}
          className="rounded-full object-cover border-2 border-[#FFEA00]"
        />

        <div className="min-w-0">
          <p className="font-semibold truncate">{name}</p>
          <p className="text-sm text-gray-400 truncate">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}
export function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}