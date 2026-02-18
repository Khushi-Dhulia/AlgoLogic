'use client'
import { useState } from "react"
import Link from "next/link"
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const nav = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
<header className="fixed top-2 left-0 w-full z-50 flex justify-center">
    <div className="w-full max-w-7xl px-4">
      <div className="flex justify-between items-center h-16 bg-[#f8fafc]/80 backdrop-blur-md rounded-full shadow-md px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/light_logo.png"
            alt="AlgoLogic Logo"
            width={150}
            height={150}
            className="rounded-md"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {nav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="
                px-4 py-2 rounded-full
                text-black text-sm font-medium
                transition-all duration-300
                 hover:bg-[#FFEA00]/80 hover:shadow-sm
              "
            >
              {item.name}
            </Link>
          ))}

          {/* Register CTA */}
          <Link
            href="/Register"
            className="
              px-4 py-2 rounded-full
                text-black text-sm font-medium
                transition-all duration-300
                hover:bg-[#FFEA00]/80 hover:shadow-sm
            "
          >
            Register
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFEA00]"
            onClick={() => setOpen(!open)}
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  open
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ${
          open ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="mt-3 bg-white rounded-2xl shadow-lg px-4 pt-4 pb-6 space-y-3">

          {nav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="
                block px-4 py-2 rounded-lg
                text-gray-700 font-medium
                hover:bg-[#FFEA00]/40 transition
              "
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/Register"
            className="
              block px-4 py-2 rounded-full
              bg-[#FFEA00] text-black text-center
              font-semibold shadow-md
              hover:shadow-lg transition
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
