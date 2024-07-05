import { Notify } from "../../types";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { useEffect, useState } from "react";
import { deleteNotifyAction } from "../../store/api-actions";
import { useAppDispatch } from "../../hooks";

interface NotifyMessage extends Notify {
  isActive: boolean;
}

interface NotifyProps {
  notify: Notify[]
}

export function NotifyMessages({ notify }: NotifyProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [notifications, setNotifications] = useState<NotifyMessage[]>([]);

  useEffect(() => {
    const initialNotifications = notify.map(notification => ({
      ...notification,
      isActive: true,
    }));
    setNotifications(initialNotifications);
  }, [notify]);

  const handleNotificationClick = (id?: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, isActive: false } : notification
    ));
    if (id) {
      dispatch(deleteNotifyAction({id}));
    }
  };

  return (
    <ul className="main-nav__sublist">
      {notifications.map((notification) => {
        const createdAt = notification.createdAt ? dayjs(notification.createdAt).locale('ru').format('D MMMM, HH:mm') : '';
        const dateTime = notification.createdAt ? new Date(notification.createdAt).toISOString() : '';
        return (
          <li key={notification.id} className="main-nav__subitem">
            <a
              className={`notification ${notification.isActive ? 'is-active' : ''}`}
              href="#"
              onClick={() => handleNotificationClick(notification.id)}
              style={{ cursor: notification.isActive ? 'pointer' : 'default' }}
            >
              <p className="notification__text">{notification.text}</p>
              <time className="notification__time" dateTime={dateTime}>{createdAt}</time>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
