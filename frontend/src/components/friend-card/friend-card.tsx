import { useEffect } from "react";
import { FullUser, Gender, UserRole } from "../../types";
import { useAppDispatch } from "@/hooks";
import { createBookingAction } from "@/store/api-actions";

interface UserCardProps {
  user: FullUser;
}

export function FriendCard({ user }: UserCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCreateBooking = () => {
    if (user.id) {
      dispatch(createBookingAction({recipientId: user.id}));
    }
  }

  return (
    <div className="thumbnail-friend">
      <div className={`thumbnail-friend__info ${user.role === UserRole.Coach ? 'thumbnail-friend__info--theme-dark' : 'thumbnail-friend__info--theme-light'}`}>
        <div className="thumbnail-friend__image-status">
          <div className="thumbnail-friend__image">
            <picture>
              <source type="image/jpg" srcSet={`${user.avatar}, ${user.avatar} 2x`} />
              <img src={user.avatar} srcSet={`${user.avatar} 2x`} width="78" height="78" alt="" />
            </picture>
          </div>
        </div>
        <div className="thumbnail-friend__header">
          <h2 className="thumbnail-friend__name">{user.name}</h2>
          <div className="thumbnail-friend__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-friend__location-address">{user.metro}</address>
          </div>
        </div>
        <ul className="thumbnail-friend__training-types-list">
          {user.trainingType.map((type) => (
            <li key={type}>
              <div className="hashtag thumbnail-friend__hashtag"><span>#{type}</span></div>
            </li>
          ))}
        </ul>
        <div className="thumbnail-friend__activity-bar">
          <div className={`thumbnail-friend__ready-status ${user.isReady ? 'thumbnail-friend__ready-status--is-ready' : 'thumbnail-friend__ready-status--is-not-ready'}`}>
            <span>{user.isReady ? 'Готов' : 'Не готов'}{user.gender === Gender.Woman && 'а'} к тренировке</span>
          </div>
          {user.role === UserRole.Customer && user.isReady && (
            <button
              className="thumbnail-friend__invite-button"
              type="button"
              title="Пригласить друга на совместную тренировку"
              onClick={handleCreateBooking}
            >
              <svg width="43" height="46" aria-hidden="true" focusable="false">
                <use xlinkHref="#icon-invite"></use>
              </svg>
              <span className="visually-hidden">Пригласить друга на совместную тренировку</span>
            </button>
          )}
        </div>
      </div>
      {user.role === UserRole.Customer &&
        <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
          <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку</p>
          <div className="thumbnail-friend__button-wrapper">
            <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
            <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить</button>
          </div>
        </div>
      }
    </div>
  );
}
