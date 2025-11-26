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

                {/* Cool Robot Graphics Sitting on the Letter */}
                <div className="absolute -top-8 -right-12 w-16 h-16 animate-bounce" style={{ animationDuration: '2s' }}>
                  {/* Robot Head */}
                  <div className="relative w-full h-full">
                    {/* Robot Face */}
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg border-2 border-cyan-300 shadow-2xl mx-auto mb-1 relative overflow-hidden">
                      {/* Eyes */}
                      <div className="absolute top-2 left-2 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      <div className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>

                      {/* Mouth */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-cyan-600 rounded-full"></div>

                      {/* Antenna */}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-cyan-300"></div>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
                    </div>

                    {/* Robot Body */}
                    <div className="w-8 h-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-md mx-auto border border-cyan-400 shadow-lg relative">
                      {/* Chest Panel */}
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-2 bg-cyan-300 rounded-sm border border-cyan-200">
                        <div className="w-full h-full bg-cyan-400 rounded-sm animate-pulse opacity-75"></div>
                      </div>

                      {/* Arms */}
                      <div className="absolute -left-1 top-1 w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
                      <div className="absolute -right-1 top-1 w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
                    </div>

                    {/* Energy Effects */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-xl blur-sm animate-pulse"></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
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
