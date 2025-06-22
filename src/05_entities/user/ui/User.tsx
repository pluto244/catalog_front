import { UserType } from "../model/types";
import css from './User.module.css';

type Props = {
  user: UserType;
};

export const User = ({user} : Props) => {
  return (
    <div className={css.root}>
      <h1>{user.name}</h1>
      <div className={css.link}>
        <p>e-mail:</p>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </div>
    </div> 
  )
};