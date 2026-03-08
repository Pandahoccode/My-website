"use client";

import { useEffect, useState, useRef } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

interface ScrollFramesProps {
  children?: React.ReactNode;
}

export function ScrollFrames({ children }: ScrollFramesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const lastFrameRef = useRef(1);

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

  // **CRITICAL: Pre-load and PRE-DECODE all frames**
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    const loadImage = async (i: number) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = `/frames/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;

        img.onload = async () => {
          // CRUCIAL: Pre-decode the image to avoid runtime lag
          try {
            if ('decode' in img) {
              await img.decode();
            }
          } catch (error) {
            console.warn(`Failed to decode frame ${i}:`, error);
          }

          loaded++;
          if (loaded === TOTAL_FRAMES) {
            setIsLoaded(true);
          }
          resolve();
        };

        img.onerror = () => {
          console.error(`Failed to load frame ${i}`);
          loaded++;
          if (loaded === TOTAL_FRAMES) {
            setIsLoaded(true);
          }
          resolve();
        };

        images.push(img);
      });
    };

    // Load all frames
    Promise.all(
      Array.from({ length: TOTAL_FRAMES }, (_, i) => loadImage(i + 1))
    );

    imagesRef.current = images;

    return () => {
      // Cleanup
      imagesRef.current = [];
    };
  }, []);

  // **DOM MANIPULATION: Update img.src directly for zero flicker**
  useEffect(() => {
    const unsubscribe = frameNumber.on("change", (latest) => {
      const rounded = Math.round(latest);
      const clamped = Math.min(TOTAL_FRAMES, Math.max(1, rounded));

      // Skip update if frame hasn't changed
      if (clamped === lastFrameRef.current) return;
      lastFrameRef.current = clamped;

      const imgElement = imgRef.current;
      if (!imgElement) return;

      const frameIndex = clamped - 1; // 0-indexed
      const preloadedImg = imagesRef.current[frameIndex];

      // **ANTI-FLICKER LOGIC**: Only update src if image is fully decoded
      // If not ready, keep showing the previous frame
      if (preloadedImg && preloadedImg.complete && preloadedImg.naturalWidth > 0) {
        // Direct DOM manipulation - no React re-render, no flicker
        imgElement.src = preloadedImg.src;
      }
    });

    return unsubscribe;
  }, [frameNumber]);

  return (
    <section
      ref={containerRef}
      className="relative mb-24 md:mb-32"
      style={{ height: '400vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Single img element - updated via DOM manipulation */}
        <img
          ref={imgRef}
          src="/frames/ezgif-frame-001.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ imageRendering: 'crisp-edges' }}
        />

        {/* Updated Gradient Overlay matching new palette */}
        <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-background/150 to-transparent " />
        <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto">
            {children}
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <ScrollIndicator />
      </div>
    </section>
  );
}
