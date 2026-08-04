'use client'
import { useState, useEffect } from "react";
import Link from "next/link"
import Image from "next/image";
import MegaMenu from "./MegaMenu";
import { usePathname } from "next/navigation";
import { dsSections, algoSections } from "./menuData";
// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   const nav = [
//     { name: 'Home', href: '/' },
//     { name: 'Data Structure', href: '/ds' },
//     { name: 'Algorithms', href: '/algorithms' },
//     { name: 'Mock Test', href: '/mock-test' },
//   ];

//   return (
// <header className="fixed top-2 left-0 w-full z-50 flex justify-center">
//     <div className="w-full max-w-7xl px-4">
//       <div className="flex justify-between items-center h-16 bg-[#f8fafc]/80 backdrop-blur-md rounded-full shadow-md px-6">
//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2">
//           <Image
//             src="/light_logo.png"
//             alt="AlgoLogic Logo"
//             width={150}
//             height={150}
//             className="rounded-md"
//             priority
//           />
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center gap-2">
//           {nav.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="
//                 px-4 py-2 rounded-full
//                 text-black text-sm font-medium
//                 transition-all duration-300
//                  hover:bg-[#FFEA00]/80 hover:shadow-sm
//               "
//             >
//               {item.name}
//             </Link>
//           ))}

//           {/* Register CTA */}
//           <Link
//             href="/Register"
//             className="
//               px-4 py-2 rounded-full
//                 text-black text-sm font-medium
//                 transition-all duration-300
//                 hover:bg-[#FFEA00]/80 hover:shadow-sm
//             "
//           >
//             Register
//           </Link>
//         </nav>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden flex items-center">
//           <button
//             aria-label="Toggle menu"
//             aria-expanded={open}
//             className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFEA00]"
//             onClick={() => setOpen(!open)}
//           >
//             <svg
//               className={`w-6 h-6 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d={
//                   open
//                     ? 'M6 18L18 6M6 6l12 12'
//                     : 'M4 6h16M4 12h16M4 18h16'
//                 }
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden overflow-hidden transition-[max-height] duration-500 ${
//           open ? 'max-h-screen' : 'max-h-0'
//         }`}
//       >
//         <div className="mt-3 bg-white rounded-2xl shadow-lg px-4 pt-4 pb-6 space-y-3">

//           {nav.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="
//                 block px-4 py-2 rounded-lg
//                 text-gray-700 font-medium
//                 hover:bg-[#FFEA00]/40 transition
//               "
//               onClick={() => setOpen(false)}
//             >
//               {item.name}
//             </Link>
//           ))}

//           <Link
//             href="/Register"
//             className="
//               block px-4 py-2 rounded-full
//               bg-[#FFEA00] text-black text-center
//               font-semibold shadow-md
//               hover:shadow-lg transition
//             "
//             onClick={() => setOpen(false)}
//           >
//             Register
//           </Link>
//         </div>
//       </div>
//     </div>
//   </header>
// );

// }

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const nav = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Data Structure",
    href: "/ds",
    megaMenu: true,
    sections: dsSections,
  },
  {
    name: "Algorithms",
    href: "/algorithms",
    megaMenu: true,
    sections: algoSections,
  },
  {
    name: "Mock Test",
    href: "/mock-test",
  },
  ];
  useEffect(() => {
  setOpen(false);
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(href + "/");
  };

  const linkClass = (href) => `
  px-4 py-2
  rounded-full
  text-sm font-medium
  transition-all duration-300
  ${
    isActive(href)
      ? "bg-[#FFEA00] text-black shadow-sm"
      : "hover:bg-[#FFEA00] hover:shadow-sm"
  }
`;
  return (
    <header className="fixed top-2 left-0 w-full z-50 flex justify-center">
      <div className="w-full max-w-7xl px-4">
        <div className="flex justify-between items-center h-16 bg-white/80 backdrop-blur-md rounded-full shadow-md px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/light_logo.png"
              alt="AlgoLogic"
              width={150}
              height={150}
            />
          </Link>

          {/* Desktop */}
<nav className="hidden md:flex items-center gap-2">
  {nav.map((item) => (
    <div key={item.name} className="relative group">
      {!item.megaMenu ? (
        <Link href={item.href} className={linkClass(item.href)}>
          {item.name}
        </Link>
      ) : (
        <>
          <Link
            href={item.href}
            className={`${linkClass(item.href)} flex items-center gap-1`}
          >
            {item.name}

            <svg
              className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Link>

          <MegaMenu sections={item.sections} />
        </>
      )}
    </div>
  ))}

  <Link
    href="/register"
    className="
      ml-2
      px-5 py-2
      rounded-full
      bg-[#FFEA00]
      font-semibold
      transition-all
      duration-300
      hover:scale-105
      hover:shadow-lg
      active:scale-95
    "
  >
    Register
  </Link>
</nav>
          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFEA00]"
            onClick={() => setOpen(!open)}
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${open ? "rotate-90" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height] duration-500 ${
            open ? "max-h-[80vh] overflow-y-auto" : "max-h-0"
          }`}
        >
          <div className="mt-3 rounded-2xl bg-white shadow-lg p-4 space-y-2">
            {nav.map((item) =>
              !item.megaMenu ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block rounded-lg px-3 py-2 font-medium hover:bg-yellow-100 ${
                    isActive(item.href) ? "bg-yellow-100 text-yellow-700" : "text-gray-700"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block font-semibold py-2 text-gray-900 hover:text-yellow-600"
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </Link>

                  {item.sections.map((section) => (
                    <div key={section.title} className="ml-3 mb-3">
                      <div className="font-medium text-sm text-gray-800 mb-1">
                        {section.title}
                      </div>

                      {section.items.map((topic) => (
                        <MobileTopicLink
                          key={topic.name}
                          item={topic}
                          onNavigate={() => setOpen(false)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              )
            )}

            <Link
              href="/register"
              className="
                block rounded-full
                bg-[#FFEA00]
                py-2 text-center
                font-semibold
              "
              onClick={() => setOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// Handles both flat topics (just a link) and topics with sub-topics
// (e.g. "Linked List" -> Singly/Doubly/Circular) as a tap-to-expand accordion.
function MobileTopicLink({ item, onNavigate }) {
  const [expanded, setExpanded] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className="block py-1 text-gray-600 hover:text-yellow-600"
        onClick={onNavigate}
      >
        {item.name}
      </Link>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link
          href={item.href}
          className="py-1 text-gray-700 font-medium hover:text-yellow-600"
          onClick={onNavigate}
        >
          {item.name}
        </Link>
        <button
          aria-label={`Toggle ${item.name} submenu`}
          className="p-1"
          onClick={() => setExpanded(!expanded)}
        >
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      <div
        className={`overflow-hidden transition-[max-height] duration-300 ${
          expanded ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="pl-3 space-y-1 pb-1">
          {item.children.map((child) => (
            <Link
              key={child.name}
              href={child.href}
              className="block py-1 text-sm text-gray-500 hover:text-yellow-600"
              onClick={onNavigate}
            >
              {child.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}