import useDarkSide from '../utils/useDarkSide';

export default function ThemeSwitcher() {
  const [colorTheme, setTheme] = useDarkSide();

  const toggleDarkMode = () => {
    setTheme(colorTheme);
  };

  return <button onClick={toggleDarkMode}>Click</button>;
}
