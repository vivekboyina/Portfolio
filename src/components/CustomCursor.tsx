import React, { useEffect, useRef, useState } from 'react';

export interface CustomCursorProps {
  theme?: 'dark' | 'light';
}

interface BoxParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxLife: number;
  life: number;
  shape: 'square' | 'diamond';
  rotation: number;
  rotationSpeed: number;
  baseAlpha: number;
  filled: boolean;
}

/**
 * CustomCursor: Renders a simple point cursor (white in dark mode, black in light mode)
 * with a subtle trailing geometric monochrome boxes effect.
 */
export const CustomCursor: React.FC<CustomCursorProps> = ({ theme = 'dark' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const lastParticlePos = useRef({ x: -100, y: -100 });
  const particles = useRef<BoxParticle[]>([]);
  const boxCounter = useRef(0);
  const currentTheme = useRef(theme);

  useEffect(() => {
    currentTheme.current = theme;
    if (dotRef.current) {
      dotRef.current.style.backgroundColor = theme === 'light' ? '#000000' : '#ffffff';
      dotRef.current.style.boxShadow =
        theme === 'light' ? '0 0 6px rgba(0,0,0,0.5)' : '0 0 8px rgba(255,255,255,0.8)';
    }
  }, [theme]);

  useEffect(() => {
    // Check if device supports fine pointer (mouse/trackpad) and prefers normal motion
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }

    document.documentElement.classList.add('custom-cursor-enabled');

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high-DPI canvas resolution
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    const spawnBox = (x: number, y: number, dx = 0, dy = 0) => {
      const shape: 'square' | 'diamond' = boxCounter.current % 2 === 0 ? 'square' : 'diamond';
      const filled = boxCounter.current % 3 === 0;
      boxCounter.current += 1;

      const size = 4 + Math.random() * 3.5;
      const maxLife = 40 + Math.floor(Math.random() * 14);

      particles.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.2 + dx * 0.015,
        vy: (Math.random() - 0.5) * 0.2 + dy * 0.015,
        size,
        maxLife,
        life: maxLife,
        shape,
        rotation: shape === 'diamond' ? Math.PI / 4 : (Math.random() - 0.5) * 0.2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        baseAlpha: currentTheme.current === 'light' ? 0.22 : 0.28,
        filled,
      });

      if (particles.current.length > 55) {
        particles.current.shift();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      mousePos.current.x = x;
      mousePos.current.y = y;

      if (!isVisible) {
        setIsVisible(true);
      }

      // Directly update the simple point position for 0ms latency tracking
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }

      if (lastParticlePos.current.x === -100) {
        lastParticlePos.current.x = x;
        lastParticlePos.current.y = y;
        return;
      }

      const dx = x - lastParticlePos.current.x;
      const dy = y - lastParticlePos.current.y;
      const dist = Math.hypot(dx, dy);

      if (dist >= 14) {
        const steps = Math.min(Math.floor(dist / 14), 4);
        for (let i = 1; i <= steps; i++) {
          const interpX = lastParticlePos.current.x + (dx * i) / steps;
          const interpY = lastParticlePos.current.y + (dy * i) / steps;
          spawnBox(interpX, interpY, dx, dy);
        }
        lastParticlePos.current.x = x;
        lastParticlePos.current.y = y;
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop for Trailing Boxes
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const isLight = currentTheme.current === 'light';
      const rgb = isLight ? '0, 0, 0' : '255, 255, 255';

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.life -= 1;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        if (p.life <= 0) {
          particles.current.splice(i, 1);
          continue;
        }

        const progress = p.life / p.maxLife;
        const alpha = Math.max(0, p.baseAlpha * (progress * progress));

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const s = p.size;

        ctx.strokeStyle = `rgba(${rgb}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(-s / 2, -s / 2, s, s);

        if (p.filled) {
          ctx.fillStyle = `rgba(${rgb}, ${alpha * 0.35})`;
          ctx.fillRect(-s / 2, -s / 2, s, s);
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      document.documentElement.classList.remove('custom-cursor-enabled');
    };
  }, []);

  if (isTouchDevice) {
    return null;
  }

  const isLight = theme === 'light';

  return (
    <>
      {/* Canvas for Trailing Monochrome Boxes */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9998]"
      />

      {/* Simple Point Cursor: White in Dark mode, Black in Light mode */}
      <div
        id="cursor-dot"
        ref={dotRef}
        aria-hidden="true"
        style={{
          backgroundColor: isLight ? '#000000' : '#ffffff',
          boxShadow: isLight ? '0 0 6px rgba(0,0,0,0.45)' : '0 0 8px rgba(255,255,255,0.8)',
        }}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full transition-opacity duration-150 will-change-transform ${
          !isVisible ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </>
  );
};

export default CustomCursor;
