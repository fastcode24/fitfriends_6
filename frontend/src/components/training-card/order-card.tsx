import { Link } from "react-router-dom";
import { AppRoute } from "../../const";
import { CoachOrder } from "../../types";

interface OrderCardProps {
  order: CoachOrder;
}

export function OrderCard({ order }: OrderCardProps): JSX.Element {
  const training = order.training;

  return (
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <source type={`${training.background}, ${training.background} 2x`} />
            <img src={training.background} srcSet={`${training.background} 2x`} width="330" height="190" alt="" />
          </picture>
        </div>
        <p className="thumbnail-training__price">
          <span className="thumbnail-training__price-value">{training.price === 0 ? ' Бесплатно' : `${training.price} ₽`}</span>
        </p>
        <h2 className="thumbnail-training__title">{training.title}</h2>
        <div className="thumbnail-training__info">
          <ul className="thumbnail-training__hashtags-list">
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>#{training.trainingType}</span>
              </div>
            </li>
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>#{training.calories}ккал</span>
              </div>
            </li>
          </ul>
          <div className="thumbnail-training__rate">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg><span className="thumbnail-training__rate-value">{training.rating}</span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">{training.description}</p>
        </div>
        <Link to={`${AppRoute.TrainingUrl}/${training.id}`} className="btn-flat btn-flat--underlined thumbnail-training__button-orders">
          <svg width="18" height="18" aria-hidden="true">
            <use xlinkHref="#icon-info"></use>
          </svg><span>Подробнее</span>
        </Link>
      </div>
      <div className="thumbnail-training__total-info">
        <div className="thumbnail-training__total-info-card">
          <svg width="32" height="32" aria-hidden="true">
            <use xlinkHref="#icon-chart"></use>
          </svg>
          <p className="thumbnail-training__total-info-value">{order.quantity}</p>
          <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
        </div>
        <div className="thumbnail-training__total-info-card">
          <svg width="31" height="28" aria-hidden="true">
            <use xlinkHref="#icon-wallet"></use>
          </svg>
          <p className="thumbnail-training__total-info-value">{order.cost}<span>₽</span></p>
          <p className="thumbnail-training__total-info-text">Общая сумма</p>
        </div>
      </div>
    </div>
  );
}
