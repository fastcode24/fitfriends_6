import { FullReview } from "../../types";

interface UserCardProps {
  review: FullReview;
}

export function ReviewCard({ review }: UserCardProps): JSX.Element {
  return (
    <div className="review">
      <div className="review__user-info">
        <div className="review__user-photo">
          <picture>
            <source type="image/webp" srcSet={`${review.userAvatar}, ${review.userAvatar} 2x`} />
            <img src={review.userAvatar} srcSet={`${review.userAvatar} 2x`} width="64" height="64" alt="Изображение пользователя" />
          </picture>
        </div><span className="review__user-name">{review.userName}</span>
        <div className="review__rating">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg><span>{review.grade}</span>
        </div>
      </div>
      <p className="review__comment">{review.text}</p>
    </div>
  );
}
