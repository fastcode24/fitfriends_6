import { useEffect, useState } from "react";
import { FullUser, Gender, Level, Metro, TrainingType, UserRole } from "../../types";
import './styles.css';
import { updateUserAction } from "../../store/api-actions";
import { useAppDispatch } from "../../hooks";
import { capitalizeFirst } from "../../utils";

type UserEditFormProps = {
  userInfo: FullUser;
};

export function UserEditForm({ userInfo }: UserEditFormProps): JSX.Element {
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [user, setUser] = useState<FullUser>(userInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('user:', user);
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevUserData => {
      if (prevUserData === null) {
        return prevUserData;
      }
      return { ...prevUserData, [name]: value };
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser(prevUserData => {
      if (prevUserData === null) {
        return prevUserData;
      }
      return { ...prevUserData, [name]: value };
    });
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setUser(prevUserData => {
      if (prevUserData === null) {
        return prevUserData;
      }
      return { ...prevUserData, isReady: checked };
    });
  };

  const trainingTypes = Object.values(TrainingType);

  const handleTrainingTypesChange = (type: TrainingType) => {
    setUser((prevUser) => {
      const isChecked = prevUser.trainingType.includes(type);
      let updatedTrainingType: TrainingType[];
      if (isChecked) {
        updatedTrainingType = prevUser.trainingType.filter(t => t !== type);
      } else {
        if (prevUser.trainingType.length >= 3) {
          return prevUser;
        }
        updatedTrainingType = [...prevUser.trainingType, type];
      }
      return {
         ...prevUser,
         trainingType: updatedTrainingType,
      };
    });
  };

  const toggleEditMode = () => {
    setEditMode(prevEditMode => !prevEditMode);
    if (isEditMode) {
      if (user.id) {
        dispatch(updateUserAction({id: user.id, updateData: user}));
      }
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUser(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  };

  return (
    <section className="user-info-edit">
      <div className="user-info-edit__header">
        <div className="input-load-avatar">
          <label>
            <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg" />
            <span className="input-load-avatar__avatar">
              <img src={user.avatar} srcSet={`${user.avatar} 2x`} width="98" height="98" alt={`Фото тренера ${user.name}`} />
            </span>
          </label>
        </div>
        <div className="user-info-edit__controls">
          <button className="user-info-edit__control-btn" aria-label="обновить">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-change"></use>
            </svg>
          </button>
          <button className="user-info-edit__control-btn" aria-label="удалить">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-trash"></use>
            </svg>
          </button>
        </div>
      </div>
      <form className="user-info-edit__form" action="#" method="post">
        <button onClick={toggleEditMode} className="btn-flat btn-flat--underlined user-info-edit__save-button" type="button" aria-label={isEditMode ? 'Сохранить' : 'Редактировать'}>
          {isEditMode ?
            <span>Сохранить</span>
          :
            <>
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-edit"></use>
              </svg>
              <span>Редактировать</span>
            </>
          }
        </button>
        <div className="user-info-edit__section">
          <h2 className="user-info-edit__title">Обо мне</h2>
          <div className={`custom-input user-info-edit__input ${!isEditMode && 'custom-input--readonly'}`}>
            <label>
              <span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input type="text" name="name" value={user.name || ''} onChange={handleInputChange} disabled={!isEditMode} />
              </span>
            </label>
          </div>
          <div className={`custom-textarea ${!isEditMode && 'custom-textarea--readonly user-info__textarea'}`}>
            <label>
              <span className="custom-textarea__label">Описание</span>
              <textarea
                name="description"
                placeholder=""
                onChange={handleTextareaChange}
                disabled={!isEditMode}
              >
                {user.description}
              </textarea>
            </label>
          </div>
        </div>
        <div className="user-info-edit__section user-info-edit__section--status">
          <h2 className="user-info-edit__title user-info-edit__title--status">Статус</h2>
          <div className="custom-toggle custom-toggle--switch user-info-edit__toggle">
            <label>
              <input onChange={handleToggleChange} type="checkbox" name="ready-for-training" checked={!!user.isReady} disabled={!isEditMode} />
              <span className="custom-toggle__icon">
                <svg width="9" height="6" aria-hidden="true">
                  <use xlinkHref="#arrow-check"></use>
                </svg>
              </span>
              <span className="custom-toggle__label">{`Готов${user.gender === Gender.Woman ? 'а' : ''} тренировать${user.role === UserRole.Customer ? 'ся' : ''}`}</span>
            </label>
          </div>
        </div>
        <div className="user-info-edit__section">
          <h2 className="user-info-edit__title user-info-edit__title--specialization">Специализация</h2>
          <div className="specialization-checkbox user-info-edit__specialization">
            {trainingTypes.map((type) => (
              <div key={type} className="btn-checkbox">
                <label>
                  <input
                    className="visually-hidden"
                    type="checkbox"
                    name="trainingType"
                    value={type}
                    checked={user.trainingType.includes(type)}
                    onChange={() => handleTrainingTypesChange(type)}
                    disabled={!isEditMode || (user.trainingType.length >= 3 && !user.trainingType.includes(type))}
                  />
                  <span className="btn-checkbox__btn">{type}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className={`${isEditMode ? 'user-info-edit__select' : 'custom-select--readonly user-info__select'}`}>
          <div className="custom-select__label-container">
            <span className="custom-select__label">Локация</span>
          </div>
          <div className="custom-select__container">
            <select
              name="metro"
              className="custom-select__button"
              value={user.metro ?? ''}
              id="metro"
              onChange={handleSelectChange}
              disabled={!isEditMode}
            >
              {Object.values(Metro).map((value, index) => (
                <option key={`metro_${index}`} value={value}>{capitalizeFirst(value)}</option>
              ))}
            </select>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </span>
          </div>
        </div>
        <div className={`${isEditMode ? 'user-info-edit__select' : 'custom-select--readonly user-info__select'}`}>
          <div className="custom-select__label-container">
            <span className="custom-select__label">Пол</span>
          </div>
          <div className="custom-select__container">
            <select
              name="gender"
              className="custom-select__button"
              value={user.gender ?? ''}
              id="gender"
              onChange={handleSelectChange}
              disabled={!isEditMode}
            >
              {Object.values(Gender).map((value, index) => (
                <option key={`gender_${index}`} value={value}>{capitalizeFirst(value)}</option>
              ))}
            </select>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </span>
          </div>
        </div>
        <div className={`${isEditMode ? 'user-info-edit__select' : 'custom-select--readonly user-info__select'}`}>
          <div className="custom-select__label-container">
            <span className="custom-select__label">Уровень</span>
          </div>
          <div className="custom-select__container">
            <select
              name="level"
              className="custom-select__button"
              value={user.level ?? ''}
              id="level"
              onChange={handleSelectChange}
              disabled={!isEditMode}
            >
              {Object.values(Level).map((value, index) => (
                <option key={`level${index}`} value={value}>{capitalizeFirst(value)}</option>
              ))}
            </select>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </span>
          </div>
        </div>
      </form>
    </section>
  );
}
