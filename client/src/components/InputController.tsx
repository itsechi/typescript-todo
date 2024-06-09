import { Control, Controller, Path } from 'react-hook-form';
import { Inputs } from '@/types';

interface InputControllerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<Inputs>;
  control: Control<Inputs>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputController = ({
  name,
  control,
  onChange,
  ...props
}: InputControllerProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: true,
        minLength: 1,
        validate: (value) => value.trim().length > 0,
      }}
      render={({ field }) => (
        <input
          className="rounded-lg border-border-dark bg-hover px-2 py-1.5 text-sm focus:outline-none focus:ring-primary dark:border-night-border dark:bg-night-hover"
          onChange={(e) => {
            onChange(e);
            field.onChange(e);
          }}
          onBlur={() => console.log('hi')}
          {...props}
        />
      )}
    />
  );
};
