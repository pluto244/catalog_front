import { Input } from '../Input/Input'
import css from './LabeledField.module.css'

type Props = {
  label: string
} & React.ComponentProps<typeof Input>;

export const LabeledField = ({label, register, inputStyle, maxLength, id}: Props) => {
  return (
    <div className={css.root}>
      <label htmlFor={id} className={css.label_name}>{label}</label>
      <Input
        id={id}
        register={register}
        inputStyle={inputStyle}
        maxLength={maxLength}
      />
    </div>
  )
}