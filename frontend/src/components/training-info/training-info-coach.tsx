import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { EditableTrainingData, FullTraining } from "../../types";
import { formatGender, handleButtonChange, handleInputChange, handleTextareaChange } from "../../utils";
import { useAppDispatch } from "../../hooks";
import { updateTrainingAction } from "../../store/api-actions";
import { FEATURED_DISCOUNT } from "../../const";

interface FormError {
  title: string | null;
  description: string | null;
  price: string  | null;
}

type TrainingInfoCoachProps = {
  training: FullTraining;
  isEditMode: boolean;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
};

export function TrainingInfoCoach({ training, isEditMode, setIsEditMode }: TrainingInfoCoachProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [editableData, setEditableData] = useState<EditableTrainingData>({
    title: training.title,
    description: training.description,
    price: training.price,
    isFeatured: training.isFeatured ?? false
  });
  const [error, setError] = useState<FormError>({
    title: null,
    description: null,
    price: null,
  });

  useEffect(() => {
    if (isEditMode) {
      setError(validate(editableData));
    }
  }, [editableData, isEditMode]);

  const validate = (editableData: EditableTrainingData): FormError => {
    const errors: FormError = {
      title: editableData.title.length < 1 || editableData.title.length > 15 ? 'От 1 до 15 символов' : null,
      price: isNaN(Number(editableData.price)) || Number(editableData.price) < 0 || editableData.price === '' ? 'Целое число, 0 если бесплатно' : null,
      description: editableData.description.length < 10 || editableData.description.length > 140 ? 'От 10 до 140 символов' : null,
    };
    return errors;
  };

  const handleEditModeClick = () => {
    if (isEditMode) {
      if (training.id && !Object.values(error).some((err) => err !== null)) {
        dispatch(updateTrainingAction({ id: training.id, editableData }))
      }
      setIsEditMode(false);
    } else {
      setIsEditMode(true);
    }
  }

  return(
    <div className="training-info">
      <h2 className="visually-hidden">Информация о тренировке</h2>
      <div className="training-info__header">
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
        <button
          className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--save"
          type="button"
          onClick={handleEditModeClick}
          disabled={isEditMode && Object.values(error).some((err) => err !== null)}
        >
          {!isEditMode &&
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg>
          }
          <span>{isEditMode ? 'Сохранить' : 'Редактировать'}</span>
        </button>
      </div>
      <div className="training-info__main-content">
        <form action="#" method="get">
          <div className="training-info__form-wrapper">
            <div className="training-info__info-wrapper">
              <div className={`training-info__input training-info__input--training ${error.title ? 'is-invalid' : ''}`}>
                <label>
                  <span className="training-info__label">Название тренировки</span>
                  <input
                    type="text"
                    name="title"
                    maxLength={15}
                    value={editableData.title}
                    onChange={(e) => handleInputChange(setEditableData, e)}
                    disabled={!isEditMode}
                  />
                </label>
                <div className="training-info__error">{error.title}</div>
              </div>
              <div className={`training-info__textarea ${error.description ? 'training-info__input is-invalid' : ''}`}>
                <label>
                  <span className="training-info__label">Описание тренировки</span>
                  <textarea
                    name="description"
                    maxLength={140}
                    onChange={(e) => handleTextareaChange(setEditableData, e)}
                    disabled={!isEditMode}>{editableData.description}
                  </textarea>
                </label>
                <div className="training-info__error">{error.description}</div>
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
                  <div className="hashtag hashtag--white">
                    <span>#{training.trainingType}</span>
                  </div>
                </li>
                <li className="training-info__item">
                  <div className="hashtag hashtag--white">
                    <span>#{formatGender(training.gender)}</span>
                  </div>
                </li>
                <li className="training-info__item">
                  <div className="hashtag hashtag--white">
                    <span>#{training.calories}ккал</span>
                  </div>
                </li>
                <li className="training-info__item">
                  <div className="hashtag hashtag--white">
                    <span>#{training.trainingTime.replace(/-/g, '_')}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="training-info__price-wrapper">
              <div className={`training-info__input training-info__input--price ${error.price ? 'is-invalid' : ''}`}>
                <label>
                  <span className="training-info__label">Стоимость</span>
                  {isEditMode ?
                    <input
                      type="number"
                      name="price"
                      onChange={(e) => handleInputChange(setEditableData, e)}
                      value={editableData.price !== null ? editableData.price : ''}
                    />
                    :
                    <input
                      type="text"
                      name="price"
                      value={`${editableData.isFeatured ? Number(editableData.price) * FEATURED_DISCOUNT : editableData.price} ₽`}
                      disabled={true}
                    />
                  }
                </label>
                <div className="training-info__error">{error.price}</div>
              </div>
              <button
                className="btn-flat btn-flat--light btn-flat--underlined training-info__discount"
                type="button"
                name="isFeatured"
                onClick={(e) => handleButtonChange<EditableTrainingData>(setEditableData, e)}
                disabled={!isEditMode}
              >
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-discount"></use>
                </svg>
                {isEditMode ?
                  <span>{editableData.isFeatured ? 'Отменить скидку' : 'Сделать скидку 10%'}</span>
                  :
                  <span>{editableData.isFeatured ? 'Скидка 10%' : 'Скидки нет'}</span>
                }
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
