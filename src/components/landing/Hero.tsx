import React from "react";
import upvachiLogo from "/web-app-manifest-512x512.png";
import heroBird from "../../assets/images/hero-bird.png";

const Hero: React.FC = () => {
  const nodes = [
    { x: 120, y: 80 },
    { x: 300, y: 50 },
    { x: 480, y: 150 },
    { x: 660, y: 100 },
    { x: 840, y: 180 },
    { x: 540, y: 250 },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [2, 5],
    [0, 5],
    [4, 5],
  ];
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-br from-gray-950 via-[#0b1222] to-[#040a16] overflow-hidden px-4 sm:px-6 pb-10 lg:pb-0"
    >
      {/* Background SVG Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15"
        viewBox="0 0 1000 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gradEdge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="50%" stopColor="#4A90E2" />
            <stop offset="100%" stopColor="#8E2DE2" />
          </linearGradient>
          <filter id="blurGlow">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {edges.map(([i, j], index) => (
          <line
            key={index}
            x1={nodes[i].x}
            y1={nodes[i].y}
            x2={nodes[j].x}
            y2={nodes[j].y}
            stroke="url(#gradEdge)"
            strokeWidth="0.5"
            filter="url(#blurGlow)"
          ></line>
        ))}
        {nodes.map((n, index) => (
          <circle
            key={index}
            cx={n.x}
            cy={n.y}
            r="2"
            fill={index % 2 === 0 ? "url(#gradEdge)" : "none"}
            stroke={index % 2 !== 0 ? "url(#gradEdge)" : "none"}
            strokeWidth="0.5"
            filter="url(#blurGlow)"
          />
        ))}
      </svg>

      {/* Left/Main content */}
      <div className="z-10 flex flex-col gap-8 max-w-xl lg:max-w-lg xl:max-w-xl px-2 sm:px-6 text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-2 lg:gap-4 bg-opacity-30 rounded-xl px-2 py-6">
          <img
            src={upvachiLogo}
            className="w-16 h-16 md:w-24 md:h-24 rounded-3xl border-2 border-[#1a2a4f] shadow-inner shadow-[#0b1936]/40"
            alt="UpVachi Logo"
          />
          <h1 className="ml-2 text-3xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#cccccc] via-[#3069e4] to-[#c44881] drop-shadow-lg tracking-tight">
            UpVachi
          </h1>
        </div>

        <div className="flex flex-col gap-1 md:gap-2 leading-tight">
          <span className="text-white text-[2rem] md:text-4xl lg:text-5xl font-extrabold">
            Chirping Minds,
          </span>
          <span className="text-transparent bg-clip-text font-extrabold text-[2rem] md:text-4xl lg:text-5xl bg-gradient-to-r from-[#FF6B6B] via-[#4A90E2] to-[#8E2DE2]">
            Flowing Chats
          </span>
        </div>

        <p className="text-base md:text-lg lg:text-xl text-gray-300 font-light max-w-prose mx-auto lg:mx-0">
          An AI-powered bird assistant that chirps back smartly across WhatsApp,
          Facebook, and Instagram &mdash; made for creators, solopreneurs, and
          businesses.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 mt-3 justify-center lg:justify-start">
          <button
            className="w-full sm:w-auto px-12 py-3 bg-white text-black font-semibold rounded-full transition hover:scale-105 focus:outline-none"
            onClick={() => (window.location.href = "/auth/signup")}
          >
            Get Started
          </button>
          <div className="w-full sm:w-auto p-[2px] bg-gradient-to-r from-[#5586FF] via-[#9570FF] to-[#4F2FF0] rounded-full transition hover:scale-105">
            <button className="w-full px-12 py-3 bg-[#0E0F17] text-[#5586FF] font-semibold rounded-full">
              Watch Live
            </button>
          </div>
        </div>
      </div>

      {/* Right SVG(Desktop only) */}
      <div className="hidden lg:flex flex-1 items-center justify-center h-full">
        <img
          src={heroBird}
          alt="UpVachi AI Bird"
          className="w-[500px] max-w-full h-auto rounded-[2rem]"
        />
      </div>
    </section>
  );
};

export default Hero;
