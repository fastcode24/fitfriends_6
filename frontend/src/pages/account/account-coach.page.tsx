import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AppRoute } from "@/const";
import { Certificates, Header, UserEditForm } from "@components";
import { useAppSelector } from "@hooks";
import { getUser } from "@store/selectors";
import { useEffect } from "react";

export function AccountCoachPage(): JSX.Element {
  const user = useAppSelector(getUser);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Личный кабинет тренера</title>
      </Helmet>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <UserEditForm userInfo={user} />
              <div className="inner-page__content">
                <div className="personal-account-coach">
                  <div className="personal-account-coach__navigation">
                    <Link to={AppRoute.Trainings} className="thumbnail-link thumbnail-link--theme-light">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-flash"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои тренировки</span>
                    </Link>
                    <Link to={AppRoute.CreateTraining} className="thumbnail-link thumbnail-link--theme-light">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-add"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Создать тренировку</span>
                    </Link>
                    <Link to={AppRoute.Friends} className="thumbnail-link thumbnail-link--theme-light">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-friends"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Мои друзья</span>
                    </Link>
                    <Link to={AppRoute.Orders} className="thumbnail-link thumbnail-link--theme-light">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-bag"></use>
                        </svg>
                      </div><span className="thumbnail-link__text">Мои заказы</span>
                    </Link>
                    <div className="personal-account-coach__calendar">
                      <div className="thumbnail-spec-gym">
                      <div className="thumbnail-spec-gym__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x" />
                          <img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
                        </picture>
                      </div>
                      <div className="thumbnail-spec-gym__header" style={{ textAlign: 'center' }}>
                        <h3 className="thumbnail-spec-gym__title">Скоро тут будет интересно</h3>
                      </div>
                    </div>
                  </div>
                  </div>
                  <Certificates user={user} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
