import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";
import { FullUser, Gender } from "../../types";
import { Header } from "../";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAuthUser } from "../../store/selectors";
import { addToFriendAction } from "../../store/api-actions";

interface UserProps {
  user: FullUser;
}

export function CustomerInfo({ user }: UserProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(getAuthUser);

  const handleAddToFriend = () => {
    if (user.id) {
      dispatch(addToFriendAction({friendId: user.id}));
    }
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Карточка пользователя — FitFriends</title>
      </Helmet>
      <Header />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <Link to={AppRoute.Users}>
                <button className="btn-flat inner-page__back" type="button">
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg>
                  <span>Назад</span>
                </button>
              </Link>
              <div className="inner-page__content">
                <section className="user-card">
                  <h1 className="visually-hidden">Карточка пользователя</h1>
                  <div className="user-card__wrapper">
                    <div className="user-card__content">
                      <div className="user-card__head">
                        <h2 className="user-card__title">{user.name}</h2>
                      </div>
                      <div className="user-card__label">
                        {/*<a href="popup-user-map.html">*/}
                        <svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
                          <use xlinkHref="#icon-location"></use>
                        </svg>
                        <span>{user.metro}</span>
                      </div>
                      {user.isReady ?
                        <div className="user-card__status">
                          <span>{user.gender === Gender.Woman ? 'Готова к тренировке' : 'Готов к тренировке'}</span>
                        </div>
                      : ''}
                      <div className="user-card__text">{user.description}</div>
                      <ul className="user-card__hashtag-list">
                        {user.trainingType.map((type) => (
                          <li className="user-card__hashtag-item">
                            <div className="hashtag"><span>#{type}</span></div>
                          </li>
                        ))}
                          <li className="user-card__hashtag-item">
                            <div className="hashtag">
                              <span>#{user.level}</span>
                            </div>
                          </li>
                      </ul>
                      {authUser.id !== user.id && (
                        <button onClick={handleAddToFriend} className="btn user-card__btn" type="button">Добавить в друзья</button>
                      )}
                    </div>
                    <div className="user-card__gallary">
                      <ul className="user-card__gallary-list">
                        <li className="user-card__gallary-item">
                          <img src={user.avatar} srcSet={`${user.avatar} 2x`}width="334" height="573" alt="photo1" />
                        </li>
                        <li className="user-card__gallary-item">
                          <img src={user.background} srcSet={`${user.background} 2x`} width="334" height="573" alt="photo2" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
