import "./globals.css";

export const metadata = {
  title: "AlgoLogic | Master DSA Visually",
  description:
    "Learn Data Structures & Algorithms with interactive visual explanations and mock tests.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

