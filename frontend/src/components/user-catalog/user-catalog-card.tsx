import { Link } from "react-router-dom";
import { FullUser, UserRole } from "../../types";
import { AppRoute } from "../../const";

interface UserCardProps {
  user: FullUser;
}

export function UserCatalogCard({ user }: UserCardProps): JSX.Element {
  return (
    <div className={`thumbnail-user ${user.role === UserRole.Coach ? 'thumbnail-user--role-coach' : 'thumbnail-user--role-user'}`}>
      <div className="thumbnail-user__image">
        <picture>
          <source type="image/webp" srcSet={`${user.avatar}, ${user.avatar} 2x`} />
          <img src={user.avatar} srcSet={`${user.avatar} 2x`} width="82" height="82" alt="" />
        </picture>
      </div>
      <div className="thumbnail-user__header">
        <h3 className="thumbnail-user__name">{user.name}</h3>
        <div className="thumbnail-user__location">
          <svg width="14" height="16" aria-hidden="true">
            <use xlinkHref="#icon-location"></use>
          </svg>
          <address className="thumbnail-user__location-address">{user.metro}</address>
        </div>
      </div>
      <ul className="thumbnail-user__hashtags-list">
        {user.trainingType.map((type) => (
          <li key={type} className="thumbnail-user__hashtags-item">
            <div className="hashtag thumbnail-user__hashtag"><span>#{type}</span></div>
          </li>
        ))}
      </ul>
      <Link to={`${AppRoute.Users}/${user.id}`} className="btn btn--dark-bg btn--medium thumbnail-user__button">Подробнее</Link>
    </div>
  );
}
