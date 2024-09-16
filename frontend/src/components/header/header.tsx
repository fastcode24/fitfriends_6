import { Link, useLocation } from "react-router-dom";
import { AppRoute } from "../../const";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAuthUser, getNotify } from "../../store/selectors";
import { UserRole } from "../../types";
import { useEffect } from "react";
import { fetchNotifyAction } from "../../store/api-actions";
import { NotifyMessages } from "..";

export function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const authUser = useAppSelector(getAuthUser);
  const notify = useAppSelector(getNotify);
  let isActiveMain = false;
  let isActiveAccount = false;
  const isActiveFriends = location.pathname === AppRoute.Friends;

  if (authUser.role === UserRole.Coach) {
    isActiveMain = location.pathname === AppRoute.AccountCoach;
    isActiveAccount = location.pathname === AppRoute.AccountCoach;
  } else {
    isActiveMain = location.pathname === AppRoute.Main;
    isActiveAccount = location.pathname === AppRoute.AccountCustomer;
  }

  useEffect(() => {
    dispatch(fetchNotifyAction());
  }, [dispatch]);

  const handleNotifyClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    dispatch(fetchNotifyAction());
  };

  return (
    <header className="header">
    <div className="container">
      <Link to={AppRoute.Intro} className="header__logo" aria-label="Переход на главную">
        <svg width="187" height="70" aria-hidden="true">
          <use xlinkHref="#logo"></use>
        </svg>
      </Link>
      <nav className="main-nav">
        <ul className="main-nav__list">
          <li className="main-nav__item">
            <Link to={authUser.role === UserRole.Coach ? AppRoute.AccountCoach : AppRoute.Main} className={`main-nav__link ${isActiveMain ? 'is-active' : ''}`} aria-label="На главную">
              <svg width="18" height="18" aria-hidden="true">
                <use xlinkHref="#icon-home"></use>
              </svg>
            </Link>
          </li>
          <li className="main-nav__item">
            <Link to={authUser.role === UserRole.Coach ? AppRoute.AccountCoach : AppRoute.AccountCustomer} className={`main-nav__link ${isActiveAccount ? 'is-active' : ''}`} aria-label="Личный кабинет">
              <svg width="16" height="18" aria-hidden="true">
                <use xlinkHref="#icon-user"></use>
              </svg>
            </Link>
          </li>
          <li className="main-nav__item">
            <Link to={AppRoute.Friends} className={`main-nav__link ${isActiveFriends ? 'is-active' : ''}`} aria-label="Друзья">
              <svg width="22" height="16" aria-hidden="true">
                <use xlinkHref="#icon-friends"></use>
              </svg>
            </Link>
          </li>
          <li className="main-nav__item main-nav__item--notifications">
            <a className="main-nav__link" href="#" aria-label="Уведомления" onClick={handleNotifyClick}>
              <svg width="14" height="18" aria-hidden="true">
                <use xlinkHref="#icon-notification"></use>
              </svg>
            </a>
            <div className="main-nav__dropdown">
              <p className="main-nav__label">{notify && notify.length > 0 ? 'Оповещения' : 'Новых оповещений нет'}</p>
              {(notify && notify.length > 0) && <NotifyMessages notify={notify} />}
            </div>
          </li>
        </ul>
      </nav>
      <div className="search">
        <form action="#" method="get">
          <label><span className="search__label">Поиск</span>
            <input type="search" name="search" disabled />
            <svg className="search__icon" width="20" height="20" aria-hidden="true">
              <use xlinkHref="#icon-search"></use>
            </svg>
          </label>
          <ul className="search__list">
          </ul>
        </form>
      </div>
    </div>
  </header>
  );
}
