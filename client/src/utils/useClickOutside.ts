import { useState, useEffect, useRef } from 'react';

export function useClickOutside() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return { ref, isVisible, setIsVisible };
}
