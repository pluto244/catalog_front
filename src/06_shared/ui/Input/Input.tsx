import { UseFormRegisterReturn } from 'react-hook-form'
import css from './Input.module.css'
import cn from 'classnames'
import { InputHTMLAttributes } from 'react'

type Props = {
  maxLength?: number
  value?: string
  inputStyle?: 'default' | 'description'
  register?: UseFormRegisterReturn
  type?: InputHTMLAttributes<HTMLInputElement>['type']
  id?: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const Input = ({ 
  maxLength = 50, 
  value, 
  inputStyle = 'default', 
  register, 
  type,
  placeholder,
  id,
  onChange
}: Props) => {
  return inputStyle === 'description' ? (
    <textarea
      {...register}
      maxLength={maxLength}
      className={cn(css.root, css.textArea_text)}
      value={value}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
    />
  ) : (
    <input
      {...register}
      type={type}
      maxLength={maxLength}
      className={cn(css.root, css.input_text)}
      value={value}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}