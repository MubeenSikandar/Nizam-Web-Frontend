"use client";

import { useEffect, useRef, useState } from "react";

const LIGHT = {
  dot: "#d4873a",
  dotAlt: "#bf7530",
  glow: "rgba(212,135,58,0.6)",
  trail: "rgba(212,135,58,0.15)",
};

const DARK = {
  dot: "#4d8ef0",
  dotAlt: "#6ba3f5",
  glow: "rgba(77,142,240,0.6)",
  trail: "rgba(77,142,240,0.15)",
};

// The 4 corner positions (normalized -1 to 1)
const CORNERS = [
  { id: 0, x: -1, y: -1 }, // top-left
  { id: 1, x: 1, y: -1 }, // top-right
  { id: 2, x: -1, y: 1 }, // bottom-left
  { id: 3, x: 1, y: 1 }, // bottom-right
];

// Sequence of position swaps — each frame swaps to a new arrangement
const SEQUENCES = [
  [0, 1, 2, 3], // square
  [1, 3, 0, 2], // cross swap
  [3, 2, 1, 0], // diagonal
  [2, 0, 3, 1], // opposite
  [1, 0, 3, 2], // horizontal flip
  [2, 3, 0, 1], // vertical flip
];

export default function NizamLogo({ size = 64 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    seqIndex: 0,
    progress: 0, // 0 → 1 interpolation between sequences
    speed: 0.018,
    hovered: false,
  });
  const animRef = useRef<number>(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const C = isDark ? DARK : LIGHT;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const spread = size * 0.22; // distance from center to dot
    const dotR = size * 0.075; // dot radius

    // Convert corner index to pixel position
    const toPos = (corner: { x: number; y: number }) => ({
      px: cx + corner.x * spread,
      py: cy + corner.y * spread,
    });

    // Lerp helper
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Ease in-out cubic
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const s = stateRef.current;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      const from = SEQUENCES[s.seqIndex % SEQUENCES.length];
      const to = SEQUENCES[(s.seqIndex + 1) % SEQUENCES.length];
      const t = ease(s.progress);

      // Draw connecting lines faintly
      ctx.strokeStyle = C.trail;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const fromPos = toPos(CORNERS[from[i]]);
        const toPos2 = toPos(CORNERS[to[i]]);
        const px = lerp(fromPos.px, toPos2.px, t);
        const py = lerp(fromPos.py, toPos2.py, t);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      // Draw each dot
      for (let i = 0; i < 4; i++) {
        const fromPos = toPos(CORNERS[from[i]]);
        const toPos2 = toPos(CORNERS[to[i]]);
        const px = lerp(fromPos.px, toPos2.px, t);
        const py = lerp(fromPos.py, toPos2.py, t);

        // Glow
        const glow = ctx.createRadialGradient(px, py, 0, px, py, dotR * 2.8);
        glow.addColorStop(0, C.glow);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, dotR * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // Dot — alternating colors for visual rhythm
        ctx.fillStyle = i % 2 === 0 ? C.dot : C.dotAlt;
        ctx.beginPath();
        ctx.arc(px, py, dotR, 0, Math.PI * 2);
        ctx.fill();

        // Inner highlight
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.beginPath();
        ctx.arc(
          px - dotR * 0.25,
          py - dotR * 0.25,
          dotR * 0.35,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
    };

    const tick = () => {
      const speed = s.hovered ? 0.055 : 0.018;
      s.progress += speed;

      if (s.progress >= 1) {
        s.progress = 0;
        s.seqIndex = (s.seqIndex + 1) % SEQUENCES.length;
      }

      draw();
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [size, isDark]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      onMouseEnter={() => {
        stateRef.current.hovered = true;
      }}
      onMouseLeave={() => {
        stateRef.current.hovered = false;
      }}
      style={{
        width: size,
        height: size,
        display: "inline-block",
        cursor: "pointer",
      }}
    />
  );
}
