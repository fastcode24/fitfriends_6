import { PopupReview } from "..";
import { FullReview, FullTraining, UserRole } from "../../types";
import { ReviewCard } from "./review-card";

type ReviewListProps = {
  role: UserRole;
  training: FullTraining;
  reviews: FullReview[] | null;
  handlePopupReviewClick: () => void;
  handleClosePopup: () => void;
  isPopupReviewVisible: boolean;
};

export function ReviewList({role, training, reviews, handlePopupReviewClick, handleClosePopup, isPopupReviewVisible}: ReviewListProps): JSX.Element {

  return (
    <>
      <h2 className="reviews-side-bar__title">{reviews && reviews.length > 0 ? 'Отзывы' : 'Отзывов пока нет'}</h2>
      <ul className="reviews-side-bar__list">
        {!reviews && <li className="reviews-side-bar__item">Загрузка отзывов...</li>}
        {reviews && reviews.map((review) => (
          <li key={review.id} className="reviews-side-bar__item">
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
      <button
        className="btn btn--medium reviews-side-bar__button"
        type="button"
        onClick={handlePopupReviewClick}
        disabled={role === UserRole.Coach}
      >
        Оставить отзыв
      </button>
      {isPopupReviewVisible && <PopupReview training={training} onClose={handleClosePopup} />}
    </>
  );
}
