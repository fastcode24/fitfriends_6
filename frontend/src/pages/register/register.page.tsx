import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { AppRoute, AuthorizationStatus } from "@/const";
import { capitalizeFirst, handleInputChange, handleSelectChange, handleSingleCheckboxChange, validateRegData } from "@utils";
import { CreateUser, Gender, Metro, UserRole, RegUserRole, AuthData } from "@types";
import { fileUploadService } from "@services/file-storage-service";
import { registerUserService } from "@services/register-user-service";
import { useAppDispatch, useAppSelector } from "@hooks";
import { getAuthorizationStatus } from "@store/selectors";
import { loginAction } from "@store/api-actions";
import './styles.css';

export function RegisterPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [isUserAgreement, setIsUserAgreement] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<CreateUser>({
    name: "",
    email: "",
    password: "",
    avatar: "",
    birthday: "",
    metro: Metro.Sportivnaya,
    gender: Gender.Unknown,
    role: UserRole.Customer
  });
  const [error, setError] = useState<Record<keyof CreateUser, string | null>>({
    name: null,
    email: null,
    password: null,
    avatar: null,
    birthday: null,
    metro: null,
    gender: null,
    role: null
  });

  const roleLabels: Record<RegUserRole, { text: string; icon: string }> = {
    [UserRole.Coach]: {
      text: "Я хочу тренировать",
      icon: "#icon-cup"
    },
    [UserRole.Customer]: {
      text: "Я хочу тренироваться",
      icon: "#icon-weight"
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      try {
        const response = await fileUploadService(file);
        setNewUser((prevUser) => ({
          ...prevUser,
          avatar: response.path
        }));

        const objectUrl = URL.createObjectURL(file);
        setAvatarPreview(objectUrl);
      } catch (error) {
        console.error('Error uploading file');
      }
    }
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser((prevNewUser) => ({
      ...prevNewUser,
      [name]: value
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid) {
      try {
        await registerUserService(newUser);
        if (newUser.role === UserRole.Customer) {
          setResultMessage('Успешная регистрация! Готовлю опросник...');
        } else {
          setResultMessage('Успешная регистрация!');
        }

        setTimeout(() => {
          if (authorizationStatus !== AuthorizationStatus.Auth) {
            const authData: AuthData = { email: newUser.email, password: newUser.password};
            dispatch(loginAction(authData));
          }

          if (newUser.role === UserRole.Customer) {
            navigate(AppRoute.QuestionnaireCustomer);
          } else {
            navigate(AppRoute.AccountCoach);
          }
        }, 2000);
      } catch (error) {
        if (error instanceof Error) {
          setResultMessage(`Ошибка при регистрации: ${error.message}`);
          console.error('Ошибка при регистрации:', error.message);
        }
      }

    }
  };

  const handleButtonSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const form = event.currentTarget.closest('form');
    if (form) {
      handleSubmit({ ...event, currentTarget: form, preventDefault: event.preventDefault } as FormEvent<HTMLFormElement>);
    }
  };

  const validateAndSetForm = () => {
    const newErrors = validateRegData(newUser);
    setError(newErrors);

    if (Object.values(newErrors).some((error) => error !== null) || !isUserAgreement) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  };

  useEffect(() => {
    validateAndSetForm();
  }, [newUser, isUserAgreement]);

  return (
    <div className="wrapper">
      <Helmet>
        <title>Зарегистрироваться</title>
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
        <div className="popup-form popup-form--sign-up">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Регистрация</h1>
              </div>
              <div className="popup-form__form">
                <form method="get">
                  <div className="sign-up">
                    <div className="sign-up__load-photo">
                      <div className="input-load-avatar">
                        <label>
                          <input
                            className="visually-hidden"
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={handleFileChange}
                          />
                          <span className="input-load-avatar__btn">
                            {avatarPreview
                              ?
                              <img src={avatarPreview} alt="Предпросмотр аватара" />
                              :
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import"></use>
                              </svg>
                            }
                          </span>
                        </label>
                      </div>
                      <div className="sign-up__description">
                        <h2 className="sign-up__legend">Загрузите фото профиля</h2>
                        <span className="sign-up__text">JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
                      </div>
                    </div>
                    <div className="sign-up__data">
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">Имя</span>
                          <span className="custom-input__wrapper">
                            <input
                              type="text"
                              name="name"
                              maxLength={15}
                              value={newUser.name}
                              onChange={(e) => handleInputChange(setNewUser, e)}
                            />
                          </span>
                        </label>
                        <div className="error__message">{error.name}</div>
                      </div>
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">E-mail</span>
                          <span className="custom-input__wrapper">
                            <input
                              type="email"
                              name="email"
                              value={newUser.email}
                              onChange={(e) => handleInputChange(setNewUser, e)}
                            />
                          </span>
                        </label>
                        <div className="error__message">{error.email}</div>
                      </div>
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">Дата рождения</span>
                          <span className="custom-input__wrapper">
                            <input
                              type="date"
                              name="birthday"
                              max="2024-12-31"
                              value={newUser.birthday}
                              onChange={(e) => handleInputChange(setNewUser, e)}
                            />
                          </span>
                        </label>
                        <div className="error__message">{error.birthday}</div>
                      </div>
                      <div className="custom-select__container">
                        <span className="custom-select__label">Ваша локация</span>
                        <span className="custom-input__wrapper">
                          <select
                            name="metro"
                            className="custom-select__button"
                            aria-label="Выберите одну из опций"
                            value={newUser.metro ?? ''}
                            onChange={(e) => handleSelectChange(setNewUser, e)}
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
                        </span>
                      </div>
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">Пароль</span>
                          <span className="custom-input__wrapper">
                            <input
                                type="password"
                                name="password"
                                maxLength={12}
                                autoComplete="off"
                                value={newUser.password}
                                onChange={(e) => handleInputChange(setNewUser, e)}
                              />
                          </span>
                        </label>
                        <div className="error__message">{error.password}</div>
                      </div>
                      <div className="sign-up__radio">
                        <span className="sign-up__label">Пол</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big">
                          {Object.values(Gender).map((value) => (
                            <div key={`gender_${value}`} className="custom-toggle-radio__block">
                              <label>
                                <input
                                  onChange={handleRadioChange}
                                  type="radio"
                                  name="gender"
                                  value={value}
                                  checked={newUser.gender === value}
                                />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label">{capitalizeFirst(value)}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="sign-up__role">
                      <h2 className="sign-up__legend">Выберите роль</h2>
                      <div className="role-selector sign-up__role-selector">
                        {Object.values(UserRole)
                          .filter((value) => value !== UserRole.Unknown)
                          .map((value) => (
                            <div key={`role_${value}`} className="role-btn">
                              <label>
                                <input
                                  onChange={handleRadioChange}
                                  className="visually-hidden"
                                  type="radio"
                                  name="role"
                                  value={value}
                                  checked={newUser.role === value}
                                />
                                <span className="role-btn__icon">
                                  <svg width="12" height="13" aria-hidden="true">
                                    <use xlinkHref={roleLabels[value as RegUserRole].icon}></use>
                                  </svg>
                                </span>
                                <span className="role-btn__btn">{roleLabels[value as RegUserRole].text}</span>
                              </label>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <div className="sign-up__checkbox">
                      <label>
                        <input
                          type="checkbox"
                          name="user-agreement"
                          checked={isUserAgreement}
                          onChange={(e) => handleSingleCheckboxChange(setIsUserAgreement, e)}
                        />
                        <span className="sign-up__checkbox-icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="sign-up__checkbox-label">Я соглашаюсь с <span>политикой конфиденциальности</span> компании</span>
                      </label>
                    </div>
                      <button
                        onClick={handleButtonSubmit}
                        className="btn sign-up__button"
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
