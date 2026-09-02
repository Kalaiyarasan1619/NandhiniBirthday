import React, { useEffect, useRef } from 'react';

interface HeartParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
}

export const FloatingHeartsCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: HeartParticle[] = [];
    const colors = ['#ff3366', '#ff6699', '#ff33cc', '#ff99cc', '#ff66b2', '#ff0066', '#f61f1f'];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const createHeart = (x: number, y: number) => {
      const size = Math.random() * 14 + 14;
      particles.push({
        x,
        y,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: -(Math.random() * 1.5 + 1),
        speedX: (Math.random() - 0.5) * 1.2,
        opacity: 0.9,
        rotation: (Math.random() - 0.5) * 0.4,
      });
    };

    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const distance = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (distance > 12) {
        createHeart(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 8; i++) {
        createHeart(e.clientX + (Math.random() - 0.5) * 20, e.clientY + (Math.random() - 0.5) * 20);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const drawHeartShape = (context: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      context.save();
      context.translate(x, y);
      context.beginPath();
      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      context.bezierCurveTo(
        0, 0,
        -size / 2, 0,
        -size / 2, topCurveHeight
      );
      context.bezierCurveTo(
        -size / 2, (size + topCurveHeight) / 2,
        0, size,
        0, size
      );
      context.bezierCurveTo(
        0, size,
        size / 2, (size + topCurveHeight) / 2,
        size / 2, topCurveHeight
      );
      context.bezierCurveTo(
        size / 2, 0,
        0, 0,
        0, topCurveHeight
      );
      context.closePath();
      context.fill();
      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity -= 0.015;

        if (p.opacity <= 0) {
          particles.splice(index, 1);
        } else {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          drawHeartShape(ctx, p.x, p.y, p.size);
        }
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
};
