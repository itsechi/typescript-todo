interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styling: string;
}

export const Button = ({ children, styling, type, onClick }: ButtonProps) => {
  const variants = {
    default: 'font-semibold px-4 py-2 text-sm',
    primary: 'rounded-lg bg-primary text-white hover:bg-hover-primary',
    secondary:
      'rounded-lg border bg-white hover:bg-hover dark:border-[#2d2d2f] dark:bg-night-nav dark:text-night-gray-text dark:hover:bg-[#2d2d2f]',
    tertiary:
      'mt-4 flex items-center gap-2 rounded-md border bg-white py-3 hover:bg-hover dark:border-night-border dark:bg-night-nav dark:text-night-gray-text dark:hover:bg-night-hover',
    ghost:
      'flex items-center gap-2 rounded-md hover:bg-hover dark:hover:bg-night-hover',
  };

  return (
    <button
      type={type}
      className={[
        variants.default,
        variants[styling as keyof typeof variants],
      ].join(' ')}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
