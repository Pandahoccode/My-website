"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue, useMotionTemplate, useReducedMotion } from "framer-motion";
import { useThemeDark } from '@/hooks/useThemeDark';

export function AvatarEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDark, mounted } = useThemeDark();
  const prefersReducedMotion = useReducedMotion();

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

    // Skip mouse tracking if user prefers reduced motion
    if (prefersReducedMotion) return;

    // Attach to window to allow "pulling" from afar
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [centerX, centerY, prefersReducedMotion]);

  if (!mounted) return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96" />
  );

  return (
    <div
      ref={containerRef}
      className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group z-0 flex items-center justify-center transform perspective-1000"
    >
      {/* SVG Filter for Gooey Effect (Optional polish) */}
      <svg className="hidden">
        <filter id="gooey-halo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
          <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" />
        </filter>
      </svg>

      {/* Tethered Aura Layer (Phase 11: Elastic Halo) */}
      <motion.div
        className="absolute inset-[-60px] rounded-full pointer-events-none z-0 opacity-0 animate-[fade-in_1s_ease-out_forwards]"
        style={{
          background: isDark ? darkGradient : lightGradient,
          // Light Mode: Increased blur (60px) and brightness/saturation for intensity
          filter: isDark ? 'blur(50px)' : 'blur(70px) brightness(1.3) saturate(1.8)',
          opacity: isDark ? 0.7 : 0.8,
          // Light Mode: Normal blend for visibility
          mixBlendMode: isDark ? 'screen' : 'normal',
          // Procedural breathing animation
          animation: prefersReducedMotion ? 'none' : 'pulse-halo 4s ease-in-out infinite',
        }}
      />

      {/* Avatar Image Container - The Source */}
      <div
        className="relative w-full h-full rounded-full overflow-hidden z-10 transition-transform duration-500 hover:scale-[1.03] hover:rotate-2"
        style={{
          border: isDark ? '4px solid rgba(255,255,255,0.15)' : '4px solid rgba(0,0,0,0.8)',
          boxShadow: isDark
            ? '0 0 40px rgba(124, 58, 237, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.2)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.3), inset 0 0 0 2px rgba(0,0,0,0.1)',
        }}
      >
        <Image
          src="/assets/images/avatar.jpg"
          alt="Phuc Anh"
          fill
          className="object-cover transform group-hover:scale-110 transition-transform duration-700"
          priority
        />
      </div>

      <style jsx global>{`
        @keyframes pulse-halo {
          0%, 100% { transform: scale(1.0); opacity: ${isDark ? 0.7 : 0.8}; }
          50% { transform: scale(1.1); opacity: ${isDark ? 0.9 : 0.7}; }
        }
      `}</style>
    </div>
  );
}
