import { useNavigate } from "react-router-dom";
import { Training } from "../../types";
import { AppRoute } from "../../const";
import { useState } from "react";
import { TrainingCard } from "..";
import './styles.css';
import { handleNext, handlePrevious } from "../../utils";

interface PopularTrainingsListProps {
  popularTrainings: Training[];
}

export function PopularTrainingsList({ popularTrainings }: PopularTrainingsListProps): JSX.Element {
  const navigate = useNavigate();
  const VISIBLE_ITEMS = 4;
  const SLIDER_STEP = 1;
  const totalItems = popularTrainings.length;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button onClick={() => {navigate(AppRoute.Trainings)}} className="btn-flat popular-trainings__button" type="button">
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="popular-trainings__controls">
              <button
                className="btn-icon popular-trainings__control"
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
                className="btn-icon popular-trainings__control"
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
          <ul className="popular-trainings__list"
            style={{ transform: `translateX(-${(currentIndex / VISIBLE_ITEMS) * 100}%)` }}
          >
            {popularTrainings.map((training) => (
              <li key={training.id} className="my-trainings__item">
                <TrainingCard training={training} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
