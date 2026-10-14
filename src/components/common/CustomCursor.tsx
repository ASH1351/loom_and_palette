import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const clickable = target?.closest('a, button, input, [role="button"], .cursor-pointer, .glass-panel');
      setIsHovering(!!clickable);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Small Gold Dot Pointer */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-50 w-2 h-2 rounded-full bg-[#C9A96E] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />

      {/* Expanding Luxury Gold Ring */}
      <div
        className={`pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-[#C9A96E]/70 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
          isHovering
            ? 'w-10 h-10 bg-[#C9A96E]/15 scale-110 border-[#C9A96E]'
            : 'w-6 h-6 scale-100'
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </>
  );
};
