import { Link } from "react-router-dom";
import { PopupBuy } from "@components";
import { AppRoute, FEATURED_DISCOUNT } from "@/const";
import { FullTraining } from "@types";

type TrainingInfoCustomerProps = {
  training: FullTraining;
  isPopupBuyVisible: boolean;
  handlePopupBuyClick: () => void;
  handleClosePopup: () => void;
};

export function TrainingInfoCustomer({ training, isPopupBuyVisible, handlePopupBuyClick, handleClosePopup }: TrainingInfoCustomerProps): JSX.Element {

  return(
    <div className="training-info">
      <h2 className="visually-hidden">Информация о тренировке</h2>
      <div className="training-info__header">
        <Link to={`${AppRoute.User}/${training.coachId}`}>
          <div className="training-info__coach">
            <div className="training-info__photo">
              <picture>
                <source type="image/webp" srcSet={`${training.coachAvatar}, ${training.coachAvatar} 2x`} />
                <img src={training.coachAvatar} srcSet={`${training.coachAvatar} 2x`} width="64" height="64" alt="Изображение тренера" />
              </picture>
            </div>
            <div className="training-info__coach-info">
              <span className="training-info__label">Тренер</span>
              <span className="training-info__name">{training.coachName}</span>
            </div>
          </div>
        </Link>
      </div>
      <div className="training-info__main-content">
        <form action="#" method="get">
          <div className="training-info__form-wrapper">
            <div className="training-info__info-wrapper">
              <div className="training-info__input training-info__input--training">
                <label>
                  <span className="training-info__label">Название тренировки</span>
                  <input type="text" name="training" value={training.title} disabled />
                </label>
                <div className="training-info__error">Обязательное поле</div>
              </div>
              <div className="training-info__textarea">
                <label>
                  <span className="training-info__label">Описание тренировки</span>
                  <textarea name="description" defaultValue={training.description} disabled />
                </label>
              </div>
            </div>
            <div className="training-info__rating-wrapper">
              <div className="training-info__input training-info__input--rating">
                <label>
                  <span className="training-info__label">Рейтинг</span>
                  <span className="training-info__rating-icon">
                    <svg width="18" height="18" aria-hidden="true">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </span>
                  <input type="number" name="rating" value={training.rating} disabled />
                </label>
              </div>
              <ul className="training-info__list">
                <li className="training-info__item">
                  <div className="hashtag hashtag--white"><span>#{training.trainingType}</span></div>
                </li>
                <li className="training-info__item">
                  <div className="hashtag hashtag--white"><span>#{training.gender}</span></div>
                </li>
                <li className="training-info__item">
                  <div className="hashtag hashtag--white"><span>#{training.calories}ккал</span></div>
                </li>
                <li className="training-info__item">
                  <div className="hashtag hashtag--white"><span>#{training.trainingTime}</span></div>
                </li>
              </ul>
            </div>
            <div className="training-info__price-wrapper">
              <div className="training-info__input training-info__input--price">
                <label><span className="training-info__label">Стоимость</span>
                  <input type="text" name="price" value={training.price > 0 ? `${training.isFeatured ? Number(training.price) * FEATURED_DISCOUNT : training.price} ₽` : 'Бесплатно'} disabled />
                </label>
                <div className="training-info__error">Введите число</div>
              </div>
              <button
                className="btn training-info__buy"
                type="button"
                onClick={handlePopupBuyClick}
                disabled={training.count > 0}
              >
                Купить
              </button>
              {isPopupBuyVisible && <PopupBuy training={training} onClose={handleClosePopup} />}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
