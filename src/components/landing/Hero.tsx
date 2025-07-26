import React from "react";

const bubbleColors = [
  "bg-[#4A90E2]",
  "bg-[#FF6B6B]",
  "bg-[#8E2DE2]",
  "bg-[#FFD93D]",
  "bg-[#36D399]",
  "bg-[#F46AA0]",
];

// Predefined bubble positions for layout consistency
const bubbles = [
  { top: "10%", left: "15%", size: 20 },
  { top: "25%", left: "70%", size: 24 },
  { top: "30%", left: "40%", size: 22 },
  { top: "50%", left: "20%", size: 26 },
  { top: "60%", left: "60%", size: 20 },
  { top: "65%", left: "35%", size: 24 },
  { top: "70%", left: "75%", size: 22 },
  { top: "35%", left: "50%", size: 18 },
  { top: "20%", left: "85%", size: 20 },
];

const Hero: React.FC = () => {
  return (
    <section
      className="flex flex-col items-center justify-center w-full bg-gradient-to-br from-gray-950 via-[#0b1222] to-[#040a16] overflow-hidden px-8 gap-10 pt-30 pb-20"
      style={{ minHeight: "calc(100vh - 64px)", marginTop: "64px" }}
    >
      {/* Floating Bubbles */}
      {bubbles.map((b, idx) => (
        <div
          key={idx}
          className={`absolute ${
            bubbleColors[idx % bubbleColors.length]
          } rounded-full opacity-20 blur-lg`}
          style={{
            top: b.top,
            left: b.left,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animation: `bubble-bounce${idx} 6s ease-in-out infinite alternate`,
          }}
        />
      ))}

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFD93D] via-[#4A90E2] to-[#FF6B6B] drop-shadow-xl text-center md:text-left">
        Chat. Chirp. Conquer.
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-300 font-medium text-center max-w-xl leading-relaxed">
        An AI-powered bird that chirps back to your clients, community, or
        friends on all your favorite platforms.
      </p>
      <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center md:justify-start mt-4">
        <button
          className="w-full sm:w-auto px-8 py-3 bg-white text-black font-semibold rounded-full transition hover:scale-105"
          onClick={() => (window.location.href = "/auth/signup")}
        >
          Get Started
        </button>
        <div className="w-full sm:w-auto p-[2px] bg-gradient-to-r from-[#FFD93D] via-[#4A90E2] to-[#FF6B6B] rounded-full transition hover:scale-105">
          <button className="w-full px-8 py-3 bg-[#0E0F17] text-[#5586FF] font-semibold rounded-full">
            Watch Live
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
