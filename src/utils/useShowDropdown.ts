import { useState, useEffect, useRef } from 'react';

export default function useShowDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef<HTMLInputElement>();

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setShowDropdown(!showDropdown);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, !showDropdown);

    return () => {
      document.removeEventListener('click', handleClickOutside, !showDropdown);
    };
  });

  return { ref, showDropdown, setShowDropdown };
}
