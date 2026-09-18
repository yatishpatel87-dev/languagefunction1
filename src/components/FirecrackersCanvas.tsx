import React, { useEffect, useRef } from 'react';
import { sounds } from '../utils/audio';

interface FirecrackersCanvasProps {
  active?: boolean;
  onExplosionSound?: boolean;
  intensity?: 'high' | 'normal';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
  flicker: boolean;
}

interface Rocket {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetY: number;
  color: string;
  trail: { x: number; y: number }[];
}

const FIREWORK_COLORS = [
  '#FFD700', // Gold
  '#FF4500', // Orange Red
  '#00E5FF', // Bright Cyan
  '#00FF7F', // Spring Green
  '#FF1493', // Deep Pink
  '#9D00FF', // Vivid Violet
  '#FFCC00', // Amber
  '#FF3366', // Bright Crimson
  '#39FF14', // Neon Green
  '#FFFFFF'  // White Diamond
];

export const FirecrackersCanvas: React.FC<FirecrackersCanvasProps> = ({
  active = true,
  onExplosionSound = true,
  intensity = 'high'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const rockets: Rocket[] = [];
    const particles: Particle[] = [];

    const createExplosion = (x: number, y: number, baseColor?: string) => {
      if (onExplosionSound) {
        sounds.playFirecrackerBurst();
      }

      const particleCount = intensity === 'high' ? 80 : 50;
      const color = baseColor || FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: Math.random() > 0.3 ? color : '#FFFFFF',
          alpha: 1,
          decay: Math.random() * 0.015 + 0.012,
          size: Math.random() * 3 + 1.5,
          flicker: Math.random() > 0.5
        });
      }

      // Secondary glitter ring
      for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: '#FFD700',
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
          size: 1.5,
          flicker: true
        });
      }
    };

    const launchRocket = () => {
      const startX = Math.random() * (width * 0.8) + width * 0.1;
      const targetY = Math.random() * (height * 0.45) + height * 0.1;
      const vy = -(Math.random() * 5 + 11);
      const vx = (Math.random() - 0.5) * 3;
      const color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];

      rockets.push({
        x: startX,
        y: height,
        vx,
        vy,
        targetY,
        color,
        trail: []
      });
    };

    // Auto-launch rockets at intervals
    let lastLaunchTime = Date.now();
    const launchInterval = intensity === 'high' ? 380 : 650;

    // Initial volley of 3 rockets
    setTimeout(() => launchRocket(), 100);
    setTimeout(() => launchRocket(), 300);
    setTimeout(() => launchRocket(), 550);

    const loop = () => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      const now = Date.now();
      if (now - lastLaunchTime > launchInterval) {
        launchRocket();
        if (intensity === 'high' && Math.random() > 0.4) {
          setTimeout(launchRocket, 120);
        }
        lastLaunchTime = now;
      }

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 5) r.trail.shift();

        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.08; // slight gravity

        // Draw trail
        ctx.beginPath();
        for (let j = 0; j < r.trail.length; j++) {
          const pt = r.trail[j];
          ctx.strokeStyle = r.color;
          ctx.lineWidth = 2.5;
          ctx.lineCap = 'round';
          if (j === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // Check if reached apex or target
        if (r.y <= r.targetY || r.vy >= -1) {
          createExplosion(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // gravity
        p.vx *= 0.98; // drag
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.flicker && Math.random() > 0.4 ? p.alpha * 0.4 : p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Glowing center core
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    // Interactive burst on user click/tap
    const handleCanvasClick = (e: MouseEvent) => {
      createExplosion(e.clientX, e.clientY);
    };
    window.addEventListener('click', handleCanvasClick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleCanvasClick);
    };
  }, [active, onExplosionSound, intensity]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
