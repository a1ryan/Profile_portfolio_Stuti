import { useEffect, useRef } from 'react';

const PARTICLE_COLORS = ['#e040fb', '#ffffff', '#b44fff', '#ff80ff', '#f9a8d4'];

const CursorEffect = () => {
  const lastSpawn = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const spawnParticles = (x, y) => {
      const dx = x - lastSpawn.current.x;
      const dy = y - lastSpawn.current.y;
      if (dx * dx + dy * dy < 80) return;
      lastSpawn.current = { x, y };

      const count = 3 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        const p     = document.createElement('div');
        const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
        const size  = 2.4 + Math.random() * 3;
        const ox    = (Math.random() - 0.5) * 18;
        const oy    = (Math.random() - 0.5) * 10;
        const dur   = 600 + Math.random() * 200;

        p.style.cssText = `
          position:fixed;
          left:${x + ox - size / 2}px;
          top:${y + oy - size / 2}px;
          width:${size}px;height:${size}px;
          border-radius:50%;
          background:${color};
          pointer-events:none;
          z-index:99998;
          box-shadow:0 0 ${size * 2.5}px ${color};
          animation:glitter-fade ${dur}ms ease-out forwards;
        `;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), dur + 50);
      }
    };

    const onMouseMove = (e) => spawnParticles(e.clientX, e.clientY);
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <style>{`
      @keyframes glitter-fade {
        0%   { transform:scale(1)   translateY(0);    opacity:1;   }
        60%  { transform:scale(0.5) translateY(7px);  opacity:0.6; }
        100% { transform:scale(0)   translateY(14px); opacity:0;   }
      }
    `}</style>
  );
};

export default CursorEffect;
