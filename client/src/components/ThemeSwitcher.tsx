import useDarkSide from '../hooks/useDarkSide';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

export default function ThemeSwitcher() {
  const [colorTheme, setTheme] = useDarkSide();

  const toggleDarkMode = () => {
    setTheme(colorTheme);
  };

  return (
    <button onClick={toggleDarkMode} aria-label="Change theme">
      {colorTheme === 'light' ? (
        <SunIcon className="h-6 w-6" />
      ) : (
        <MoonIcon className="h-6 w-6" />
      )}
    </button>
  );
}
