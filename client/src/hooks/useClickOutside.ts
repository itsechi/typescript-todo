import { useState, useEffect, useRef } from 'react';

export function useClickOutside(callback?: () => void, input?: string) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | HTMLFormElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (!callback) return setIsVisible(false);
        else {
          if (input !== undefined && input.length === 0) {
            return;
          } else {
            callback();
            setIsVisible(false);
          }
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, input]);

  return { ref, isVisible, setIsVisible };
}
