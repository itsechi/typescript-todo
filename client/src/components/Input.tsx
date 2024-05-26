import { Path, UseFormRegister } from 'react-hook-form';

type Inputs = {
  listName: string;
};

type InputProps = {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<Inputs>;
  label: Path<Inputs>;
};

export const Input = ({
  value,
  placeholder,
  onChange,
  register,
  label,
}: InputProps) => {
  return (
    <input
      className="rounded-lg border-border-dark bg-hover px-2 py-1.5 text-sm focus:outline-none focus:ring-primary dark:border-night-border dark:bg-night-hover"
      type="text"
      placeholder={placeholder}
      defaultValue={value}
      {...register(label, { required: 'This field is required', minLength: 1 })}
      onChange={onChange}
    />
  );
};
