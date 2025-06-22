import { Outlet } from 'react-router-dom'
import css from './Layout.module.css'
import { ReactNode } from 'react'

type Props = {
  headerSlot: ReactNode
}

export function Layout(props: Props) {
  return (
    <div className={css.root}>
      {props.headerSlot}
      <main className={css.content}>
        <Outlet />
      </main>
    </div>
  )
}
