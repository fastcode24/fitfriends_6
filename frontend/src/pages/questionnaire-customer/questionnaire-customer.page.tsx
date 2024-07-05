import { Helmet } from "react-helmet-async";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks";
import { Level, TrainingTime, TrainingType } from "@types";
import { capitalizeFirst, handleCheckboxChange, handleInputChange, validateQuestionnaire } from "@utils";
import { AppRoute } from "@/const";
import './styles.css';
import { updateUserAction } from "@/store/api-actions";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "@store/selectors";

export interface Questionnaire {
  trainingType: TrainingType[];
  trainingTime: TrainingTime;
  level: Level;
  caloriesPerDay: number;
  calories: number;
}

export function QuestionnaireCustomerPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authUserId = useAppSelector(getAuthUser).id;
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [questionnaire, setQuestionnaire] = useState<Questionnaire>({
    trainingType: [],
    trainingTime: TrainingTime.Short,
    level: Level.Amateur,
    caloriesPerDay: 0,
    calories: 0
  });
  const [error, setError] = useState<Record<keyof Questionnaire, string | null>>({
    trainingType: null,
    trainingTime: null,
    level: null,
    caloriesPerDay: null,
    calories: null
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (authUserId) {
      if (isFormValid) {
        try {
          dispatch(updateUserAction({id: authUserId, updateData: questionnaire}));
          setResultMessage('Данные опросника сохранены! Перехожу на главную...');

          setTimeout(() => {
            navigate(AppRoute.Main);
          }, 2000);
        } catch (error) {
          if (error instanceof Error) {
            setResultMessage(`Ошибка: ${error.message}`);
            console.error('Ошибка:', error.message);
          }
        }
      } else {
        setResultMessage('Форма заполнена неверно. Пожалуйста, исправьте ошибки.');
      }
    } else {
      setResultMessage('Вы не авторизированы! Перехожу на стрианицу авторизации...');
      setTimeout(() => {
        navigate(AppRoute.Login);
      }, 2000);
    }
  };

  const handleButtonSubmit= (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const form = event.currentTarget.closest('form');
    if (form) {
      handleSubmit({ ...event, currentTarget: form, preventDefault: event.preventDefault } as FormEvent<HTMLFormElement>);
    }
  };

  const validateAndSetForm = () => {
    const newErrors = validateQuestionnaire(questionnaire);
    setError(newErrors);

    if (Object.values(newErrors).some((error) => error !== null)) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  };

  useEffect(() => {
    validateAndSetForm();
    console.log('questionnaire:', questionnaire);
    console.log('errors:', error);
    console.log('authUserId:', authUserId);
  }, [questionnaire]);

  return (
    <div className="wrapper">
      <Helmet>
        <title>Опросник — FitFriends</title>
      </Helmet>
      <main>
        <div className="background-logo">
          <svg className="background-logo__logo" width="750" height="284" aria-hidden="true">
            <use xlinkHref="#logo-big"></use>
          </svg>
          <svg className="background-logo__icon" width="343" height="343" aria-hidden="true">
            <use xlinkHref="#icon-logotype"></use>
          </svg>
        </div>
        <div className="popup-form popup-form--questionnaire-user">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__form">
                <form method="get">
                  <div className="questionnaire-user">
                    <h1 className="visually-hidden">Опросник</h1>
                    <div className="questionnaire-user__wrapper">
                      <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
                        <div className="specialization-checkbox questionnaire-user__specializations">
                          {Object.values(TrainingType).map((value) => (
                            <div key={`trainingType_${value}`} className="btn-checkbox">
                              <label>
                                <input
                                  className="visually-hidden"
                                  type="checkbox"
                                  name="trainingType"
                                  value={value}
                                  onChange={(e) => handleCheckboxChange(setQuestionnaire, e)}
                                  checked={questionnaire.trainingType?.includes(value) || false}
                                />
                                <span className="btn-checkbox__btn">{capitalizeFirst(value)}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                        <div className="error__message">{error.trainingType}</div>
                      </div>
                      <div className="questionnaire-user__block">
                        <span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                          {Object.values(TrainingTime).map((value) => (
                            <div key={`trainingTime_${value}`} className="custom-toggle-radio__block">
                              <label>
                                <input
                                    onChange={(e) => handleInputChange(setQuestionnaire, e)}
                                    type="radio"
                                    name="trainingTime"
                                    value={value}
                                    checked={questionnaire.trainingTime === value}
                                  />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label">{value}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                        <div className="error__message">{error.trainingTime}</div>
                      </div>
                      <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваш уровень</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                          {Object.values(Level).map((value) => (
                            <div key={`level_${value}`} className="custom-toggle-radio__block">
                              <label>
                                <input
                                  onChange={(e) => handleInputChange(setQuestionnaire, e)}
                                  type="radio"
                                  name="level"
                                  value={value}
                                  checked={questionnaire.level === value}
                                />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label">{capitalizeFirst(value)}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                        <div className="error__message">{error.level}</div>
                      </div>
                      <div className="questionnaire-user__block">
                        <div className="questionnaire-user__calories-lose"><span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
                          <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                            <label>
                              <span className="custom-input__wrapper">
                                <input
                                  type="number"
                                  name="calories"
                                  value={questionnaire.calories}
                                  onChange={(e) => handleInputChange(setQuestionnaire, e)}
                                />
                                <span className="custom-input__text">ккал</span>
                              </span>
                            </label>
                            <div className="error__message">{error.calories}</div>
                          </div>
                        </div>
                        <div className="questionnaire-user__calories-waste"><span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
                          <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                            <label>
                              <span className="custom-input__wrapper">
                                <input
                                  type="number"
                                  name="caloriesPerDay"
                                  value={questionnaire.caloriesPerDay}
                                  onChange={(e) => handleInputChange(setQuestionnaire, e)}
                                />
                                <span className="custom-input__text">ккал</span>
                              </span>
                            </label>
                            <div className="error__message">{error.caloriesPerDay}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleButtonSubmit}
                      className="btn questionnaire-user__button"
                      type="submit"
                      disabled={!isFormValid}
                    >
                      Продолжить
                    </button>
                    <div className="result__message">{resultMessage}</div>
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
