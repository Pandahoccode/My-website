"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, useSpring, useMotionValue, useMotionTemplate, useTransform } from "framer-motion";

export function AvatarEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark' || theme === 'system';

  // Mouse position percentages (50% is center)
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  // Distance factor for extension size
  const distVal = useMotionValue(0);

  // Smooth out the movement
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const smoothDist = useSpring(distVal, { stiffness: 40, damping: 20 });

  // Calculate dynamic gradient size based on distance
  // Base size + extension.
  // Dark mode: Base 70% -> up to 150%
  // Light mode: Base 80% -> up to 160%
  const sizeDark = useTransform(smoothDist, [0, 1], ["70%", "140%"]);
  const sizeLight = useTransform(smoothDist, [0, 1], ["80%", "150%"]);

  // Dynamic gradient template
  // We use the dynamic size for the transparent stop
  const darkGradient = useMotionTemplate`radial-gradient(
    circle at ${smoothX}% ${smoothY}%,
    #06b6d4 0%,
    #7c3aed 45%,
    transparent ${sizeDark}
  )`;

  const lightGradient = useMotionTemplate`radial-gradient(
    circle at ${smoothX}% ${smoothY}%,
    #e0f2fe 0%,
    #7dd3fc 45%,
    transparent ${sizeLight}
  )`;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;

      // Calculate normalized distance (0 to ~1.0+)
      // Reference distance is roughly visible window half-width (e.g. 500px)
      const currentDist = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
      const normalizedDist = Math.min(Math.max(currentDist / 600, 0), 2); // Cap at 2x

      distVal.set(normalizedDist);

      // Map offset to percentage shift
      // Increased multiplier from 40 to 80 to allow center to move further away
      const percentX = 50 + (offsetX / (rect.width / 2)) * 80;
      const percentY = 50 + (offsetY / (rect.height / 2)) * 80;

      mouseX.set(percentX);
      mouseY.set(percentY);
    };

    const handleMouseLeave = () => {
      // Return to center
      mouseX.set(50);
      mouseY.set(50);
      distVal.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, distVal]);

  return (
    <div
      ref={containerRef}
      className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group z-0"
    >
      {/* SVG Filter for Gooey Effect */}
      <svg className="hidden">
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
          <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" />
        </filter>
      </svg>

      {/* Fluid Aura Layer */}
      <motion.div
        className="absolute inset-[-40px] rounded-full pointer-events-none z-0"
        style={{
          background: isDark ? darkGradient : lightGradient,
          filter: isDark ? 'blur(40px) url(#gooey)' : 'blur(60px) url(#gooey)',
          opacity: isDark ? 0.6 : 1.0,
          mixBlendMode: isDark ? 'screen' : 'color-dodge',
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
    </div>
  );
}
