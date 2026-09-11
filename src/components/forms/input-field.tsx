import type { ComponentProps } from 'react';
import { useId } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type FormInputProps<TFieldValues extends FieldValues> = Omit<
  ComponentProps<'input'>,
  'name'
> & {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  helperText?: string;
  containerClassName?: string;
};

export function FormInput<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  helperText,
  id,
  className,
  containerClassName,
  ...props
}: FormInputProps<TFieldValues>) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  const helperTextId = helperText ? `${inputId}-help` : undefined;
  const errorTextId = error ? `${inputId}-error` : undefined;

  return (
    <div className={cn('field', containerClassName)}>
      <label htmlFor={inputId} className="label">
        {label}
      </label>

      <Input
        id={inputId}
        className={cn('input', className)}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={errorTextId ?? helperTextId}
        {...field}
        {...props}
      />

      {error ? (
        <p id={errorTextId} className="error-text" role="alert">
          {error.message}
        </p>
      ) : helperText ? (
        <p id={helperTextId} className="auth-subtitle">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
