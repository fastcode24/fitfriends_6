import { Helmet } from "react-helmet-async";
import { GoBack, Header, OrderCard } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAuthUser, getOrders } from "../../store/selectors";
import { CoachOrder, CoachOrders, SortDirection, SortOrder, UserRole } from "../../types";
import { useEffect, useState } from "react";
import { AppRoute, DEFAULT_ORDERS_LIMIT } from "../../const";
import { fetchOrdersAction } from "../../store/api-actions";

export function MyOrdersPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(getAuthUser);
  const ordersData: CoachOrders | null = useAppSelector(getOrders);
  const orders: CoachOrder[] = ordersData ? ordersData.orders : [];
  const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.Down);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Quantity);
  const [visibleItems, setVisibleItems] = useState<number>(DEFAULT_ORDERS_LIMIT);
  const totalItems = ordersData?.totalItems || 0;

  useEffect(() => {
    if (authUser && authUser.role === UserRole.Coach) {
      dispatch(fetchOrdersAction({ limit: visibleItems, sort: sortDirection, sortOrder: sortOrder}));
    }
  }, [dispatch, authUser, visibleItems, sortOrder, sortDirection]);

  useEffect(() => {
    console.log(orders);
  }, [dispatch, authUser, orders]);

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + DEFAULT_ORDERS_LIMIT);
  };

  const handleSortClick = (order: SortOrder) => {
    setVisibleItems(DEFAULT_ORDERS_LIMIT);
    if (order === SortOrder.Cost) {
      if (sortOrder === SortOrder.Cost) {
        setSortDirection(sortDirection === SortDirection.Down ? SortDirection.Up : SortDirection.Down);
      } else {
        setSortOrder(SortOrder.Cost);
        setSortDirection(SortDirection.Down);
      }
    } else if (order === SortOrder.Quantity) {
      if (sortOrder === SortOrder.Quantity) {
        setSortDirection(sortDirection === SortDirection.Down ? SortDirection.Up : SortDirection.Down);
      } else {
        setSortOrder(SortOrder.Quantity);
        setSortDirection(SortDirection.Down);
      }
    }
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Мои заказы — FitFriends</title>
      </Helmet>
      <Header />
      <main>
        <section className="my-orders">
          <div className="container">
            <div className="my-orders__wrapper">
              <GoBack url={AppRoute.AccountCoach} />
              <div className="my-orders__title-wrapper">
                <h1 className="my-orders__title">Мои заказы</h1>
                <div className="sort-for">
                  <p>Сортировать по:</p>
                  <div className="sort-for__btn-container">
                    <button onClick={() => handleSortClick(SortOrder.Cost)} className="btn-filter-sort" type="button">
                      <span>Сумме</span>
                      <svg width="16" height="10" aria-hidden="true">
                        <use xlinkHref={sortDirection === SortDirection.Down ? '#icon-sort-down' : '#icon-sort-up'}></use>
                      </svg>
                    </button>
                    <button onClick={() => handleSortClick(SortOrder.Quantity)} className="btn-filter-sort" type="button">
                      <span>Количеству</span>
                      <svg width="16" height="10" aria-hidden="true">
                        <use xlinkHref={sortDirection === SortDirection.Down ? '#icon-sort-down' : '#icon-sort-up'}></use>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <ul className="my-orders__list">
                {orders.map((order) => (
                  <li key={order.training.id} className="my-orders__item">
                    <OrderCard order={order} />
                  </li>
                ))}
              </ul>
              <div className="show-more my-orders__show-more">
              {visibleItems < totalItems &&
                <button
                  className="btn show-more__button show-more__button--more"
                  type="button"
                  onClick={handleLoadMore}
                >
                  Показать еще
                </button>
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
