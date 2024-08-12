import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import {logoutAction} from '../../store/api-actions/auth/logout-action';
import {useAppDispatch} from '../../hooks';

export function Logout(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  return <Navigate to="/" replace />;
}
