import css from './Loader.module.css'

export const Loader = () => {
  return (
    <div className={css.loader_container}>
      <span className={css.loader}></span>
    </div>
  )
}