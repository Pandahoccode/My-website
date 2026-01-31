"use client";

import { useEffect, useRef, useState } from "react";

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

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
    let width = window.innerWidth;
    let height = window.innerHeight;
    let time = 0;

    const waves = [
      {
        startColor: "rgba(0, 229, 255, 0.35)", // Top Wave - Cyan Focus
        endColor: "rgba(74, 105, 189, 0.15)",
        speed: 0.005,
        yOffset: 0,
        amplitude: 60,
        frequency: 0.003
      },
      {
        startColor: "rgba(74, 105, 189, 0.25)", // Mid Wave - The Blend
        endColor: "rgba(123, 31, 162, 0.10)",
        speed: 0.0075,
        yOffset: 100,
        amplitude: 80,
        frequency: 0.002
      },
      {
        startColor: "rgba(123, 31, 162, 0.20)", // Bot Wave - Purple Focus
        endColor: "rgba(13, 17, 23, 0.05)",
        speed: 0.0025,
        yOffset: -100,
        amplitude: 40,
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
      ctx.clearRect(0, 0, width, height);
      time += 1;

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 5) {
          const y = height / 2 + wave.yOffset +
            Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
            Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 1.5) * (wave.amplitude * 0.5);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        // 135 degree gradient approximation (Top-Left to Bottom-Right)
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, wave.startColor);
        gradient.addColorStop(1, wave.endColor);
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

  // CSS handles initial state to avoid FOUC
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: -1,
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out'
      }}
      aria-hidden="true"
    />
  );
}
