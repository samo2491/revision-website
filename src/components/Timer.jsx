import { useEffect } from 'react';

export default function Timer({ seconds, running, setSeconds }) {
  useEffect(() => {
    if (!running || seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [running, seconds, setSeconds]);

  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return <div className="timer">⏱ {m}:{s}</div>;
}
