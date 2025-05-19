import { useEffect, useState } from "react";
import { throttle } from "throttle-debounce";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1350);

  useEffect(() => {
    const onChange = throttle(100, () => {
      setIsMobile(window.innerWidth < 1350)
    });

    window.addEventListener('resize', onChange);

    return () => {
      window.removeEventListener('resize', onChange);
    }
  }, []);

  return isMobile;
}