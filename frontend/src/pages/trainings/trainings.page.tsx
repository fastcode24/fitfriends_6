import { Helmet } from "react-helmet-async";
import { AppRoute, DEFAULT_ITEMS_LIMIT } from "../../const";
import { GoBack, Header, NoItems, ShowMore, TrainingCard, TrainingFilter } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getCatalogTrainings, getUser } from "../../store/selectors";
import { fetchTrainingsAction } from "../../store/api-actions";
import { useEffect, useState } from "react";
import { Filter, SortDirection, SortTrainings, SortType, Training, TrainingRequest, UserRole } from "../../types";
import { clearEmptyFields } from "../../utils";

export function TrainingsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const data = useAppSelector((getCatalogTrainings));
  const trainings: Training[] = data?.trainings || [];
  const totalItems = data?.totalItems || 0;
  const minPrice = data?.minPrice || 0;
  const maxPrice = data?.maxPrice || 0;
  const minCalories = data?.minCalories || 0;
  const maxCalories = data?.maxCalories || 0;
  const [visibleItems, setVisibleItems] = useState<number>(DEFAULT_ITEMS_LIMIT);
  const [sort, setSort] = useState<SortTrainings>(SortTrainings.Default);
  const [filter, setFilter] = useState<Filter>({
    priceFrom: undefined,
    priceTo: undefined,
    caloriesFrom: undefined,
    caloriesTo: undefined,
    ratingFrom: 0,
    ratingTo: 5,
    trainingType: [],
    trainingTime: [],
  });

  if (!user || !user.id) {
    return <div>Загрузка данных...</div>;
  }

  useEffect(() => {
    const cleanFilter = clearEmptyFields<Filter>(filter);
    if (user && user.id && user.role === UserRole.Coach) {
      dispatch(fetchTrainingsAction({ storeName: TrainingRequest.Catalog, limit: visibleItems, coachId: user.id, ...cleanFilter }));
    } else if (user && user.id && user.role === UserRole.Customer) {
      let sortType = SortType.Default;
      let sortDirection = SortDirection.Down;

      if (sort === SortTrainings.Cheap || sort === SortTrainings.Expensive) {
        sortType = SortType.Price;
      }

      if (sort === SortTrainings.Cheap) {
        sortDirection = SortDirection.Up;
      }

      dispatch(fetchTrainingsAction({ storeName: TrainingRequest.Catalog, limit: visibleItems, sort: sortDirection, sortType, ...cleanFilter }));
    }
  }, [dispatch, filter, user, user.id, visibleItems, sort]);

  return (
    <div className="wrapper">
      <Helmet>
        <title>Мои тренировки — FitFriends</title>
      </Helmet>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Мои тренировки</h1>
              <div className="my-training-form">
                <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
                <div className="my-training-form__wrapper">
                  <GoBack url={AppRoute.AccountCoach} />
                  <h3 className="my-training-form__title">фильтры</h3>
                  <TrainingFilter
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    minCalories={minCalories}
                    maxCalories={maxCalories}
                    filter={filter}
                    setFilter={setFilter}
                    sort={sort}
                    setSort={setSort}
                    user={user}
                    setVisibleItems={setVisibleItems}
                  />
                </div>
              </div>
              <div className="inner-page__content">
                <div className="my-trainings">
                  <ul className="my-trainings__list">
                    {trainings.length === 0 &&
                      <NoItems />
                    }
                    {trainings.map((training) => (
                      <li key={training.id} className="my-trainings__item">
                        <TrainingCard training={training} />
                      </li>
                    ))}
                  </ul>
                  {visibleItems < totalItems &&
                    <ShowMore setVisibleItems={setVisibleItems} />
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

