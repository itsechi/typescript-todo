type InputProps = {
  value: string;
  placeholder: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ value, placeholder, onChange, name }: InputProps) => {
  return (
    <input
      className="rounded-lg border-border-dark bg-hover px-2 py-1.5 text-sm focus:outline-none focus:ring-primary dark:border-night-border dark:bg-night-hover"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
};
