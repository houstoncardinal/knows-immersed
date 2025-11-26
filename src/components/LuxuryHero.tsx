import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Crown, Bot, Zap } from "lucide-react";
import { useParallax } from "@/hooks/useScrollAnimation";
import { useEffect, useState, useCallback, useRef, memo } from "react";
import { BookingModal } from "./BookingModal";
import { useTheme } from "@/contexts/ThemeContext";
import { AIAssistant } from "./admin/AIAssistant";

export const LuxuryHero = memo(() => {
  const offsetY = useParallax();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const { theme } = useTheme();
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize AudioContext once for performance
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Mechanical Keyboard/Mouse Click Sounds - Optimized for Performance
  const playSound = useCallback((type: 'hover' | 'click') => {
    try {
      const audioContext = getAudioContext();

      if (type === 'hover') {
        // Mechanical hover sound - like mouse movement
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Mechanical characteristics
        oscillator.frequency.setValueAtTime(1800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.02);

        // Low-pass filter for mechanical sound
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, audioContext.currentTime);
        filter.Q.setValueAtTime(1, audioContext.currentTime);

        // Quick mechanical click
        gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.02);

        oscillator.type = 'square'; // Mechanical sound

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.02);

      } else if (type === 'click') {
        // Keyboard/mouse click sound - crisp mechanical
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();

        oscillator1.connect(filter);
        oscillator2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Primary click frequency
        oscillator1.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator1.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.03);

        // Secondary harmonic
        oscillator2.frequency.setValueAtTime(1600, audioContext.currentTime);
        oscillator2.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.03);

        // Mechanical filter
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3000, audioContext.currentTime);
        filter.Q.setValueAtTime(2, audioContext.currentTime);

        // Crisp mechanical volume
        gainNode.gain.setValueAtTime(0.12, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.03);

        oscillator1.type = 'square';
        oscillator2.type = 'triangle';

        oscillator1.start(audioContext.currentTime);
        oscillator2.start(audioContext.currentTime);
        oscillator1.stop(audioContext.currentTime + 0.03);
        oscillator2.stop(audioContext.currentTime + 0.03);
      }

    } catch (error) {
      // Silently fail if Web Audio API is not supported
      console.log('Audio not supported');
    }
  }, [getAudioContext]);

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getThemeColors = () => {
    switch (theme) {
      case 'cyberpunk':
        return {
          primary: '#00ffff', // Electric cyan
          secondary: '#ff00ff', // Magenta
          gradient: 'linear-gradient(135deg, #00ffff, #0080ff, #0040ff)',
          shadowColor: 'rgba(0,255,255,0.8)'
        };
      case 'professional':
        return {
          primary: '#0066cc', // Professional blue
          secondary: '#004499', // Deeper blue
          gradient: 'linear-gradient(135deg, #0066cc, #004499, #002266)',
          shadowColor: 'rgba(0,102,204,0.8)'
        };
      case 'futuristic':
        return {
          primary: '#8000ff', // Electric purple
          secondary: '#ff00ff', // Magenta
          gradient: 'linear-gradient(135deg, #8000ff, #a000ff, #c000ff)',
          shadowColor: 'rgba(128,0,255,0.8)'
        };
      case 'minimal':
        return {
          primary: '#1a365d', // Sophisticated dark blue
          secondary: '#2d3748', // Dark gray-blue
          gradient: 'linear-gradient(135deg, #1a365d, #2d3748, #4a5568)',
          shadowColor: 'rgba(26,54,93,0.8)'
        };
      case 'ocean-breeze':
        return {
          primary: '#00cccc', // Ocean teal
          secondary: '#009999', // Deeper teal
          gradient: 'linear-gradient(135deg, #00cccc, #009999, #006666)',
          shadowColor: 'rgba(0,204,204,0.8)'
        };
      case 'boom-headshot':
        return {
          primary: '#ff6600', // Orange
          secondary: '#cc3300', // Red-orange
          gradient: 'linear-gradient(135deg, #ff6600, #ff8533, #cc3300)',
          shadowColor: 'rgba(255,102,0,0.8)'
        };
      case 'luxe-gold':
      default:
        return {
          primary: '#ffffff', // Pure white for luxury
          secondary: '#f8f9fa', // Off-white
          gradient: 'linear-gradient(135deg, #ffffff, #f8f9fa, #e9ecef)',
          shadowColor: 'rgba(255,255,255,0.9)'
        };
    }
  };

  const themeColors = getThemeColors();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Professional Background Image */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-500 ease-out"
        style={{
          backgroundImage: "url('/images/6410f68e1714e4bfddcd18c3_DSC08256.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4) contrast(1.3) saturate(1.1) grayscale(0.1)",
          transform: `translateY(${offsetY * 0.2}px) scale(1.1)`,
        }}
      />

      {/* Subtle Vignette for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-10" />

      {/* Professional Content Container */}
      <div className="relative z-20 container mx-auto px-6 text-center pt-32 md:pt-40">
        <div className="max-w-6xl mx-auto">

          {/* Professional Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full text-sm font-semibold text-slate-700 mb-8 shadow-lg">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            North Hollywood's Premier Creative Studio
          </div>

          {/* Enhanced Neural Headline with Sound Interactions */}
          <div className="mb-12 relative">
            <h1 className="text-7xl sm:text-9xl md:text-[10rem] lg:text-[14rem] xl:text-[16rem] font-black leading-none mb-6 text-white animate-pulse" style={{ fontWeight: 900 }}>
              <span
                className="block mb-4 animate-in slide-in-from-left duration-1000 delay-300 cursor-pointer transition-all duration-300 hover:scale-105 neural-hover"
                style={{
                textShadow: `inset 0 0 12px rgba(0,255,255,0.8), inset 2px 2px 8px rgba(0,206,209,0.7), inset -1px -1px 6px rgba(32,178,170,0.6), inset 1px 1px 4px rgba(64,224,208,0.8), 0 0 8px rgba(0,255,255,1), 0 0 20px rgba(0,206,209,0.9), 0 0 40px rgba(32,178,170,0.8), 0 0 80px rgba(64,224,208,0.7), 0 0 120px rgba(72,209,204,0.6), 0 0 160px rgba(0,191,255,0.5), 0 0 200px rgba(30,144,255,0.4), 0 0 240px rgba(0,139,139,0.3), 0 0 280px rgba(0,128,128,0.2), 4px 4px 32px rgba(0,0,0,0.9)`,
                filter: `drop-shadow(0 0 60px ${themeColors.shadowColor.replace('0.8', '0.8')}) brightness(2.0) contrast(1.5)`,
                color: '#ffffff',
                textRendering: 'optimizeLegibility',
                fontFeatureSettings: '"kern" 1, "liga" 1',
                WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)'
                }}
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
              >
                KNOWS
              </span>
              <span
                className="block animate-in slide-in-from-right duration-1000 delay-500 cursor-pointer transition-all duration-300 hover:scale-105 neural-hover relative"
                style={{
                textShadow: `inset 0 0 12px rgba(0,255,255,0.8), inset 2px 2px 8px rgba(0,206,209,0.7), inset -1px -1px 6px rgba(32,178,170,0.6), inset 1px 1px 4px rgba(64,224,208,0.8), 0 0 8px rgba(0,255,255,1), 0 0 20px rgba(0,206,209,0.9), 0 0 40px rgba(32,178,170,0.8), 0 0 80px rgba(64,224,208,0.7), 0 0 120px rgba(72,209,204,0.6), 0 0 160px rgba(0,191,255,0.5), 0 0 200px rgba(30,144,255,0.4), 0 0 240px rgba(0,139,139,0.3), 0 0 280px rgba(0,128,128,0.2), 3px 3px 32px rgba(0,0,0,0.9)`,
                filter: `drop-shadow(0 0 60px ${themeColors.shadowColor.replace('0.8', '0.8')}) brightness(2.0) contrast(1.5)`,
                color: '#ffffff',
                textRendering: 'optimizeLegibility',
                fontFeatureSettings: '"kern" 1, "liga" 1',
                WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)'
                }}
                onMouseEnter={() => playSound('hover')}
                onClick={() => {
                  playSound('click');
                  setAiAssistantOpen(true);
                }}
              >
                STUDIOS

                {/* Advanced Interactive KNOWS AI Character */}
                <div className="absolute -top-16 -right-12 w-24 h-24 group/robot" style={{ animation: 'robotFloat 4s ease-in-out infinite, robotGlow 3s ease-in-out infinite' }}>
                  {/* Main Character Image */}
                  <div className="relative w-full h-full cursor-pointer transform transition-all duration-500 group-hover/robot:scale-125 group-hover/robot:rotate-6">
                    <img
                      src="/knowsai.png"
                      alt="KNOWS AI Assistant"
                      className="w-full h-full object-contain drop-shadow-2xl filter brightness-110 contrast-110"
                      style={{
                        filter: 'drop-shadow(0 0 20px rgba(0,255,255,0.8)) drop-shadow(0 0 40px rgba(0,255,255,0.4)) brightness(1.1) contrast(1.1)',
                        animation: 'characterPulse 2s ease-in-out infinite, characterFloat 3s ease-in-out infinite'
                      }}
                    />

                    {/* Enhanced Energy Aura */}
                    <div className="absolute inset-0 bg-gradient-radial from-cyan-400/40 via-blue-500/20 to-transparent rounded-full blur-xl animate-pulse opacity-70"></div>
                    <div className="absolute inset-0 bg-gradient-radial from-cyan-300/20 via-transparent to-transparent rounded-full blur-2xl animate-ping opacity-50" style={{ animationDuration: '3s' }}></div>

                    {/* Interactive Particle Effects */}
                    <div className="absolute -top-3 -left-3 w-2 h-2 bg-cyan-400 rounded-full animate-bounce opacity-90" style={{ animationDelay: '0s', animationDuration: '1.5s' }}></div>
                    <div className="absolute -top-2 -right-4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce opacity-80" style={{ animationDelay: '0.3s', animationDuration: '2s' }}></div>
                    <div className="absolute -bottom-3 -left-2 w-1 h-1 bg-cyan-300 rounded-full animate-bounce opacity-70" style={{ animationDelay: '0.6s', animationDuration: '1.8s' }}></div>
                    <div className="absolute -bottom-2 -right-3 w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce opacity-85" style={{ animationDelay: '0.9s', animationDuration: '2.2s' }}></div>

                    {/* Scanning Laser Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover/robot:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" style={{ animation: 'scanLine 1.5s linear infinite' }}></div>
                    </div>

                    {/* Hover Interaction Rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 animate-ping opacity-0 group-hover/robot:opacity-100" style={{ animationDuration: '2s' }}></div>
                    <div className="absolute inset-2 rounded-full border border-blue-400/30 animate-ping opacity-0 group-hover/robot:opacity-100" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>

                    {/* Text Connection Beam */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-cyan-400 via-cyan-300 to-transparent animate-pulse opacity-60"></div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-cyan-400/50 rounded-full blur-sm animate-pulse"></div>
                  </div>



                  {/* Character Status Indicator */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-lg animate-pulse">
                    <div className="w-full h-full bg-green-300 rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>

                {/* Hover Tooltip */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-black/80 text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Click to meet our AI Assistant! 🤖
                </div>
              </span>
            </h1>

            {/* Neural Interface Glow Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-white/20 via-transparent to-transparent animate-pulse" />
            </div>
          </div>

          {/* Professional Subheading with Enhanced Visibility */}
          <div className="mb-12 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 leading-tight animate-in fade-in duration-1000 delay-800" style={{
              textShadow: '0 0 10px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3), 2px 2px 4px rgba(0,0,0,0.8)',
              filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.2))'
            }}>
              Professional CYC Wall Studio
              <br />
              <span className="text-gray-200 font-medium animate-in fade-in duration-1000 delay-900" style={{
                textShadow: '0 0 8px rgba(255,255,255,0.4), 1px 1px 2px rgba(0,0,0,0.8)'
              }}>for Film & Photography</span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto font-medium animate-in fade-in duration-1000 delay-1000" style={{
              textShadow: '0 0 6px rgba(255,255,255,0.3), 1px 1px 2px rgba(0,0,0,0.7)'
            }}>
              Where creativity meets precision. A world-class facility designed for visionary artists,
              acclaimed filmmakers, and professional photographers seeking excellence.
            </p>
          </div>

          {/* Enhanced Neural CTA Buttons with Sound Effects */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-in fade-in duration-1000 delay-1100">
            <Button
              onClick={() => {
                playSound('click');
                setBookingOpen(true);
              }}
              onMouseEnter={() => playSound('hover')}
              size="lg"
              className="bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white text-black font-bold text-xl px-16 py-8 shadow-2xl hover:shadow-3xl transition-all duration-300 group border-2 border-white hover:border-gray-200 neural-button"
              style={{
                boxShadow: '0 0 30px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.5)',
                textShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              <Crown className="mr-4 w-6 h-6 group-hover:rotate-12 transition-transform" />
              Reserve Your Session
              <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              onClick={() => {
                playSound('click');
                scrollToAbout();
              }}
              onMouseEnter={() => playSound('hover')}
              size="lg"
              variant="outline"
              className="border-2 border-white/80 text-white hover:bg-white/10 font-bold text-xl px-16 py-8 shadow-xl hover:shadow-2xl transition-all duration-300 group bg-transparent backdrop-blur-sm neural-button"
              style={{
                boxShadow: '0 0 20px rgba(255,255,255,0.2), 0 0 40px rgba(255,255,255,0.1)',
                textShadow: '0 0 8px rgba(255,255,255,0.5), 1px 1px 2px rgba(0,0,0,0.8)'
              }}
            >
              <Play className="mr-4 w-6 h-6 group-hover:scale-110 transition-transform" />
              Explore Studio
            </Button>
          </div>

          {/* Professional Trust & Reviews with Enhanced Visibility */}
          <div className="max-w-4xl mx-auto animate-in fade-in duration-1000 delay-1200">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
              {/* Rating Display */}
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20" style={{
                boxShadow: '0 0 20px rgba(255,255,255,0.1), 0 0 40px rgba(255,255,255,0.05)'
              }}>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-pulse" style={{
                      filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.6))'
                    }} />
                  ))}
                </div>
                <div className="text-2xl font-bold text-white mb-1" style={{
                  textShadow: '0 0 10px rgba(255,255,255,0.5), 1px 1px 2px rgba(0,0,0,0.8)'
                }}>5.0</div>
                <div className="text-sm text-gray-300" style={{
                  textShadow: '0 0 6px rgba(255,255,255,0.3), 1px 1px 2px rgba(0,0,0,0.7)'
                }}>Average Rating</div>
              </div>

              {/* Review Count */}
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20" style={{
                boxShadow: '0 0 20px rgba(255,255,255,0.1), 0 0 40px rgba(255,255,255,0.05)'
              }}>
                <div className="text-2xl font-bold text-white mb-1" style={{
                  textShadow: '0 0 10px rgba(255,255,255,0.5), 1px 1px 2px rgba(0,0,0,0.8)'
                }}>150+</div>
                <div className="text-sm text-gray-300" style={{
                  textShadow: '0 0 6px rgba(255,255,255,0.3), 1px 1px 2px rgba(0,0,0,0.7)'
                }}>Verified Reviews</div>
              </div>

              {/* Professional Accreditation */}
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20" style={{
                boxShadow: '0 0 20px rgba(255,255,255,0.1), 0 0 40px rgba(255,255,255,0.05)'
              }}>
                <Crown className="w-6 h-6 text-yellow-400 mb-3 animate-pulse" style={{
                  filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.6))'
                }} />
                <div className="text-sm font-semibold text-white" style={{
                  textShadow: '0 0 8px rgba(255,255,255,0.4), 1px 1px 2px rgba(0,0,0,0.8)'
                }}>Industry Certified</div>
                <div className="text-xs text-gray-300" style={{
                  textShadow: '0 0 6px rgba(255,255,255,0.3), 1px 1px 2px rgba(0,0,0,0.7)'
                }}>Professional Standards</div>
              </div>
            </div>

            {/* Review Links */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <button className="text-white hover:text-yellow-400 font-medium text-sm underline underline-offset-4 hover:underline-offset-2 transition-all duration-300 animate-pulse" style={{
                textShadow: '0 0 8px rgba(255,255,255,0.4), 1px 1px 2px rgba(0,0,0,0.8)'
              }}>
                View Google Reviews →
              </button>
              <button className="text-white hover:text-yellow-400 font-medium text-sm underline underline-offset-4 hover:underline-offset-2 transition-all duration-300 animate-pulse" style={{
                textShadow: '0 0 8px rgba(255,255,255,0.4), 1px 1px 2px rgba(0,0,0,0.8)'
              }}>
                Read Testimonials →
              </button>
              <button className="text-white hover:text-yellow-400 font-medium text-sm underline underline-offset-4 hover:underline-offset-2 transition-all duration-300 animate-pulse" style={{
                textShadow: '0 0 8px rgba(255,255,255,0.4), 1px 1px 2px rgba(0,0,0,0.8)'
              }}>
                Client Gallery →
              </button>
            </div>
          </div>
        </div>
      </div>



      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />

      {/* AI Assistant - Powered by ElevenLabs */}
      <AIAssistant
        isOpen={aiAssistantOpen}
        onToggle={() => setAiAssistantOpen(!aiAssistantOpen)}
        currentPage="home"
      />

    </section>
  );
});
