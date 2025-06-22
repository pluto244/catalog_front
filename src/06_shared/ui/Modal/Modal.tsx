import { createPortal } from 'react-dom'
import cn from 'classnames'
import css from './Modal.module.css'
import { ReactNode, useEffect } from 'react'
import { Button } from '../Button/Button'
import { useModal } from '@/06_shared/lib/useModal'

const modalRoot = document.getElementById('modal')!

type Props = {
  type: 'success' | 'error' | null,
  children: ReactNode
}

export function Modal ({type, children} : Props) {
  const { closeModal } = useModal();

  useEffect(() => {
    const onESCpress = (event:KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }
  
    document.addEventListener('keydown', onESCpress)
  
    return () => {
      document.removeEventListener('keydown', onESCpress)
    }
  }, [closeModal]);

  const onOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal()
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
          <Button onClick={closeModal}>
            Главный экран
          </Button>
        </div>
      </div>
    ), modalRoot
  )
}