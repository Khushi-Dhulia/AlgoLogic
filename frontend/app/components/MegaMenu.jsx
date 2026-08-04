"use client";

import Link from "next/link";

const itemStyle = `
  flex items-center
  rounded-lg
  px-3 py-1
  text-sm
  text-gray-600
  transition-all duration-200
  hover:bg-yellow-100
  hover:text-yellow-700
  hover:translate-x-1
`;

export default function MegaMenu({ sections }) {
  return (
    <div
      className="
        absolute
        left-1/2
        top-full
        pt-4
        -translate-x-1/2
        z-50

        opacity-0
        invisible
        pointer-events-none

        translate-y-3
        scale-95

        group-hover:opacity-100
        group-hover:visible
        group-hover:pointer-events-auto
        group-hover:translate-y-0
        group-hover:scale-100

        group-focus-within:opacity-100
        group-focus-within:visible
        group-focus-within:pointer-events-auto
        group-focus-within:translate-y-0
        group-focus-within:scale-100

        transition-all
        duration-300
        delay-75
      "
    >
      {/* Invisible bridge to prevent hover flicker */}
      <div className="absolute -top-5 left-0 w-full h-5" />

      <div
        className="
          w-[min(980px,95vw)]

          rounded-3xl
          border
          border-gray-200

          bg-white/95
          backdrop-blur-xl

          shadow-2xl

          p-8

          max-h-[75vh]
          overflow-y-auto
        "
      >
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${sections.length}, minmax(190px,1fr))`,
          }}
        >
          {sections.map((section) => (
            <div key={section.title}>
              {/* Section Heading */}

              <h3
className="mb-2 pb-1 border-b border-gray-100 text-lg font-semibold"
              
              >
                {section.title}
              </h3>

              <div className="space-y-1">
                {section.items.map((item) =>
                  item.children ? (
                    <div key={item.name}>
                      {/* Parent Topic */}

                      {item.href ? (
                        <Link
                          href={item.href}
                          className="
                            flex
                            items-center
                            justify-between

                            rounded-lg
                            px-3
                            py-2

                            font-medium
                            text-gray-800

                            hover:bg-yellow-100
                            hover:text-yellow-700

                            transition-all
                            duration-200
                          "
                        >
                          {item.name}

                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      ) : (
                        <div
                          className="
                            px-3
                            py-2

                            font-medium
                            text-gray-800
                          "
                        >
                          {item.name}
                        </div>
                      )}

                      {/* Child Topics */}

                      <div
  className="
    ml-3
    mt-1
    border-l
    border-gray-200
    pl-3
    space-y-0.5
  "
>
                      
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={itemStyle}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={itemStyle}
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>

              {section.viewAllHref && (
                <Link
                  href={section.viewAllHref}
                  className="
                    mt-5
                    inline-flex
                    items-center
                    gap-1

                    text-sm
                    font-semibold
                    text-yellow-600

                    hover:gap-2
                    hover:underline

                    transition-all
                  "
                >
                  View All →

                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}