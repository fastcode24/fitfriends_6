import { Helmet } from "react-helmet-async";
import { Header } from "../../components";
import { useNavigate } from "react-router-dom";
import { Gender, Level, Training, TrainingTime, TrainingType } from "../../types";
import { useEffect, useState } from "react";
import { capitalizeFirst, handleInputChange, handleSelectChange, handleTextareaChange } from "../../utils";
import { createTrainingAction } from "../../store/api-actions";
import { useAppDispatch } from "../../hooks";
import { AppRoute } from "../../const";
import './styles.css';

interface FormError {
  title: string | null;
  level: string | null;
  trainingType: string | null;
  trainingTime: string | null;
  price: string | null;
  calories: string | null;
  description: string | null;
  gender: string | null;
}

export function CreateTrainingPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [result, setResult] = useState<string | null>(null);
  const [training, setTraining] = useState<Training>({
    title: '',
    background:  '/mock-images/training-image/training.jpg',
    level: Level.Amateur,
    trainingType: TrainingType.Aerobics,
    trainingTime: TrainingTime.Short,
    price: 0,
    calories: 1000,
    description: '',
    gender: Gender.Unknown,
    video: '/mock-images/training-video/training.mp4',
    isFeatured: false
  });
  const [error, setError] = useState<FormError>({
    title: null,
    level: null,
    trainingType: null,
    trainingTime: null,
    price: null,
    calories: null,
    description: null,
    gender: null
  });

  useEffect(() => {
    setError(validate(training));
  }, [training]);

  const validate = (training: Training): FormError => {
    const errors: FormError = {
      title: training.title.length < 1 || training.title.length > 15 ? 'От 1 до 15 символов' : null,
      level: !Object.values(Level).includes(training.level) ? 'Уровень тренировки не соответствует доступным вариантам' : null,
      trainingType: !Object.values(TrainingType).includes(training.trainingType) ? 'Тип тренировки не соответствует доступным вариантам' : null,
      trainingTime: !Object.values(TrainingTime).includes(training.trainingTime) ? 'Длительность тренировки не соответствует доступным вариантам' : null,
      price: isNaN(training.price) || training.price < 0 ? 'Целое положительное число или 0 если бесплатно' : null,
      calories: isNaN(training.calories) || training.calories < 1000 || training.calories > 5000 ? 'Целое число от 1000 до 5000' : null,
      description: training.description.length < 10 || training.description.length > 140 ? 'От 10 до 140 символов' : null,
      gender: !Object.values(Gender).includes(training.gender) ? 'Выбраный пол участников тренировки не соответствует доступным вариантам' : null,
    };
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(validate(training));
    const hasErrors = Object.values(error).some(value => value !== null)

    if (!hasErrors) {
      try {
        dispatch(createTrainingAction(training));
        setResult('Тренировка опубликована!');

        setTimeout(() => {
          setResult(null);
          navigate(AppRoute.AccountCoach);
        }, 1200);
      } catch (error) {
        setResult('Ошибка при создании тренировки');

        setTimeout(() => {
          setResult(null);
        }, 1200);
      }
    }
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Создать тренировку</title>
      </Helmet>
      <Header />
      <main>
        <div className="popup-form popup-form--create-training">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Создание тренировки</h1>
              </div>
              <div className="popup-form__form">
                <form method="get">
                  <div className="create-training">
                    <div className="create-training__wrapper">
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Название тренировки</h2>
                        <div className="custom-input create-training__input">
                          <label>
                            <span className="custom-input__wrapper">
                              <input
                                type="text"
                                name="title"
                                maxLength={15}
                                value={training.title}
                                onChange={(e) => handleInputChange(setTraining, e)}
                              />
                            </span>
                          </label>
                        </div>
                        <span className="error__message">{error.title}</span>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Характеристики тренировки</h2>
                        <div className="create-training__info">
                          <div className="custom-select__container">
                            <span className="custom-select__label">Выберите тип тренировки</span>
                            <span className="custom-input__wrapper">
                              <select
                                name="trainingType"
                                className="custom-select__button"
                                aria-label="Выберите одну из опций"
                                value={training.trainingType ?? ''}
                                onChange={(e) => handleSelectChange(setTraining, e)}
                              >
                                {Object.values(TrainingType).map((value, index) => (
                                  <option key={`training_type_${index}`} value={value}>{capitalizeFirst(value)}</option>
                                ))}
                              </select>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-down"></use>
                                </svg>
                              </span>
                            </span>
                            <span className="error__message">{error.trainingType}</span>
                          </div>
                          <div className="custom-input custom-input--with-text-right">
                            <label>
                              <span className="custom-input__label">Сколько калорий потратим</span>
                              <span className="custom-input__wrapper">
                                <input
                                  type="number"
                                  name="calories"
                                  value={training.calories}
                                  onChange={(e) => handleInputChange(setTraining, e)}
                                />
                                <span className="custom-input__text">ккал</span>
                              </span>
                              <span className="error__message">{error.calories}</span>
                            </label>
                          </div>
                          <div className="custom-select__container">
                            <span className="custom-select__label">Сколько времени потратим</span>
                            <span className="custom-input__wrapper">
                              <select
                                name="trainingTime"
                                className="custom-select__button"
                                aria-label="Выберите одну из опций"
                                value={training.trainingTime ?? ''}
                                onChange={(e) => handleSelectChange(setTraining, e)}
                              >
                                {Object.values(TrainingTime).map((value, index) => (
                                  <option key={`training_time_${index}`} value={value}>{capitalizeFirst(value)}</option>
                                ))}
                              </select>
                              <span className="custom-select__text"></span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-down"></use>
                                </svg>
                              </span>
                            </span>
                            <span className="error__message">{error.trainingTime}</span>
                          </div>
                          <div className="custom-input custom-input--with-text-right">
                            <label>
                              <span className="custom-input__label">Стоимость тренировки</span>
                              <span className="custom-input__wrapper">
                                <input
                                  type="number"
                                  name="price"
                                  value={training.price}
                                  onChange={(e) => handleInputChange(setTraining, e)}
                                />
                                <span className="custom-input__text">₽</span>
                              </span>
                              <span className="error__message">{error.price}</span>
                            </label>
                          </div>
                          <div className="custom-select__container">
                            <span className="custom-select__label">Выберите уровень тренировки</span>
                            <span className="custom-input__wrapper">
                              <select
                                name="level"
                                className="custom-select__button"
                                aria-label="Выберите одну из опций"
                                value={training.level ?? ''}
                                onChange={(e) => handleSelectChange(setTraining, e)}
                              >
                                {Object.values(Level).map((value, index) => (
                                  <option key={`level_${index}`} value={value}>{capitalizeFirst(value)}</option>
                                ))}
                              </select>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-down"></use>
                                </svg>
                              </span>
                            </span>
                            <span className="error__message">{error.level}</span>
                          </div>
                          <div className="create-training__radio-wrapper">
                            <span className="create-training__label">Кому подойдет тренировка</span>
                            <br />
                            <div className="custom-toggle-radio create-training__radio">
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input
                                    type="radio"
                                    name="gender"
                                    value={Gender.Man}
                                    onChange={(e) => handleInputChange(setTraining, e)}
                                    checked={training.gender === Gender.Man}
                                  />
                                  <span className="custom-toggle-radio__icon"></span>
                                  <span className="custom-toggle-radio__label">Мужчинам</span>
                                </label>
                              </div>
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input
                                    type="radio"
                                    name="gender"
                                    value={Gender.Woman}
                                    onChange={(e) => handleInputChange(setTraining, e)}
                                    checked={training.gender === Gender.Woman}
                                  />
                                  <span className="custom-toggle-radio__icon"></span>
                                  <span className="custom-toggle-radio__label">Женщинам</span>
                                </label>
                              </div>
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input
                                    type="radio"
                                    name="gender"
                                    value={Gender.Unknown}
                                    onChange={(e) => handleInputChange(setTraining, e)}
                                    checked={training.gender === Gender.Unknown}
                                  />
                                  <span className="custom-toggle-radio__icon"></span>
                                  <span className="custom-toggle-radio__label">Всем</span>
                                </label>
                              </div>
                              <span className="error__message">{error.gender}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Описание тренировки</h2>
                        <div className="custom-textarea create-training__textarea">
                          <label>
                            <textarea
                              name="description"
                              placeholder=" "
                              maxLength={140}
                              onChange={(e) => handleTextareaChange(setTraining, e)}
                            >
                              {training.description}
                            </textarea>
                            <span className="error__message">{error.description}</span>
                          </label>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Загрузите изображение тренировки</h2>
                        <div className="drag-and-drop create-training__drag-and-drop">
                          <label><span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата JPG, PNG или WEBP
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import-photo"></use>
                              </svg></span>
                            <input type="file" name="import" tabIndex={-1} accept=".jpg, .png, .webp" />
                          </label>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Загрузите видео-тренировку</h2>
                        <div className="drag-and-drop create-training__drag-and-drop">
                          <label><span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата MOV, AVI или MP4
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import-video"></use>
                              </svg></span>
                            <input type="file" name="import" tabIndex={-1} accept=".mov, .avi, .mp4" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn create-training__button"
                      type="button"
                      onClick={handleSubmit}
                      disabled={Object.values(error).some(value => value !== null)}
                    >
                      Опубликовать
                    </button>
                    <p className="result__message">{result}</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
