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
      defaultValue={props.value as string | undefined}
      rules={{
        required: true,
        minLength: 1,
        validate: (value) => value.trim().length > 0,
      }}
      render={({ field }) => (
        <input
          className="dark:bg-night-gray-700 dark:border-night-gray-200 w-full rounded-lg border-gray-200 bg-gray-100 px-2 py-1.5 text-sm focus:border-gray-300 focus:outline-none focus:ring-gray-300 dark:focus:border-gray-700 dark:focus:ring-gray-700"
          onChange={(e) => {
            onChange(e);
            field.onChange(e);
          }}
          {...props}
        />
      )}
    />
  );
};
