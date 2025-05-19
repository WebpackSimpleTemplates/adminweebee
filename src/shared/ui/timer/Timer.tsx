import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

let listeners: (() => void)[] = [];

setInterval(() => listeners.forEach((listener) => listener()), 1000);

type TimerProps = {
  milliseconds: number,
  run?: boolean,
  className?: (time: Dayjs) => string | null,
  format?: string | ((time: Dayjs) => string),
}

export function Timer({ milliseconds, run, className, format = 'mm:ss' }: TimerProps) {
  const [time, setTime] = useState(dayjs(Math.max(milliseconds, 0)));

  useEffect(() => {
    setTime(dayjs(Math.max(milliseconds, 0)));

    if (!run) {
      return;
    }

    const listener = () => {
      setTime((time) => time.add(1, 'second'))
    };

    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    }
  }, [milliseconds, run]);

  const formatStr = typeof format === 'function' ? format(time.add(-new Date(0).getHours())) : format;
  
  const timeStr = time.add(-new Date(0).getHours(), 'hours').format(formatStr);

  if (className) {
    return (
      <span className={className(time) || ''}>
        {timeStr}
      </span>
    );
  }

  return <>{timeStr}</>;
}
