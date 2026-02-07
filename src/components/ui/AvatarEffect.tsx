"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";

export function AvatarEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  // Simplified theme detection
  const isDark = theme === 'dark' || theme === 'system';

  // Mouse position percentages (50% is center)
  const centerX = useMotionValue(50);
  const centerY = useMotionValue(50);

  // Smooth out the movement for "liquid" feel
  const smoothX = useSpring(centerX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(centerY, { stiffness: 80, damping: 20 });

  // Dynamic gradient template
  // Positions the CENTER of the radial gradient based on the clamped mouse position
  // Dark: Cyan -> Purple nebula (Lighter Opacity)
  const darkGradient = useMotionTemplate`radial-gradient(
    circle at ${smoothX}% ${smoothY}%,
    #06b6d4 0%,
    #7c3aed 45%,
    transparent 70%
  )`;

  // Light: Bio-Luminescent Intensity (Electric Cyan -> Deep Azure)
  const lightGradient = useMotionTemplate`radial-gradient(
    circle at ${smoothX}% ${smoothY}%,
    #06b6d4 0%,
    #2563eb 45%,
    transparent 70%
  )`;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const cX = rect.left + rect.width / 2;
      const cY = rect.top + rect.height / 2;

      const offsetX = e.clientX - cX;
      const offsetY = e.clientY - cY;

      // Calculate distance
      const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
      const theta = Math.atan2(offsetY, offsetX);

      // Clamp distance to max 20px radius
      // This ensures the light stays TETHERED to the center and doesn't detach
      const maxRadius = 25; // 20-25px feels right for "bulge" without breaking
      const clampedDist = Math.min(distance, maxRadius);

      // Calculate clamped offsets
      const clampedX = Math.cos(theta) * clampedDist;
      const clampedY = Math.sin(theta) * clampedDist;

      // Convert to percentage relative to container size
      // Center is 50%.
      // Movement range is roughly +/- (clampedDist / width * 100)
      const percentX = 50 + (clampedX / (rect.width)) * 100 * 2; // *2 factor to push it visibly
      const percentY = 50 + (clampedY / (rect.height)) * 100 * 2;

      centerX.set(percentX);
      centerY.set(percentY);
    };

    const handleMouseLeave = () => {
      // Return to center
      centerX.set(50);
      centerY.set(50);
    };

    // Attach to window to allow "pulling" from afar
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [centerX, centerY]);

  return (
    <div
      ref={containerRef}
      className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group z-0 flex items-center justify-center"
    >
      {/* SVG Filter for Gooey Effect (Optional polish) */}
      <svg className="hidden">
        <filter id="gooey-halo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
          <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" />
        </filter>
      </svg>

      {/* Tethered Aura Layer */}
      <motion.div
        className="absolute inset-[-40px] rounded-full pointer-events-none z-0 opacity-0 animate-[fade-in_1s_ease-out_forwards]"
        style={{
          background: isDark ? darkGradient : lightGradient,
          // Light Mode: Increased blur (60px) and brightness/saturation for intensity
          filter: isDark ? 'blur(40px)' : 'blur(60px) brightness(1.2) saturate(1.5)',
          opacity: isDark ? 0.6 : 0.9,
          // Light Mode: Normal blend for visibility
          mixBlendMode: isDark ? 'screen' : 'normal',
          // Procedural breathing animation
          animation: 'pulse-halo 5s ease-in-out infinite',
        }}
      />

      {/* Avatar Image Container */}
      <div
        className="relative w-full h-full rounded-full overflow-hidden z-10 transition-transform duration-500 hover:scale-[1.02]"
        style={{
          border: isDark ? '4px solid rgba(255,255,255,0.1)' : '4px solid #000',
          boxShadow: isDark
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            : 'inset 0 0 0 2px #000, 0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Image
          src="/avatar.jpg"
          alt="Phuc Anh"
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-700"
          priority
        />
      </div>

      <style jsx global>{`
        @keyframes pulse-halo {
          0%, 100% { transform: scale(1.0); opacity: ${isDark ? 0.6 : 0.9}; }
          50% { transform: scale(1.05); opacity: ${isDark ? 0.8 : 0.8}; }
        }
      `}</style>
    </div>
  );
}
