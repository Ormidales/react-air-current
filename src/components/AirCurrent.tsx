import React, { useEffect, useRef, useMemo, useCallback } from 'react';

const perlinNoise = (x: number, y: number, t: number) => {
  return Math.sin(x * 0.01 + t * 0.002) * Math.cos(y * 0.01 + t * 0.002);
};

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  baseAngle: number;
  oscillation: number;
  color: string;
  alpha: number;
}

interface AirCurrentProps {
  flowSpeed: number;
  particleDensity: number;
  flowDirection: number;
  turbulence: number;
  width?: number;
  height?: number;
}

export const AirCurrent: React.FC<AirCurrentProps> = ({
  flowSpeed,
  particleDensity,
  flowDirection,
  turbulence,
  width = 1200,
  height = 600,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  const particles: Particle[] = useMemo(() => {
    const totalParticles = Math.floor(
      (width * height * particleDensity) / 5000
    );
    return Array.from({ length: totalParticles }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1.5 + Math.random() * 2,
      speed: flowSpeed * (0.8 + Math.random() * 0.4),
      baseAngle: (flowDirection * Math.PI) / 180 + (Math.random() - 0.5) * 0.3,
      oscillation: (Math.random() - 0.5) * 0.1,
      color: `rgba(${180 + Math.random() * 75}, ${120 + Math.random() * 75}, ${200 + Math.random() * 75
        }, 1)`,
      alpha: 0.4 + Math.random() * 0.5,
    }));
  }, [width, height, particleDensity, flowSpeed, flowDirection]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    timeRef.current += 1;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);

    particles.forEach((particle) => {
      const noiseFactor = perlinNoise(particle.x, particle.y, timeRef.current);
      const finalAngle =
        particle.baseAngle + noiseFactor * turbulence + particle.oscillation;

      particle.x += Math.cos(finalAngle) * particle.speed;
      particle.y += Math.sin(finalAngle) * particle.speed;

      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      ctx.beginPath();
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.alpha;
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [particles, width, height, turbulence]);

  useEffect(() => {
    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};
