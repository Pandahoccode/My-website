"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useThemeDark } from '@/hooks/useThemeDark';

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  pulseSpeed: number;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  colorType: number; // 0 for Cyan, 1 for Purple
}

export function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark, mounted } = useThemeDark();
  const widthRef = useRef(0);
  const heightRef = useRef(0);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];

    const init = () => {
      widthRef.current = window.innerWidth;
      heightRef.current = window.innerHeight;
      canvas.width = widthRef.current;
      canvas.height = heightRef.current;

      // Generate Stars
      const starCount = Math.floor((widthRef.current * heightRef.current) / 3000);
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * widthRef.current,
          y: Math.random() * heightRef.current,
          radius: Math.random() * 1.5,
          alpha: Math.random(),
          pulseSpeed: 0.01 + Math.random() * 0.009
        });
      }
    };

    const draw = () => {
      // Clear Canvas (Transparent) - Background is handled by CSS below
      ctx.clearRect(0, 0, widthRef.current, heightRef.current);

      // 2. Draw Stars
      stars.forEach((star) => {
        // Pulse logic
        star.alpha += star.pulseSpeed;
        if (star.alpha > 1 || star.alpha < 0.2) {
          star.pulseSpeed = -star.pulseSpeed;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

        if (isDark) {
          // Dark Mode: Bright White/Cyan stars - HIGHER OPACITY "Lighter"
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, Math.abs(star.alpha) + 0.2)})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = "rgba(0, 210, 255, 0.8)";
        } else {
          // Light Mode: Subtle Dust (Dark Slate)
          ctx.fillStyle = `rgba(30, 41, 59, ${Math.abs(star.alpha) * 1.0})`; // Full opacity factor
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      });

      // 3. Draw Meteors (Dark Mode Only usually, or very subtle in light)
      if (isDark) {
        // Spawn Meteor randomly
        if (Math.random() < 0.005) { // 5% chance per frame
          meteors.push({
            x: Math.random() * widthRef.current + 200, // Bias to right to streak left
            y: -100,
            length: 200 + Math.random() * 250, // BIGGER
            speed: 2 + Math.random() * 1.75,      // SLOWER
            opacity: 1,
            colorType: 0 // Dark mode uses white anyway
          });
        }

      } else { // Light mode
        if (Math.random() < 0.005) { // Lower chance in light mode
          meteors.push({
            x: Math.random() * widthRef.current + 150,
            y: -100,
            length: 200 + Math.random() * 300, // BIGGER
            speed: 2 + Math.random() * 1,      // SLOWER
            opacity: 0.65,
            colorType: Math.random() > 0.5 ? 0 : 1 // Randomly assign Cyan or Purple
          });
        }
      }


      // Update & Draw Meteors
      meteors.forEach((meteor, index) => {
        meteor.x -= meteor.speed;
        meteor.y += meteor.speed; // -45 degrees (down-left)
        meteor.opacity -= 0.001;

        if (meteor.opacity <= 0) {
          meteors.splice(index, 1);
          return;
        }

        const gradient = ctx.createLinearGradient(meteor.x, meteor.y, meteor.x + meteor.length, meteor.y - meteor.length);

        if (isDark) {
          gradient.addColorStop(0, `rgba(255, 255, 255, ${meteor.opacity})`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.lineWidth = 4; // BIGGER width (2->4)
        } else {
          // Light Mode: Gradient Trails
          // Type 0: Blue (Head) -> Purple (Tail)
          // Type 1: Purple (Head) -> Blue (Tail)
          const cyan = "8, 145, 178";   // Cyan-600
          const purple = "147, 51, 234"; // Purple-600

          const colorHead = meteor.colorType === 0 ? cyan : purple;
          const colorTail = meteor.colorType === 0 ? purple : cyan;

          gradient.addColorStop(0, `rgba(${colorHead}, ${meteor.opacity})`);
          gradient.addColorStop(1, `rgba(${colorTail}, 0)`);
          ctx.lineWidth = 6; // Thicker
        }

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x + meteor.length, meteor.y - meteor.length);
        ctx.stroke();
      });

      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", init);
    init();
    draw();

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationId);
    };
  }, [mounted, isDark]);

  if (!mounted) return null;

  return (
    <>
      {/* 1. Base Background Layer (CSS) */}
      <div
        className="fixed inset-0 w-full h-full -z-[5] pointer-events-none transition-colors duration-1000"
        style={{
          background: isDark ? '#030014' : 'linear-gradient(to bottom, #f8fafc, #e0f2fe)'
        }}
      />

      {/* 2. Nebula Injection (5+ scattered clouds) - Visible mostly in Dark Mode */}
      {isDark && (
        <div className="fixed inset-0 w-full h-full -z-[4] pointer-events-none overflow-hidden">
          {/* Top Left - Indigo */}
          <motion.div
            animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px] bg-indigo-900/40 mix-blend-screen"
          />
          {/* Bottom Right - Purple */}
          <motion.div
            animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.2, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-[140px] bg-purple-900/30 mix-blend-screen"
          />
          {/* Center Right - Cyan */}
          <motion.div
            animate={{ opacity: [0.1, 0.2, 0.1], x: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[30%] right-[5%] w-[40vw] h-[40vw] rounded-full blur-[100px] bg-cyan-900/30 mix-blend-screen"
          />
          {/* Center Left - Deep Blue */}
          <motion.div
            animate={{ opacity: [0.1, 0.2, 0.1], x: [0, -30, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute top-[40%] left-[5%] w-[45vw] h-[45vw] rounded-full blur-[110px] bg-blue-900/30 mix-blend-screen"
          />
          {/* Dynamic Floater - Magenta */}
          <motion.div
            animate={{ opacity: [0.05, 0.15, 0.05], y: [0, -100, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            className="absolute bottom-[10%] left-[30%] w-[35vw] h-[35vw] rounded-full blur-[90px] bg-fuchsia-900/20 mix-blend-screen"
          />
        </div>
      )}

      {/* 3. Canvas (Stars & Meteors) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{
          zIndex: -1,
        }}
        aria-hidden="true"
      />
    </>
  );
}
