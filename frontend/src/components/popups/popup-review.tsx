import { useEffect, useRef, useState } from "react";
import { centerElement } from "../../utils";
import { Grade, Review, Training } from "../../types";
import { createReviewAction } from "../../store/api-actions";
import { useAppDispatch } from "../../hooks";

interface PopupReviewProps {
  training: Training,
  onClose: () => void;
}

export function PopupReview({ training, onClose }: PopupReviewProps): JSX.Element {
  const dispatch = useAppDispatch();
  const popupRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [review, setReview] = useState({
    trainingId: training.id,
    grade: 5,
    text: ""
  });

  useEffect(() => {
    if (review.trainingId) {
      setInputError(validateReview(review as Review));
    }
  }, [review.trainingId]);

  useEffect(() => {
    const handleCenterPopup = () => centerElement(popupRef.current);
    handleCenterPopup();
    window.addEventListener('resize', handleCenterPopup);

    return () => {
      window.removeEventListener('resize', handleCenterPopup);
    };
  }, []);

  const validateReview = (review: Review) => {
    if (review.text.length < 100) {
      return 'Минимальное количество символов: 100';
    }
    if (!Object.values(Grade).includes(review.grade)) {
      return 'Оценка должна быть от 1 до 5';
    }
    return null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setReview(prevReviewData => {
      const updatedReview = { ...prevReviewData, [name]: +value as Grade };
      if (review.trainingId) {
        setInputError(validateReview(updatedReview as Review));
      }
      return updatedReview;
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setReview(prevReviewData => {
      const updatedReview = { ...prevReviewData, [name]: value };
      setInputError(validateReview(updatedReview as Review));
      return updatedReview;
    });
  };

  const handleSubmit = async () => {
    if (review.trainingId && !inputError) {
      try {
        await dispatch(createReviewAction(review as Review)).unwrap();

        setResult('Отзыв добавлен!');

        setTimeout(() => {
          setResult(null);
          onClose();
        }, 1200);
      } catch (error) {
        setResult('Ошибка при добавлении отзыва');

        setTimeout(() => {
          setResult(null);
        }, 1200);
      }
    }
  }

  return (
    <div className="popup-form popup-form--feedback" ref={popupRef}>
      <section className="popup">
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">Оставить отзыв</h2>
            <button
              className="btn-icon btn-icon--outlined btn-icon--big"
              type="button"
              aria-label="close"
              onClick={onClose}
            >
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
          <div className="popup__content popup__content--feedback">
            <h3 className="popup__feedback-title">Оцените тренировку</h3>
            <ul className="popup__rate-list">
              {Object.values(Grade).filter(value => typeof value === 'number').map((value, index) => (
                <li key={`grade_${index}`} className="popup__rate-item">
                  <div className="popup__rate-item-wrap">
                    <label>
                      <input type="radio"
                      onChange={handleInputChange}
                      name="grade"
                      aria-label={`оценка ${value}`}
                      value={value}
                      checked={review.grade === value} />
                      <span className="popup__rate-number">{value}</span>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
            <div className="popup__feedback">
              <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о тренировке</h3>
              <div className="popup__feedback-textarea">
                <div className="custom-textarea">
                  <label>
                    <textarea
                      name="text"
                      maxLength={1024}
                      placeholder=" "
                      onChange={handleTextareaChange}
                    >
                    </textarea>
                  </label>
                </div>
              </div>
            </div>
            <div className="popup__button">
              <button onClick={handleSubmit} className="btn" type="button" disabled={!!inputError}>Продолжить</button>
              <p className="input_error">{inputError}</p>
              <p className="popup__message">{result}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
