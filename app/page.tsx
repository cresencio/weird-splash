"use client";

// Import necessary modules from Next.js and React
import { Press_Start_2P } from "next/font/google";
import { useState } from "react";

/*
 * Enhanced landing page for Weird.cloud
 *
 * This component keeps the original retro aesthetic and hero layout while
 * adding playful interactivity to each of the four placeholder cards.
 * When a visitor clicks a card, a creative AI‑inspired effect is triggered:
 *   • AI Glitch Art toggles a glitchy text overlay with animated colour shifts.
 *   • Brutalist CSS Generator randomises the site’s colour theme on the fly.
 *   • Pixel Sprite Mixer reveals an 8×8 grid of randomly coloured squares.
 *   • Neon ASCII Shader displays rolling ASCII art with a moving neon gradient.
 * These interactions are implemented entirely on the client without any
 * external dependencies, so they run instantly in the browser.
 */

// Load the Press Start 2P font from Google Fonts.  This pixel‑style font
// reinforces the retro Sega Genesis aesthetic requested by the user.  The
// `className` property will be applied to headings and labels below.
const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  // Labels for the interactive cards
  const cardLabels = [
    "AI Glitch Art",
    "Brutalist CSS Generator",
    "Pixel Sprite Mixer",
    "Neon ASCII Shader",
  ];

  // State hooks for toggling overlays and storing generated content
  const [glitchActive, setGlitchActive] = useState(false);
  const [spriteActive, setSpriteActive] = useState(false);
  const [asciiActive, setAsciiActive] = useState(false);
  const [sprite, setSprite] = useState<string[][]>([]);
  const [ascii, setAscii] = useState<string[]>([]);

  /*
   * Because we no longer display a glitch overlay inside the card, we
   * remove the ref and associated effect.  The glitch animation is
   * applied directly to the `<h1>` via conditional class names.
   */
  // No ref or useEffect required for glitch anymore

  /**
   * Generate a random 8×8 pixel sprite.  Each cell is assigned a random
   * hue from the HSL colour wheel.  Pastel saturation and mid‑tone
   * lightness values keep the palette fun and cohesive.
   */
  function generateSprite() {
    const grid: string[][] = [];
    for (let i = 0; i < 8; i++) {
      const row: string[] = [];
      for (let j = 0; j < 8; j++) {
        const hue = Math.floor(Math.random() * 360);
        row.push(`hsl(${hue}, 70%, 50%)`);
      }
      grid.push(row);
    }
    setSprite(grid);
  }

  /**
   * Generate a block of ASCII art.  We assemble lines from a small
   * character set to give the impression of random noise.  The neon
   * gradient effect is applied via CSS (see the styles at the bottom).
   */
  function generateAscii() {
    const asciiLines: string[] = [];
    const chars = ["#", "@", "$", "%", "&", "*", "+", "=", "?", "."];
    for (let i = 0; i < 10; i++) {
      let line = "";
      for (let j = 0; j < 32; j++) {
        line += chars[Math.floor(Math.random() * chars.length)];
      }
      asciiLines.push(line);
    }
    setAscii(asciiLines);
  }

  /**
   * Handle click events on each card.  Depending on the label, the
   * appropriate effect is toggled or executed.
   */
  function handleCardClick(label: string) {
    switch (label) {
      case "AI Glitch Art":
        // Toggle the glitch animation on the heading instead of overlay
        setGlitchActive(!glitchActive);
        break;
      case "Brutalist CSS Generator": {
        // Generate a darker background and a contrasting foreground colour
        const bgHue = Math.floor(Math.random() * 360);
        const fgHue = (bgHue + 180 + Math.floor(Math.random() * 60) - 30 + 360) % 360;
        const background = `hsl(${bgHue}, 20%, ${30 + Math.floor(Math.random() * 20)}%)`;
        const foreground = `hsl(${fgHue}, 80%, ${70 + Math.floor(Math.random() * 20)}%)`;
        // Apply the new colours to CSS custom properties defined in globals.css
        document.documentElement.style.setProperty("--background", background);
        document.documentElement.style.setProperty("--foreground", foreground);
        // Also update the card area background to a complementary hue
        const cardHue = (bgHue + 90 + Math.floor(Math.random() * 60) - 30 + 360) % 360;
        const cardBg = `hsl(${cardHue}, 25%, ${45 + Math.floor(Math.random() * 10)}%)`;
        document.documentElement.style.setProperty("--card-bg", cardBg);
        break;
      }
      case "Pixel Sprite Mixer":
        if (!spriteActive) generateSprite();
        setSpriteActive(!spriteActive);
        break;
      case "Neon ASCII Shader":
        if (!asciiActive) generateAscii();
        setAsciiActive(!asciiActive);
        break;
      default:
        break;
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      /* Define a CSS variable for the card area background so it can be
       * updated dynamically and also give it a pleasant default. */
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
        // Provide a default value for the card background; this will be
        // overridden by the Brutalist generator.
        '--card-bg': '#6a8f3b',
      } as React.CSSProperties}
    >
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
          className={`${pressStart.className} text-4xl md:text-6xl mb-4 ${
            glitchActive ? 'glitch-text' : 'text-white'
          }`}
        >
          weird.cloud
        </h1>
        <p className="text-lg md:text-2xl font-mono text-[#c49ff0]">
          weird shit made by AI
        </p>
      </section>

      {/* Gallery section with four interactive cards */}
      <section
        className="w-full py-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        /* Use the CSS variable defined on the root element to set the
         * background of the card area. */
        style={{ backgroundColor: 'var(--card-bg)' }}
      >
        {cardLabels.map((label) => (
          <div
            key={label}
            onClick={() => handleCardClick(label)}
            className="relative bg-[#0d0d0d] border border-purple-800 rounded-lg p-4 flex items-center justify-center hover:bg-[#1f1f2e] transition-colors cursor-pointer overflow-hidden"
          >
            <span
              className={`${pressStart.className} text-sm text-center text-[#d6a4ff]`}
            >
              {label}
            </span>
            {/* Pixel Sprite overlay */}
            {label === 'Pixel Sprite Mixer' && spriteActive && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 p-2">
                <div className="grid grid-cols-8 gap-[1px]">
                  {sprite.map((row, i) =>
                    row.map((colour, j) => (
                      <div
                        key={`${i}-${j}`}
                        style={{ width: 12, height: 12, background: colour }}
                      />
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Footer with a call‑to‑action button */}
      <footer className="py-8 text-center relative">
        {/* When the Neon ASCII Shader is active, render the ASCII art in the footer.
            We absolutely position the container so it sits behind the button and
            disable pointer events so it doesn’t block interactions. */}
        {asciiActive && (
          <div
            className="absolute inset-0 overflow-auto px-4 flex flex-col items-center justify-center"
            style={{ pointerEvents: 'none' }}
          >
            {ascii.map((line, idx) => (
              <pre key={idx} className="font-mono text-xs neon-text m-0">
                {line}
              </pre>
            ))}
          </div>
        )}
        <a
          href="https://github.com/cresencio/weird-splash"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-green-600 text-black font-bold rounded-full hover:bg-green-500 transition-colors relative z-10"
        >
          Fork on GitHub
        </a>
      </footer>

      {/* Inline styles for animations.  These are colocated here to avoid
          polluting the global stylesheet and to make the effects self‑contained. */}
      <style jsx>{`
        .glitch-text {
          animation: glitch 1s infinite;
          color: var(--foreground);
        }
        @keyframes glitch {
          0% {
            transform: translate(0);
            text-shadow: 2px 0 red, -2px 0 blue;
          }
          20% {
            transform: translate(-2px, 2px);
            text-shadow: 2px 0 green, -2px 0 purple;
          }
          40% {
            transform: translate(2px, -2px);
            text-shadow: -2px 0 yellow, 2px 0 cyan;
          }
          60% {
            transform: translate(-1px, 1px);
            text-shadow: 1px 0 orange, -1px 0 pink;
          }
          80% {
            transform: translate(1px, -1px);
            text-shadow: -1px 0 lime, 1px 0 magenta;
          }
          100% {
            transform: translate(0);
            text-shadow: 2px 0 blue, -2px 0 red;
          }
        }
        .neon-text {
          color: transparent;
          background: linear-gradient(90deg, #00ffea, #ff00e0, #00ffea);
          background-size: 200% auto;
          -webkit-background-clip: text;
          animation: neon 3s linear infinite;
        }
        @keyframes neon {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}