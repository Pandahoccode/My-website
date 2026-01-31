"use client";

import { useEffect, useRef, useState } from "react";

export function RibbonFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  // Need to mount first, then check for canvas
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let time = 0;

    // Simple visible waves configuration
    const waves = [
      {
        color: "rgba(0, 210, 255, 0.35)", // Electric Blue - HIGH opacity
        speed: 0.02,
        yOffset: 0,
        amplitude: 80,
        frequency: 0.003
      },
      {
        color: "rgba(157, 80, 187, 0.30)", // Cyber Purple
        speed: 0.015,
        yOffset: 100,
        amplitude: 100,
        frequency: 0.002
      },
      {
        color: "rgba(0, 210, 255, 0.25)", // Electric Blue lighter
        speed: 0.01,
        yOffset: -100,
        amplitude: 60,
        frequency: 0.004
      }
    ];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      time += 1;

      // Draw each wave
      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        // Draw wave path
        for (let x = 0; x <= width; x += 5) {
          const y = height / 2 + wave.yOffset +
            Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
            Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 1.5) * (wave.amplitude * 0.5);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        // Fill with gradient
        const gradient = ctx.createLinearGradient(0, height / 2 - 200, 0, height);
        gradient.addColorStop(0, wave.color);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [mounted]);

  // Always render the canvas - CSS handles initial state
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: mounted ? 1 : 0 }}
      aria-hidden="true"
    />
  );
}
