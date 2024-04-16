import { useEffect, useState } from 'react';

export default function useDarkSide() {
  const [theme, setTheme] = useState<'dark' | 'light'>(
    localStorage.theme ? localStorage.theme : 'dark',
  );
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    // save theme to local storage
    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme] as const;
}
