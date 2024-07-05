import {Helmet} from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './styles.css';

export function NotFoundPage(): JSX.Element {

  return (
    <>
      <Helmet><title>Страница не найдена | Fitfriends 2024</title></Helmet>
      <main className="page-content">
        <div className="container">
          <section className="error">
            <h1 className="error__title">404</h1><span className="error__subtitle">Страница не найдена.</span>
            <p className="error__text"> Возможно, страница была удалена или её вовсе не существовало.</p>
              <div className="buttons404Container">
                <Link to="/login">
                  <button className="button button__error button--small button--black-border buttons404">Войти</button>
                </Link>
                <Link to="/register">
                  <button className="button button__error button--small button--black-border buttons404">Зарегистрироваться</button>
                </Link>
              </div>
          </section>
        </div>
      </main>
    </>
  );
}
