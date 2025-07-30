import { Press_Start_2P } from "next/font/google";

/*
 * Landing page for Weird.cloud
 *
 * This page implements a retro 16‑bit inspired hero section with neon green and blue accents.
 * A gallery of four placeholder cards showcases potential AI‑generated experiments.
 * A call‑to‑action button at the bottom links back to the GitHub repository.
 */

// Load the Press Start 2P font from Google Fonts.  This pixel‑style font
// reinforces the retro Sega Genesis aesthetic requested by the user.  The
// `className` property will be applied to headings and labels below.
const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  const cards = [
    "AI Glitch Art",
    "Brutalist CSS Generator",
    "Pixel Sprite Mixer",
    "Neon ASCII Shader",
  ];
  return (
    <div className="min-h-screen flex flex-col bg-black text-green-300">
      {/* Hero section with a full‑screen background image and tagline */}
      <section
        className="flex flex-col items-center justify-center flex-1 w-full px-4 text-center"
        style={{
          backgroundImage: "url(/hero.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1
          className={`${pressStart.className} text-4xl md:text-6xl text-green-300 mb-4 drop-shadow-[0_0_4px_rgba(0,255,0,0.6)]`}
        >
          weird.cloud
        </h1>
        <p className="text-lg md:text-2xl text-green-400 font-mono">
          weird shit made by AI
        </p>
      </section>

      {/* Gallery section with four placeholder cards */}
      <section className="w-full py-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-black text-green-300">
        {cards.map((label) => (
          <div
            key={label}
            className="bg-[#0d0d0d] border border-green-800 rounded-lg p-4 flex items-center justify-center hover:bg-[#1a1a1a] transition-colors"
          >
            <span
              className={`${pressStart.className} text-sm text-green-300 text-center`}
            >
              {label}
            </span>
          </div>
        ))}
      </section>

      {/* Footer with a call‑to‑action button */}
      <footer className="py-8 text-center bg-black">
        <a
          href="https://github.com/cresencio/weird-splash"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-green-600 text-black font-bold rounded-full hover:bg-green-500 transition-colors"
        >
          Fork on GitHub
        </a>
      </footer>
    </div>
  );
}