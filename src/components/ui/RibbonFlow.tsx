"use client";

import { useEffect, useRef } from "react";

export function RibbonFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let time = 0;

    // Configuration
    const ribbonCount = 20;
    const speed = 0.005;

    // Ribbon Particle Class
    class Ribbon {
      x: number;
      y: number;
      angle: number;
      speed: number;
      color: string;
      thickness: number;
      offset: number;

      constructor(h: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.5 + 0.2;
        // Alternate between Electric Blue and Cyber Purple
        this.color = Math.random() > 0.5
          ? "rgba(0, 210, 255, 0.08)" // #00D2FF
          : "rgba(157, 80, 187, 0.08)"; // #9D50BB
        this.thickness = Math.random() * 20 + 10;
        this.offset = Math.random() * 100;
      }

      update(t: number) {
        // Flow field logic (sine superpositions)
        const angleNoise =
          Math.sin(this.x * 0.002 + t * 0.5) +
          Math.cos(this.y * 0.002 + t * 0.5) +
          Math.sin(t * 0.2);

        this.angle = angleNoise;

        this.x += Math.cos(this.angle) * this.speed * 2;
        this.y += Math.sin(this.angle) * this.speed * 2;

        // Wrap around
        if (this.x < -100) this.x = width + 100;
        if (this.x > width + 100) this.x = -100;
        if (this.y < -100) this.y = height + 100;
        if (this.y > height + 100) this.y = -100;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.thickness, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        // Blur effect for "light" feel
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      }
    }

    // Initialize Ribbons
    const ribbons: Ribbon[] = [];
    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      ribbons.length = 0;
      for (let i = 0; i < ribbonCount; i++) {
        ribbons.push(new Ribbon(height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      // Fade effect for trails?
      // ctx.fillStyle = 'rgba(3, 7, 18, 0.1)';
      // ctx.fillRect(0,0,width,height);

      time += 0.01;

      // Draw connections or fluid paths?
      // For "Silk", we draw continuous paths.
      // Let's modify: Draw bezier curves based on points

      ribbons.forEach(r => {
        r.update(time);
        r.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", init);
    init();
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 mix-blend-screen"
    />
  );
}
