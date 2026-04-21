import React, { useEffect, useRef, useState } from 'react';

interface Car {
  x: number;
  y: number;
  angle: number;
  speed: number;
  acceleration: number;
  friction: number;
  maxSpeed: number;
  steer: number;
}

export default function Simulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [car, setCar] = useState<Car>({
    x: 400,
    y: 500,
    angle: -Math.PI / 2,
    speed: 0,
    acceleration: 0.2,
    friction: 0.05,
    maxSpeed: 5,
    steer: 0.04,
  });

  const keys = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const update = () => {
      setCar((prev) => {
        let { x, y, angle, speed, acceleration, friction, maxSpeed, steer } = prev;

        if (keys.current['ArrowUp'] || keys.current['w']) speed += acceleration;
        if (keys.current['ArrowDown'] || keys.current['s']) speed -= acceleration;

        if (speed > maxSpeed) speed = maxSpeed;
        if (speed < -maxSpeed / 2) speed = -maxSpeed / 2;

        if (speed > 0) speed -= friction;
        if (speed < 0) speed += friction;
        if (Math.abs(speed) < friction) speed = 0;

        if (speed !== 0) {
          const flip = speed > 0 ? 1 : -1;
          if (keys.current['ArrowLeft'] || keys.current['a']) angle -= steer * flip;
          if (keys.current['ArrowRight'] || keys.current['d']) angle += steer * flip;
        }

        x += Math.cos(angle) * speed;
        y += Math.sin(angle) * speed;

        // Boundary check (Stay on the road area roughly)
        if (y < 320) y = 320;
        if (y > 580) y = 580;
        if (x < 50) x = 50;
        if (x > 750) x = 750;

        return { ...prev, x, y, angle, speed };
      });

      draw();
      animationFrameId = requestAnimationFrame(update);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Road/Background
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw Skyline Silhouette
      ctx.fillStyle = '#0a0a0c'; // Theme BG
      // Prudential Center
      ctx.fillRect(150, 100, 40, 200);
      ctx.fillRect(140, 120, 60, 180);
      // Hancock Tower
      ctx.fillRect(250, 50, 45, 250);
      // Other buildings
      ctx.fillRect(350, 150, 30, 150);
      ctx.fillRect(450, 120, 50, 180);
      ctx.fillRect(550, 180, 40, 120);
      ctx.fillRect(650, 140, 35, 160);

      // Draw Ground
      ctx.fillStyle = '#151518'; // Theme Panel
      ctx.fillRect(0, 300, canvas.width, 300);

      // Draw Road
      ctx.fillStyle = '#111111';
      ctx.beginPath();
      ctx.moveTo(0, 600);
      ctx.lineTo(350, 300);
      ctx.lineTo(450, 300);
      ctx.lineTo(800, 600);
      ctx.fill();

      // Road lines
      ctx.strokeStyle = '#3a86ff'; // Theme Accent
      ctx.setLineDash([20, 20]);
      ctx.beginPath();
      ctx.moveTo(400, 600);
      ctx.lineTo(400, 300);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Car
      ctx.save();
      ctx.translate(car.x, car.y);
      ctx.rotate(car.angle);
      
      // Car body
      ctx.fillStyle = '#3a86ff'; // Theme Accent
      ctx.fillRect(-20, -10, 40, 20);
      
      // Windows
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.8;
      ctx.fillRect(5, -8, 10, 16);
      ctx.globalAlpha = 1.0;
      
      // Headlights
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ffffff';
      ctx.fillRect(18, -8, 4, 4);
      ctx.fillRect(18, 4, 4, 4);
      ctx.shadowBlur = 0;

      ctx.restore();

      // UI Info
      ctx.fillStyle = '#8E9299'; // Theme Text Secondary
      ctx.font = '10px JetBrains Mono';
      ctx.fillText(`SPEED: ${Math.abs(car.speed * 20).toFixed(0)} MPH`, 20, 30);
      ctx.fillText(`STATUS: NOMINAL`, 20, 45);
    };

    update();

    return () => cancelAnimationFrame(animationFrameId);
  }, [car]);

  return (
    <div className="relative w-full h-full bg-zinc-900 flex items-center justify-center overflow-hidden rounded-xl border border-zinc-800 shadow-2xl">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="max-w-full max-h-full object-contain"
      />
      <div className="absolute bottom-4 left-4 text-zinc-400 text-xs font-mono bg-black/50 p-2 rounded backdrop-blur-sm">
        WASD / Arrows to Drive
      </div>
    </div>
  );
}
