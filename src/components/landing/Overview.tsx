import { Brain, Users, Zap } from "lucide-react";

const Overview = () => {
  return (
    <section id="overview" className="py-20 bg-gray-950 relative">
      {/* Subtle Neural Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 600">
          <defs>
            <linearGradient
              id="overviewNeural"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#35A7FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#824DFF" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M0,300 Q300,250 600,300 T1200,350"
            stroke="url(#overviewNeural)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M0,200 Q400,150 800,200 T1200,250"
            stroke="url(#overviewNeural)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What is UpVachi?
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            UpVachi isn't another chatbot or voice assistant. It's your digital
            "talker" — an AI-powered second voice that speaks on your behalf
            across major messaging platforms, using your unique tone, style, and
            personality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 bg-gradient-to-br from-[#824DFF] to-[#35A7FF] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#35A7FF]/25 group-hover:shadow-[#35A7FF]/40 transition-all duration-300">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  No Scripts, Pure Personality
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Unlike rigid chatbots, UpVachi learns your communication style
                  and reflects your genuine personality in every interaction.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 bg-gradient-to-br from-[#FF6B6B] via-[#4A90E2] to-[#FFD93D] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#824DFF]/25 group-hover:shadow-[#824DFF]/40 transition-all duration-300">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Real-Time Responses
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Instant replies to DMs, comments, mentions, and lead messages
                  across Instagram, WhatsApp, and Facebook — 24/7.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-rose-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#35A7FF]/25 group-hover:shadow-[#35A7FF]/40 transition-all duration-300">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Built for Creators & Businesses
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Perfect for creators who can't be everywhere, brands wanting
                  to scale with care, and individuals who need their own
                  assistant.
                </p>
              </div>
            </div>
          </div>

          <div className="relative max-w-md mx-auto">
            {/* Outer gradient border with padding */}
            <div className="bg-gradient-to-br from-[#FFD93D]/20 via-[#4A90E2]/20 to-[#FF6B6B]/20 rounded-3xl p-8 border border-[#FFD93D]/30 backdrop-blur-sm">
              {/* Inner dark box with shadow and border */}
              <div className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a44] rounded-2xl shadow-2xl p-8 border border-[#4A90E2]/30">
                <div className="space-y-5">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Personality Match
                    </p>
                    <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-4 rounded-full shadow-md shadow-[#FFD93D]/60 w-4/5 bg-gradient-to-r from-[#824DFF] to-[#35A7FF]"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Emotional Intelligence
                    </p>
                    <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-4 rounded-full shadow-md shadow-[#4A90E2]/60 w-3/5 bg-gradient-to-r from-[#FF6B6B] via-[#4A90E2] to-[#FFD93D]"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Response Accuracy
                    </p>
                    <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-4 rounded-full shadow-md shadow-[#FF6B6B]/60 w-5/6 bg-gradient-to-r from-blue-600 to-rose-600"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-8">
                <p className="text-gray-300 font-semibold text-sm tracking-wide">
                  AI-Powered • Memory-Enabled • Emotionally Intelligent
                </p>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#FFD93D]/10 via-[#4A90E2]/10 to-[#FF6B6B]/10 blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
