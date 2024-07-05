import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AuthorizationStatus } from "../../const";
import { ChangeEvent, FormEvent, useState } from "react";
import { getAuthorizationStatus } from "../../store/selectors";
import { AuthData } from "../../types";
import { loginAction } from "../../store/api-actions/auth/auth-actions";

export function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      const authData: AuthData = { email, password };
      dispatch(loginAction(authData));
    }
  };

  const handleEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };


  return (
    <div className="wrapper">
      <Helmet>
        <title>Войти</title>
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
        <div className="popup-form popup-form--sign-in">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Вход</h1>
              </div>
              <div className="popup-form__form">
                <form onSubmit={handleSubmit}>
                  <div className="sign-in">
                    <div className="custom-input sign-in__input">
                      <label><span className="custom-input__label">E-mail</span><span className="custom-input__wrapper">
                          <input type="email" name="email" onChange={handleEmailChange} value={email} /></span>
                      </label>
                    </div>
                    <div className="custom-input sign-in__input">
                      <label><span className="custom-input__label">Пароль</span><span className="custom-input__wrapper">
                          <input type="password" name="password" onChange={handlePasswordChange} value={password} /></span>
                      </label>
                    </div>
                    <button className="btn sign-in__button" type="submit">Продолжить</button>
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


