import { useEffect, useState } from "react";
import { Crown, Sparkles, Star, Zap } from "lucide-react";

export function CelebrationAnimation({ onComplete }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onComplete) {
        setTimeout(onComplete, 500); // Wait for fade out
      }
    }, 4000); // Show for 4 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Generate confetti particles
  const confetti = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    color: ["#FFD700", "#FFA500", "#FF6B9D", "#828BF8", "#AAD6B8", "#FEF18C"][
      Math.floor(Math.random() * 6)
    ],
  }));

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`relative transform transition-all duration-500 ${
            show
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-95 opacity-0 translate-y-10"
          }`}
        >
          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FFD700] border-[6px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 rounded-2xl max-w-md mx-4">
            {/* Animated background sparkles */}
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`,
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center space-y-6">
              {/* Crown Icon with Animation */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-full blur-2xl opacity-75 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FFD700] border-[4px] border-black rounded-full p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-bounce">
                    <Crown className="w-12 h-12 text-black" />
                  </div>
                  {/* Rotating sparkles around crown */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `rotate(${(i * 360) / 8}deg) translateY(-60px)`,
                        animation: `rotate 3s linear infinite`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    >
                      <Sparkles
                        className="w-3 h-3 text-white animate-pulse"
                        style={{
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Message */}
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-black uppercase tracking-tight drop-shadow-[2px_2px_0px_rgba(255,255,255,0.5)]">
                  Welcome to Pro!
                </h2>
                <p className="text-lg font-bold text-black/80">
                  Your subscription is now active
                </p>
              </div>

              {/* Features List */}
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { icon: Star, label: "Premium" },
                  { icon: Zap, label: "Unlocked" },
                  { icon: Sparkles, label: "Pro Features" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 bg-white/90 border-[2px] border-black px-3 py-1.5 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      style={{
                        animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both`,
                      }}
                    >
                      <Icon className="w-4 h-4 text-black" />
                      <span className="text-xs font-black text-black uppercase">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Confetti */}
          {confetti.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                left: `${particle.left}%`,
                top: "-10px",
                backgroundColor: particle.color,
                animation: `confettiFall ${particle.duration}s ease-out ${particle.delay}s forwards`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg) translateY(-60px) rotate(0deg); }
          to { transform: rotate(360deg) translateY(-60px) rotate(-360deg); }
        }
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

