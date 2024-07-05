import { useState } from "react";
import { FullUser } from "../../types";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";
import { UserCard } from "..";
import './styles.css';
import { handleNext, handlePrevious } from "../../utils";

interface ReadyUsersListProps {
  readyUsers: FullUser[];
}

export function ReadyUsersList({ readyUsers }: ReadyUsersListProps): JSX.Element {
  const VISIBLE_ITEMS = 4;
  const SLIDER_STEP = 1;
  const totalItems = readyUsers.length;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
            <Link to={AppRoute.Users}>
              <button className="btn-flat btn-flat--light look-for-company__button" type="button"><span>Смотреть все</span>
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </Link>
            <div className="look-for-company__controls">
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button"
                aria-label="previous"
                onClick={() => setCurrentIndex((prevIndex: number) => handlePrevious(prevIndex, SLIDER_STEP))}
                disabled={currentIndex === 0}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button"
                aria-label="next"
                onClick={() => setCurrentIndex((prevIndex: number) => handleNext(prevIndex, totalItems, SLIDER_STEP))}
                disabled={currentIndex + VISIBLE_ITEMS >= totalItems}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul
            className="look-for-company__list"
            style={{ transform: `translateX(-${(currentIndex * 100) / VISIBLE_ITEMS}%)` }}
          >
            {readyUsers.slice(currentIndex, currentIndex + VISIBLE_ITEMS).map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
