import React from 'react'
import css from './LayoutHeader.module.css'
import SiteName from '../SiteName/SiteName'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/01_app/AppStore'
import { Icon} from '@/06_shared/ui/Icon/Icon';
import { Roles } from '@/05_entities/user/api/types'
import { clearSession } from '@/05_entities/session/sessionSlice'
import { useAppDispatch } from '@/06_shared/model/hooks'

export function LayoutHeader() {
    const { userId, role, name } = useSelector((state: RootState) => state.session);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(clearSession());
    };

    return (
        <header className={css.root}>
            <Link to="/">
                <div className={css.left}>
                    <Icon type = "teamlogo" className={css.logo}/>
                    <SiteName />
                </div>
            </Link>
            <div className={css.right}>
                {(role === Roles.ROLE_USER) && userId && (
                    <Link to={`/profile/${userId}`}>
                        <div className={css.user_block}>
                            <span>{name || 'Личный кабинет'}</span>
                            <Icon type="headerUser" className={css.icon}/>
                        </div>
                    </Link>
                )}
                {userId && (
                    <button onClick={handleLogout} className={css.logoutButton}>
                        <Icon type="logout" className={css.icon} />
                    </button>
                )}
            </div>
        </header>
    )
}
