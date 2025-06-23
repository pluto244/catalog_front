import { createPortal } from 'react-dom'
import cn from 'classnames'
import css from './Modal.module.css'
import { ReactNode, useEffect } from 'react'
import { Button } from '../Button/Button'

const modalRoot = document.getElementById('modal')!

type Props = {
  type: 'success' | 'error' | null,
  children: ReactNode,
  onClose: () => void,
  buttonText?: string
}

export function Modal ({type, children, onClose, buttonText = 'Главный экран'} : Props) {
  useEffect(() => {
    const onESCpress = (event:KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
  
    document.addEventListener('keydown', onESCpress)
  
    return () => {
      document.removeEventListener('keydown', onESCpress)
    }
  }, [onClose]);

  const onOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  };

  return createPortal(
    (
      <div className={css.overlay} onClick={onOverlayClick}>
        <div className={cn(
          css.modal,
          type === 'success' ? css.modal_success : css.modal_error
        )}>
          {children}
          <Button onClick={onClose}>
            {buttonText}
          </Button>
        </div>
      </div>
    ), modalRoot
  )
}