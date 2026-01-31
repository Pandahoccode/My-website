"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollFramesProps {
  children?: React.ReactNode;
}

export function ScrollFrames({ children }: ScrollFramesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);

  const TOTAL_FRAMES = 150;

  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Spring Physics for elite fluidity (stiffness: 100, damping: 30)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform smooth progress to frame number
  const frameNumber = useTransform(smoothProgress, [0, 0.75, 1], [1, TOTAL_FRAMES, TOTAL_FRAMES]);

  // Sync frame number to state for image rendering
  useEffect(() => {
    const unsubscribe = frameNumber.on("change", (latest) => {
      const rounded = Math.round(latest);
      const clamped = Math.min(TOTAL_FRAMES, Math.max(1, rounded));
      setCurrentFrame(clamped);
    });
    return unsubscribe;
  }, [frameNumber]);

  // Preload all frames... (omitted for brevity, keeping existing logic)
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
      img.onload = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) setIsLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) setIsLoaded(true);
      };
      images.push(img);
    }
  }, []);

  const imageSrc = `/frames/ezgif-frame-${currentFrame.toString().padStart(3, '0')}.jpg`;

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: '400vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Frame Image */}
        <motion.img
          key={currentFrame}
          src={imageSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={false}
        />

        {/* Updated Gradient Overlay matching new palette */}
        {/* Updated Gradient Overlay matching new palette */}
        <div className="absolute top-0 left-0 right-0 h-[20vh] bg-gradient-to-b from-background/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[20vh] bg-gradient-to-t from-background via-background/90 to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          {children}
        </div>

        {/* Loading */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-background flex items-center justify-center z-50">
            <div className="text-electric-blue font-mono animate-pulse">Loading frames...</div>
          </div>
        )}

        {/* Debug - remove in production
        <div className="absolute bottom-4 right-4 text-xs text-white/50 font-mono z-20">
          Frame: {currentFrame}/{TOTAL_FRAMES}
        </div>
        */}
      </div>
    </section>
  );
}
