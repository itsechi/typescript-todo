import { useState, useEffect, useRef, useCallback } from 'react';

export function useClickOutside(callback?: () => void, input?: string) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | HTMLFormElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      if (!callback) {
        setIsVisible(false);
        return;
      }

      if (input === undefined || input.trim().length > 0) {
        callback();
        setIsVisible(false);
      }
    },
    [callback, input],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return { ref, isVisible, setIsVisible };
}
