import { ReactNode, useEffect, useRef, useState } from 'react';
import './move-window.scss';

let lastMove: { x: number, y: number } | null = null;

function alignWidth(div: HTMLDivElement, num: number) {
  const videoWidth = div.getBoundingClientRect().width;

  return Math.min(window.innerWidth - 30 - videoWidth, Math.max(0, num))
}

function alignHeight(div: HTMLDivElement, num: number) {
  const videoHeight = div.getBoundingClientRect().height;

  const maxTop = window.innerHeight - videoHeight - 90

  return Math.min(Math.max(-maxTop, num), 70);
}

export function MoveWindow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>();

  const [position, setPosition] = useState({ "x": 0, "y": 0 });

  function start(x: number, y: number) {
    lastMove = { x, y };
  }

  function move(x: number, y: number) {    
    if (lastMove) {
      const tmp = lastMove;

      setPosition((pos) => ({
        x: alignWidth(ref.current, pos.x + x - tmp.x),
        y: alignHeight(ref.current, pos.y + y - tmp.y),
      }));
      
      lastMove = { x, y };
    }
  }

  function end() {
    lastMove = null;
  }

  useEffect(() => {
    function align() {
      lastMove = { ...position };
      move(position.x, position.y);
      lastMove = null;
    }

    window.addEventListener('resize', align);

    align();

    return () => window.removeEventListener('resize', align);
  }, []);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      move(e.clientX, e.clientY)
    }

    function onTouchMove(e: TouchEvent) {
      move(e.touches[0].clientX, e.touches[0].clientY);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', end);
    document.addEventListener('mouseup', end);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', end);
      document.removeEventListener('mouseup', end);
    }
  }, []);

  return (
    <div
      ref={ref}
      className='bg-base-300 move-window rounded'
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseDown={(e) => {
        start(e.clientX, e.clientY);
      }}
      onTouchStart={(e) => {
        start(e.touches[0].clientX, e.touches[0].clientY);
      }}
    >
      {children}
    </div>
  )
}