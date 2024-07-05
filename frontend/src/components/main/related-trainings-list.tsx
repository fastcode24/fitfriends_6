import { useState } from "react";
import { Training } from "../../types";
import { SLIDER_STEP } from "../../const";
import { RelatedCard } from "..";
import { handleNext, handlePrevious } from "../../utils";
import './styles.css';

interface RelatedTrainingsListProps {
  relatedTrainings: Training[];
}

export function RelatedTrainingsList({ relatedTrainings }: RelatedTrainingsListProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const VISIBLE_ITEMS = 3;
  const totalItems = relatedTrainings.length;

  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">Специально подобрано для вас</h2>
            <div className="special-for-you__controls">
              <button
                className="btn-icon special-for-you__control"
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
                className="btn-icon special-for-you__control"
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
            className="special-for-you__list special-for-you__list--single"
            style={{ transform: `translateX(-${(currentIndex * 100) / VISIBLE_ITEMS}%)` }}
          >
            {relatedTrainings.map((training) => (
              <li key={training.id}>
                <RelatedCard training={training} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
