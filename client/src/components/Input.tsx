import { Path, UseFormRegister } from 'react-hook-form';
import { Inputs } from '@/types';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<Inputs>;
  label: Path<Inputs>;
}

export const Input = ({ register, label, ...props }: InputProps) => {
  return (
    <input
      className="rounded-lg border-border-dark bg-hover px-2 py-1.5 text-sm focus:outline-none focus:ring-primary dark:border-night-border dark:bg-night-hover"
      {...register(label, {
        setValueAs: (value: string) => value.trim(),
        required: true,
        minLength: 1,
      })}
      {...props}
    />
  );
};
