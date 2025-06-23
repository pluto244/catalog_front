import { Input } from '../Input/Input'
import css from './LabeledField.module.css'
import { FieldError } from 'react-hook-form';

type Props = {
  label: string;
  error?: FieldError;
} & React.ComponentProps<typeof Input>;

export const LabeledField = ({label, register, inputStyle, maxLength, id, error}: Props) => {
  return (
    <div className={css.root}>
      <label htmlFor={id} className={css.label_name}>{label}</label>
      <Input
        id={id}
        register={register}
        inputStyle={inputStyle}
        maxLength={maxLength}
      />
      {error && <span className={css.error_message}>{error.message}</span>}
    </div>
  )
}