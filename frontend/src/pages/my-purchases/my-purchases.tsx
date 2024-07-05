import { Helmet } from "react-helmet-async";
import { Header, TrainingCard } from "../../components";
import { Link } from "react-router-dom";
import { AppRoute, DEFAULT_ITEMS_LIMIT } from "../../const";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getBalance } from "../../store/selectors";
import { SingleBalance } from "../../types";
import { fetchBalanceAction } from "../../store/api-actions";
import { useEffect, useState } from "react";

export function MyPurchasesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const data = useAppSelector((getBalance));
  const balances: SingleBalance[] = data?.balances || [];
  const totalPurchases = data?.totalItems || 0;
  const [purchases, setPurchases] = useState<SingleBalance[] | null>(null);
  const [visiblePurchases, setVisiblePurchases] = useState<number>(DEFAULT_ITEMS_LIMIT);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchBalanceAction({limit: visiblePurchases, isActive}));
  }, [dispatch, isActive, visiblePurchases]);

  useEffect(() => {
    setPurchases(balances);
  }, [balances, isActive, visiblePurchases]);

  if (!purchases) {
    return <div>Loading user data...</div>;
  }

  const handleActivechange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.checked) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  const handleLoadMore = () => {
    setVisiblePurchases((prev) => prev + DEFAULT_ITEMS_LIMIT);
  };

  return (
    <div className="wrapper">
      <Helmet>
        <title>Личный кабинет тренера</title>
      </Helmet>
      <Header />
      <main>
        <section className="my-purchases">
          <div className="container">
            <div className="my-purchases__wrapper">
              <Link to={AppRoute.AccountCustomer}>
                <button className="btn-flat my-purchases__back" type="button">
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlinkHref="#arrow-left"></use>
                  </svg><span>Назад</span>
                </button>
              </Link>
              <div className="my-purchases__title-wrapper">
                <h1 className="my-purchases__title">Мои покупки</h1>
                <div className="my-purchases__controls">
                  <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch" data-validate-type="checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="setActive"
                        onChange={handleActivechange}
                      />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg></span>
                        <span className="custom-toggle__label">Только активные</span>
                    </label>
                  </div>
                </div>
              </div>
              <ul className="my-purchases__list">
                {purchases.map((purchase) => (
                  <li key={purchase.training.id} className="my-purchases__item">
                    <TrainingCard training={purchase.training} />
                  </li>
                ))}
              </ul>
              <div className="show-more my-purchases__show-more">
                {visiblePurchases < totalPurchases &&
                    <button onClick={handleLoadMore} className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                }
                <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
