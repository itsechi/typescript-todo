import { useState, useEffect, useRef } from 'react';

export function useClickOutside(callback?: () => void) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | HTMLFormElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsVisible(false);
        if (callback) callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);

  return { ref, isVisible, setIsVisible };
}
