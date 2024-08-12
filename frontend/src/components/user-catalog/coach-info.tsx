import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AppRoute, AppTitle } from "../../const";
import { FullUser, Gender, Training, UserRole } from "../../types";
import { Header, TrainingCard } from "../";
import { useState } from "react";
import './styles.css';
import { addToFriendAction } from "../../store/api-actions";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAuthUser } from "../../store/selectors";

interface UserProps {
  user: FullUser;
  trainings: Training[];
}

export function CoachInfo({ user, trainings }: UserProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(getAuthUser);
  const [currentTrainingIndex, setCurrentTrainingIndex] = useState<number>(0);
  const TRAINING_VISIBLE_ITEMS = 4;
  const totalTrainingItems = trainings.length;

  const handleTrainingNext = () => {
    setCurrentTrainingIndex((prevIndex: number) =>
      (prevIndex + TRAINING_VISIBLE_ITEMS) < totalTrainingItems
        ? prevIndex + TRAINING_VISIBLE_ITEMS
        : prevIndex
    );
  };

  const handleTrainingPrevious = () => {
    setCurrentTrainingIndex((prevIndex: number) =>
      prevIndex - TRAINING_VISIBLE_ITEMS >= 0 ? prevIndex - TRAINING_VISIBLE_ITEMS : prevIndex
    );
  };

  const handleAddToFriend = () => {
    if (user.id) {
      dispatch(addToFriendAction({friendId: user.id}));
      console.log('Добавлен в друзья:', user.id);
    }
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>{AppTitle.UserPage}</title>
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
                  </svg><span>Назад</span>
                </button>
              </Link>
              <div className="inner-page__content">
                <section className="user-card-coach">
                  <h1 className="visually-hidden">Карточка пользователя роль тренер</h1>
                  <div className="user-card-coach__wrapper">
                    <div className="user-card-coach__card">
                      <div className="user-card-coach__content">
                        <div className="user-card-coach__head">
                          <h2 className="user-card-coach__title">{user.name}</h2>
                        </div>
                        <div className="user-card-coach__label">
                          {/*<a href="popup-user-map.html">*/}
                          <svg className="user-card-coach__icon-location" width="12" height="14" aria-hidden="true">
                            <use xlinkHref="#icon-location"></use>
                          </svg>
                          <span>{user.metro}</span>
                        </div>
                        <div className="user-card-coach__status-container">
                          {user.role === UserRole.Coach &&
                            <div className="user-card-coach__status user-card-coach__status--tag">
                              <svg className="user-card-coach__icon-cup" width="12" height="13" aria-hidden="true">
                                <use xlinkHref="#icon-cup"></use>
                              </svg><span>Тренер</span>
                            </div>
                          }
                          {user.isReady ?
                            <div className="user-card-coach__status user-card-coach__status--check">
                              <span>Готов{user.gender === Gender.Woman ? 'а' : ''} тренировать</span>
                            </div>
                          :
                            <div className="user-card-coach-2__status user-card-coach-2__status--check">
                              <span>Не готов{user.gender === Gender.Woman ? 'а' : ''} тренировать</span>
                            </div>
                          }
                        </div>
                        <div className="user-card-coach__text">{user.description}</div>
                        <button className="btn-flat user-card-coach__sertificate" type="button">
                          <svg width="12" height="13" aria-hidden="true">
                            <use xlinkHref="#icon-teacher"></use>
                          </svg>
                          <span>Посмотреть сертификаты</span>
                        </button>
                        <ul className="user-card-coach__hashtag-list">
                          {user.trainingType.map((type) => (
                            <li className="user-card-coach__hashtag-item">
                              <div className="hashtag"><span>#{type}</span></div>
                            </li>
                          ))}
                        </ul>
                        {authUser.id !== user.id && (
                          <button onClick={handleAddToFriend} className="btn user-card-coach__btn" type="button">Добавить в друзья</button>
                        )}
                      </div>
                      <div className="user-card-coach__gallary">
                        <ul className="user-card-coach__gallary-list">
                          <li className="user-card-coach__gallary-item">
                            <img src={user.avatar} srcSet={`${user.avatar} 2x`}width="334" height="573" alt="photo1" />
                          </li>
                          <li className="user-card-coach__gallary-item">
                            <img src={user.background} srcSet={`${user.background} 2x`} width="334" height="573" alt="photo2" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="user-card-coach__training">
                      <div className="user-card-coach__training-head">
                        <h2 className="user-card-coach__training-title">Тренировки</h2>
                        <div className="user-card-coach__training-bts">
                          <button
                            className="btn-icon user-card-coach__training-btn"
                            type="button" aria-label="back"
                            onClick={handleTrainingPrevious}
                            disabled={currentTrainingIndex === 0}
                          >
                            <svg width="14" height="10" aria-hidden="true">
                              <use xlinkHref="#arrow-left"></use>
                            </svg>
                          </button>
                          <button
                            className="btn-icon user-card-coach__training-btn"
                            type="button"
                            aria-label="next"
                            onClick={handleTrainingNext}
                            disabled={currentTrainingIndex + TRAINING_VISIBLE_ITEMS >= totalTrainingItems}
                          >
                            <svg width="14" height="10" aria-hidden="true">
                              <use xlinkHref="#arrow-right"></use>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <ul
                        className="user-card-coach__training-list"
                        style={{ transform: `translateX(-${(currentTrainingIndex / TRAINING_VISIBLE_ITEMS) * 100}%)` }}
                      >
                        {trainings.map((training) => (
                          <li key={training.id} className="user-card-coach__training-item">
                            <TrainingCard training={training} />
                          </li>
                        ))}
                      </ul>
                      <form className="user-card-coach__training-form">
                        {/*<button
                          className="btn user-card-coach__btn-training"
                          type="button"
                        >
                          Хочу персональную тренировку
                        </button>*/}
                        <div className="user-card-coach__training-check">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="user-agreement-1" name="user-agreement" checked />
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
                            </label>
                          </div>
                        </div>
                      </form>
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
