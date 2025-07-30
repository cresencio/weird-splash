"use client";

import { useState } from "react";
import { Press_Start_2P } from "next/font/google";

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [asciiActive, setAsciiActive] = useState(false);
  const [pixelActive, setPixelActive] = useState(false);
  const [ascii, setAscii] = useState<string[]>([]);

  // ASCII animation
  React.useEffect(() => {
    if (!asciiActive) return;
    const chars = "@#%*+=-:. ";
    let frame = 0;
    const interval = setInterval(() => {
      const lines = Array.from({ length: 10 }, () =>
        Array.from({ length: 50 }, () =>
          chars[Math.floor(Math.random() * chars.length)]
        ).join("")
      );
      setAscii(lines);
      frame++;
    }, 100);
    return () => clearInterval(interval);
  }, [asciiActive]);

  // Brutalist color randomizer
  const randomizeTheme = () => {
    const rand = () => Math.floor(Math.random() * 255);
    document.documentElement.style.setProperty(
      "--background",
      `rgb(${rand()},${rand()},${rand()})`
    );
    document.documentElement.style.setProperty(
      "--foreground",
      `rgb(${rand()},${rand()},${rand()})`
    );
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Hero */}
      <header className="p-8 text-center">
        <h1
          className={`${pressStart.className} text-4xl font-bold ${
            glitchActive ? "animate-glitch" : "text-white"
          }`}
        >
          weird.cloud
        </h1>
        <p className="mt-4 text-lg text-purple-400">weird shit made by AI</p>
      </header>

      {/* Buttons Section */}
      <section
        className={`flex flex-wrap justify-center gap-6 p-8 transition-all duration-700 ${
          pixelActive
            ? "bg-[linear-gradient(45deg,#000_25%,transparent_25%),linear-gradient(-45deg,#000_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#000_75%),linear-gradient(-45deg,transparent_75%,#000_75%)] bg-[length:40px_40px] bg-white"
            : "bg-green-800"
        }`}
      >
        {/* Glitch Button */}
        <button
          onClick={() => setGlitchActive((g) => !g)}
          className="px-6 py-4 bg-purple-600 text-black font-bold rounded shadow hover:scale-105 transition"
        >
          AI Glitch Art
        </button>

        {/* Brutalist CSS */}
        <button
          onClick={randomizeTheme}
          className="px-6 py-4 bg-yellow-400 text-black font-bold rounded shadow hover:scale-105 transition"
        >
          Brutalist CSS Generator
        </button>

        {/* Pixel Sprite */}
        <button
          onClick={() => setPixelActive((p) => !p)}
          className="px-6 py-4 bg-pink-400 text-black font-bold rounded shadow hover:scale-105 transition"
        >
          Pixel Sprite Mixer
        </button>

        {/* ASCII Shader */}
        <button
          onClick={() => setAsciiActive((a) => !a)}
          className="px-6 py-4 bg-cyan-400 text-black font-bold rounded shadow hover:scale-105 transition"
        >
          Neon ASCII Shader
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center relative overflow-hidden">
        {asciiActive && (
          <pre className="absolute inset-0 text-green-400 opacity-30 text-[10px] leading-3 pointer-events-none whitespace-pre">
            {ascii.join("\n")}
          </pre>
        )}
        <a
          href="https://github.com/cresencio/weird-splash"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 inline-block px-6 py-3 bg-green-600 text-black font-bold rounded-full hover:bg-green-500 transition-colors"
        >
          Fork on GitHub
        </a>
      </footer>

      {/* Extra styles */}
      <style jsx global>{`
        @keyframes glitch {
          0% {
            text-shadow: 2px 2px #ff00c1, -2px -2px #00fff9;
          }
          50% {
            text-shadow: -2px -2px #ff00c1, 2px 2px #00fff9;
          }
          100% {
            text-shadow: 2px -2px #ff00c1, -2px 2px #00fff9;
          }
        }
        .animate-glitch {
          animation: glitch 0.3s infinite;
        }
      `}</style>
    </div>
  );
}