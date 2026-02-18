import React from "react";

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
      className={`rounded-xl p-6 border border-[#FFE066] bg-[var(--yellow-background)]
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
