import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LuxuryLoaderProps {
  onComplete?: () => void;
}

export const LuxuryLoader = ({ onComplete }: LuxuryLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + increment, 100);
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            onComplete?.();
          }, 500);
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center luxury-backdrop"
        >
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-neon-cyan/20 to-transparent rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -100, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-neon-pink/20 to-transparent rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                x: [0, 50, 0],
                y: [0, -100, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[hsl(var(--luxury-gold))]/20 to-transparent rounded-full blur-3xl"
            />
          </div>

          {/* Main Loader Content */}
          <div className="relative z-10 text-center">
            {/* Logo/Brand */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-12"
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-4 luxury-text">
                <span className="text-shimmer-luxury">KNOWS</span>
              </h1>
              <motion.div
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-1 bg-gradient-to-r from-transparent via-[hsl(var(--luxury-gold))] to-transparent mx-auto"
              />
              <p className="text-xl md:text-2xl mt-4 text-gradient-premium font-semibold tracking-wider">
                STUDIOS
              </p>
            </motion.div>

            {/* Circular Progress */}
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
                {/* Background Circle */}
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="4"
                />
                {/* Progress Circle */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    strokeDasharray: 440,
                    strokeDashoffset: 440 - (440 * progress) / 100,
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--luxury-gold))" />
                    <stop offset="50%" stopColor="hsl(var(--neon-cyan))" />
                    <stop offset="100%" stopColor="hsl(var(--neon-pink))" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Progress Percentage */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  key={Math.floor(progress)}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl font-bold text-gradient-luxury"
                >
                  {Math.floor(progress)}%
                </motion.span>
              </div>

              {/* Rotating Glow Effect */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-50"
              >
                <div className="w-full h-full rounded-full shadow-luxury-xl" />
              </motion.div>
            </div>

            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-sm tracking-[0.3em] uppercase text-muted-foreground"
            >
              {progress < 33 && "Loading Experience"}
              {progress >= 33 && progress < 66 && "Preparing Studio"}
              {progress >= 66 && progress < 100 && "Almost Ready"}
              {progress === 100 && "Welcome"}
            </motion.p>

            {/* Animated Dots */}
            <div className="flex gap-2 justify-center mt-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-pink"
                />
              ))}
            </div>
          </div>

          {/* Bottom Decorative Element */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center"
          >
            <p className="text-xs text-muted-foreground tracking-widest uppercase">
              North Hollywood's Premier Creative Studio
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
