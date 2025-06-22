import cn from 'classnames'
import type { ReactNode } from 'react'
import css from './Button.module.css'
import { Icon } from '@/06_shared/ui/Icon/Icon'



type Props = {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    children: ReactNode
    type?: 'submit'
    isLoading?: boolean
    disabled?: boolean
}

export function Button({
    onClick,
    children,
    isLoading,
    disabled,
    type,
}: Props) {
    return (
        <button
            type={type}
            disabled={disabled}
            className={cn(
                css.root,
                disabled && css.root_disabled,
            )}
            onClick={onClick}
        >
            
            {isLoading ? <Icon className={css.loader} type="loader" /> : children}
        </button>
    )
}