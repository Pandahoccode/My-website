"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Configuration
    const waves = [
      { color: "rgba(0, 210, 255, 0.15)", speed: 0.002, amplitude: 100, frequency: 0.005, yOffset: 0 },
      { color: "rgba(157, 80, 187, 0.15)", speed: 0.003, amplitude: 150, frequency: 0.004, yOffset: 50 },
      { color: "rgba(3, 7, 18, 0.8)", speed: 0.001, amplitude: 50, frequency: 0.002, yOffset: -50 } // Masking wave
    ];

    let time = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time++;

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, height / 2 + wave.yOffset);

        for (let x = 0; x < width; x++) {
          const y = height / 2 + wave.yOffset +
            Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
            Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 0.5) * (wave.amplitude * 0.5); // Complex sine

          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}
