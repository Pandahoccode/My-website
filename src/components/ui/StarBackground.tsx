"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

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
}

export function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme(); // Use next-themes to detect mode
  const widthRef = useRef(0);
  const heightRef = useRef(0);

  // Determine if we are in dark mode (defaulting to dark if undefined during server render, but mounted check handles that)
  const isDark = mounted && (theme === 'dark' || theme === 'system');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let stars: Star[] = [];
    let meteors: Meteor[] = [];

    // Configuration based on theme
    // Dark: Deep cosmic blue/black base. Light: Soft light blue/white.
    // However, the canvas is z-[-1], so it sits BEHIND the layout.
    // The layout has transparent backgrounds, but globals.css defines --background.
    // We should clear the canvas with the base color or let CSS handle the background color
    // and just draw stars on top.
    // The prompt says: "Ensure the Deep Cosmic Gradient... serves as the base color... beneath the stars".
    // So we will fillRect the canvas.

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
          pulseSpeed: 0.02 + Math.random() * 0.03
        });
      }

      // ** INSTANT COMET SPAWN ON LIGHT MODE **
      // If we just switched to light mode (or initialized in light mode), spawn a majestic comet immediately.
      if (!isDark) {
        meteors.push({
          x: widthRef.current * 0.8, // Start near top right
          y: -100,
          length: 300,
          speed: 4,
          opacity: 1
        });
      }
    };

    const draw = () => {
      // 1. Clear / Fill Background
      if (isDark) {
        ctx.fillStyle = "#030014"; // Deep Cosmic Base
        ctx.fillRect(0, 0, widthRef.current, heightRef.current);
      } else {
        // Light Mode: Soft Light Blue Wash
        const gradient = ctx.createLinearGradient(0, 0, widthRef.current, heightRef.current);
        gradient.addColorStop(0, "#f8fafc"); // Slate-50
        gradient.addColorStop(1, "#e0f2fe"); // Sky-100
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, widthRef.current, heightRef.current);
      }

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
          // Dark Mode: Bright White/Cyan stars
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = "rgba(0, 210, 255, 0.8)";
        } else {
          // Light Mode: Subtle Dust (Dark Slate)
          ctx.fillStyle = `rgba(30, 41, 59, ${Math.abs(star.alpha) * 0.3})`; // Low opacity slate
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      });

      // 3. Draw Meteors (Dark Mode Only usually, or very subtle in light)
      if (isDark) {
        // Spawn Meteor randomly
        if (Math.random() < 0.02) { // 2% chance per frame
          meteors.push({
            x: Math.random() * widthRef.current + 200, // Bias to right to streak left
            y: -100,
            length: 50 + Math.random() * 100,
            speed: 5 + Math.random() * 10,
            opacity: 1
          });
        }

        // Update & Draw Meteors
        meteors.forEach((meteor, index) => {
          meteor.x -= meteor.speed;
          meteor.y += meteor.speed; // -45 degrees (down-left)
          meteor.opacity -= 0.02;

          if (meteor.opacity <= 0) {
            meteors.splice(index, 1);
            return;
          }

          const gradient = ctx.createLinearGradient(meteor.x, meteor.y, meteor.x + meteor.length, meteor.y - meteor.length);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${meteor.opacity})`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.moveTo(meteor.x, meteor.y);
          ctx.lineTo(meteor.x + meteor.length, meteor.y - meteor.length);
          ctx.stroke();
        });
      }

      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", init);
    init();
    draw();

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationId);
    };
  }, [mounted, theme, isDark]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: -1,
      }}
      aria-hidden="true"
    />
  );
}
