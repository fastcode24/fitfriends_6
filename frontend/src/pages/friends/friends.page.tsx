import { Helmet } from "react-helmet-async";
import { FriendCard, GoBack, Header } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getFriends } from "../../store/selectors";
import { useEffect, useState } from "react";
import { fetchFriendsAction } from "../../store/api-actions";

export function FriendsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const friendsData = useAppSelector(getFriends);
  const friends = friendsData?.users || [];
  const INITIAL_VISIBLE_USERS = 3;
  const totalFriends = friendsData?.totalItems || 0;
  const [visibleUsers, setVisibleUsers] = useState<number>(INITIAL_VISIBLE_USERS);

  useEffect(() => {
    dispatch(fetchFriendsAction({limit: visibleUsers}));
  }, [dispatch, visibleUsers]);

  const handleLoadMore = () => {
    setVisibleUsers((prev) => prev + INITIAL_VISIBLE_USERS);
  };

  return (
    <div className="wrapper">
      <Helmet>
        <title>Список друзей — FitFriends</title>
      </Helmet>
      <Header />
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <GoBack />
              <div className="friends-list__title-wrapper">
                <h1 className="friends-list__title">Мои друзья</h1>
              </div>
              <ul className="friends-list__list">
                {friends.length === 0 && <li className="friends-list__item">Нет пользователей по заданным критериям</li>}
                {friends.map((user) => (
                  <li key={user.id} className="friends-list__item">
                    <FriendCard user={user} />
                  </li>
                ))}
              </ul>
              <div className="show-more friends-list__show-more">
                {visibleUsers < totalFriends &&
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
