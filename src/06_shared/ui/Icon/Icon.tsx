import cn from 'classnames'
import React from 'react'
import css from './Icon.module.css'
import headerUser from '../../../../public/images/headerUser.svg'
import teamlogo from '../../../../public/images/teamlogo.svg'
import loader from '../../../../public/images/loader.svg'
import activeHeart from '../../../../public/images/activeHeart.svg'
import heart from '../../../../public/images/heart.svg'
import deleteIcon from '../../../../public/images/delete.svg'
import logout from '../../../../public/images/logout.svg'

export type IconType = 
  | 'headerUser'
  | 'teamlogo'
  | 'loader'
  | 'activeHeart'
  | 'heart'
  | 'delete'
  | 'logout'

export type Props = {
    className?: string
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
    type: IconType
}

const icons = {
  headerUser,
  teamlogo,
  loader,
  activeHeart,
  heart,
  delete: deleteIcon,
  logout
}

export function Icon(props: Props) {
  const { className, type, onClick } = props

  return (
    <div
      className={cn(
        css.root,
        className,
        onClick && css.root_clickable,
      )}
      onClick={onClick}
    >
      <div
        className={css.icon}
        style={{
          backgroundImage: `url(${icons[type]})`,
        }}
      />
    </div>
  )
}