import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header, ShowMore, UserCatalogCard } from "../../components";
import { AppRoute, DEFAULT_ITEMS_LIMIT } from "../../const";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUsers } from "../../store/selectors";
import { fetchUsersAction } from "../../store/api-actions";
import { Level, TrainingType, UserRole, UsersFilterParams } from "../../types";
import { capitalizeFirst, removeNullFields } from "../../utils";

export function UsersPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const usersData = useAppSelector(getUsers);
  const users = usersData?.users || [];
  const totalItems = usersData?.totalItems || 0;
  const [visibleItems, setVisibleItems] = useState<number>(DEFAULT_ITEMS_LIMIT);
  const VISIBLE_TYPES = 5;
  const [trainingTypes, setTrainingTypes] = useState(Object.values(TrainingType).slice(0, VISIBLE_TYPES));
  const [showTypes, setShowTypes] = useState(false);
  const [filter, setFilter] = useState<UsersFilterParams>({
    limit: visibleItems,
    trainingType: undefined,
    level: undefined,
    role: undefined,
  });

  useEffect(() => {
    const params = removeNullFields<UsersFilterParams>(filter);
    dispatch(fetchUsersAction(params));
  }, [dispatch, filter, visibleItems]);

  const handleShowTypes = () => {
    setShowTypes(!showTypes);
    if (showTypes) {
      setTrainingTypes(Object.values(TrainingType).slice(0, 5));
      return;
    }
    setTrainingTypes(Object.values(TrainingType));
  };

  const handleTrainingTypesChange = (type: TrainingType) => {
    setFilter(prevFilter => {
      const newTrainingTypes = prevFilter.trainingType ? [...prevFilter.trainingType] : [];
      if (newTrainingTypes.includes(type)) {
        return {
          ...prevFilter,
          trainingType: newTrainingTypes.filter(t => t !== type),
          limit: DEFAULT_ITEMS_LIMIT,
        };
      } else {
        return {
          ...prevFilter,
          trainingType: [...newTrainingTypes, type],
          limit: DEFAULT_ITEMS_LIMIT,
        };
      }
    });
  };

  const handleLevelChange = (level: Level) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      level,
      limit: DEFAULT_ITEMS_LIMIT,
    }));
  };

  const handleRoleChange = (role: UserRole) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      role,
      limit: DEFAULT_ITEMS_LIMIT,
    }));
  };

  if (!usersData) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Каталог пользователей — FitFriends</title>
      </Helmet>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог пользователей</h1>
              <div className="user-catalog-form">
                <h2 className="visually-hidden">Каталог пользователя</h2>
                <div className="user-catalog-form__wrapper">
                  <Link to={AppRoute.Main}>
                    <button className="btn-flat btn-flat--underlined user-catalog-form__btnback" type="button">
                      <svg width="14" height="10" aria-hidden="true">
                        <use xlinkHref="#arrow-left"></use>
                      </svg>
                      <span>Назад</span>
                    </button>
                  </Link>
                  <h3 className="user-catalog-form__title">Фильтры</h3>
                  <form className="user-catalog-form__form">
                    <div className="user-catalog-form__block user-catalog-form__block--location">
                      <h4 className="user-catalog-form__block-title">Локация, станция метро</h4>
                      <ul className="user-catalog-form__check-list">
                        <li className="user-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="user-agreement-1" name="user-agreement" checked />
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Автово</span>
                            </label>
                          </div>
                        </li>
                        <li className="user-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="user-agreement-1" name="user-agreement" checked />
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Адмиралтейская</span>
                            </label>
                          </div>
                        </li>
                        <li className="user-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="user-agreement-1" name="user-agreement" checked />
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Академическая</span>
                            </label>
                          </div>
                        </li>
                        <li className="user-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="user-agreement-1" name="user-agreement" />
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Балтийская</span>
                            </label>
                          </div>
                        </li>
                        <li className="user-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="user-agreement-1" name="user-agreement" />
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Бухарестская</span>
                            </label>
                          </div>
                        </li>
                      </ul>
                      <button className="btn-show-more user-catalog-form__btn-show" type="button">
                        <span>Посмотреть все</span>
                        <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </button>
                    </div>
                    <div className="user-catalog-form__block user-catalog-form__block--spezialization">
                      <h4 className="user-catalog-form__block-title">Специализация</h4>
                      <ul className="user-catalog-form__check-list">
                        {trainingTypes.map((type) => (
                          <li key={type} className="user-catalog-form__check-list-item">
                            <div className="custom-toggle custom-toggle--checkbox">
                              <label>
                                <input
                                  type="checkbox"
                                  value={type}
                                  name={type}
                                  checked={filter.trainingType?.includes(type) || false}
                                  onChange={() => handleTrainingTypesChange(type)}
                                />
                                <span className="custom-toggle__icon">
                                  <svg width="9" height="6" aria-hidden="true">
                                    <use xlinkHref="#arrow-check"></use>
                                  </svg>
                                </span>
                                <span className="custom-toggle__label">{capitalizeFirst(type)}</span>
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                      {!showTypes &&
                        <button onClick={handleShowTypes} className="btn-show-more user-catalog-form__btn-show" type="button">
                          <span>Посмотреть все</span>
                          <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
                            <use xlinkHref="#arrow-down"></use>
                          </svg>
                        </button>
                      }
                    </div>
                    <div className="user-catalog-form__block user-catalog-form__block--level">
                      <h4 className="user-catalog-form__block-title">Уровень</h4>
                      <div className="custom-toggle-radio">
                        {Object.values(Level).map((level) => (
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input
                                type="radio"
                                name="level"
                                value={level}
                                checked={filter.level === level}
                                onChange={() => handleLevelChange(level)}
                              />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">{level}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="user-catalog-form__block">
                      <div className="btn-radio-sort">
                        <label>
                          <input
                            type="radio"
                            name="sort"
                            value={UserRole.Coach}
                            checked={filter.role === UserRole.Coach}
                            onChange={() => handleRoleChange(UserRole.Coach)}
                          />
                          <span className="btn-radio-sort__label">Тренеры</span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="sort"
                            value={UserRole.Customer}
                            checked={filter.role === UserRole.Customer}
                            onChange={() => handleRoleChange(UserRole.Customer)}
                          />
                          <span className="btn-radio-sort__label">Пользователи</span>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="inner-page__content">
                <div className="users-catalog">
                  <ul className="users-catalog__list">
                    {users.length === 0 && <li className="users-catalog__item">Нет пользователей по заданным критериям</li>}
                    {users.map((user) => (
                      <li key={user.id} className="users-catalog__item">
                        <UserCatalogCard user={user} />
                      </li>
                    ))}
                  </ul>
                  {visibleItems < totalItems &&
                    <ShowMore setVisibleItems={setVisibleItems} className={'users-catalog__show-more'} />
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
