import { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AccountCoachPage, AccountCustomerPage, CreateTrainingPage, FriendsPage, IntroPage, LoginPage, MainPage, MyOrdersPage, MyPurchasesPage, TrainingsPage, NotFoundPage, QuestionnaireCoachPage, QuestionnaireCustomerPage, RegisterPage, TrainingPage, UserPage, UsersPage } from '../../pages';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthUser, getAuthorizationStatus, getError } from '../../store/selectors';
import { UserRole } from '../../types';
import { Logout } from '../logout/logout';
import { checkAuthAction } from '../../store/api-actions/auth/auth-actions';

export function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const authUser = useAppSelector(getAuthUser);
  const error = useAppSelector(getError);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch, location]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Routes>
        {authorizationStatus === AuthorizationStatus.Auth ? (
          authUser.role === UserRole.Coach ? (
          <>
            <Route path="" element={<Navigate to={AppRoute.AccountCoach} />} />
            <Route path={AppRoute.Login} element={<Navigate to={AppRoute.AccountCoach} />} />
            <Route path={AppRoute.Register} element={<Navigate to={AppRoute.AccountCoach} />} />
            <Route path={AppRoute.QuestionnaireCoach} element={<QuestionnaireCoachPage />} />
            <Route path={AppRoute.QuestionnaireCustomer} element={<Navigate to={AppRoute.AccountCoach} />} />
            <Route path={AppRoute.Main} element={<Navigate to={AppRoute.AccountCoach} />} />
            <Route path={AppRoute.AccountCoach} element={<AccountCoachPage />} />
            <Route path={AppRoute.AccountCustomer} element={<Navigate to={AppRoute.AccountCoach} />} />
            <Route path={AppRoute.Trainings} element={<TrainingsPage />} />
            <Route path={AppRoute.Training} element={<TrainingPage />} />
            <Route path={AppRoute.Users} element={<Navigate to={AppRoute.AccountCoach} />} />
            <Route path={AppRoute.UserPage} element={<UserPage />} />
            <Route path={AppRoute.Friends} element={<FriendsPage />} />
            <Route path={AppRoute.CreateTraining} element={<CreateTrainingPage />} />
            <Route path={AppRoute.Orders} element={<MyOrdersPage />} />
            <Route path={AppRoute.Purchases} element={<Navigate to={AppRoute.AccountCoach} />} />
            <Route path={AppRoute.Logout} element={<Logout />} />
            <Route path="*" element={<NotFoundPage />} />
          </>
          ) : (
          <>
            <Route path="" element={<Navigate to={AppRoute.Main} />} />
            <Route path={AppRoute.Login} element={<Navigate to={AppRoute.Main} />} />
            <Route path={AppRoute.Register} element={<Navigate to={AppRoute.Main} />} />
            <Route path={AppRoute.QuestionnaireCoach} element={<Navigate to={AppRoute.Main} />} />
            <Route path={AppRoute.QuestionnaireCustomer} element={<QuestionnaireCustomerPage />} />
            <Route path={AppRoute.Main} element={<MainPage />} />
            <Route path={AppRoute.AccountCoach} element={<Navigate to={AppRoute.Main} />} />
            <Route path={AppRoute.AccountCustomer} element={<AccountCustomerPage />} />
            <Route path={AppRoute.Trainings} element={<TrainingsPage />} />
            <Route path={AppRoute.Training} element={<TrainingPage />} />
            <Route path={AppRoute.Users} element={<UsersPage />} />
            <Route path={AppRoute.UserPage} element={<UserPage />} />
            <Route path={AppRoute.Friends} element={<FriendsPage />} />
            <Route path={AppRoute.CreateTraining} element={<Navigate to={AppRoute.Main} />} />
            <Route path={AppRoute.Orders} element={<Navigate to={AppRoute.Main} />} />
            <Route path={AppRoute.Purchases} element={<MyPurchasesPage />} />
            <Route path={AppRoute.Logout} element={<Logout />} />
            <Route path="*" element={<NotFoundPage />} />
          </>
          )
        ) : (
          <>
            <Route path="" element={<IntroPage />} />
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route path={AppRoute.Register} element={<RegisterPage />} />
            <Route path={AppRoute.QuestionnaireCoach} element={<Navigate to={AppRoute.Intro} />} />
            <Route path={AppRoute.QuestionnaireCustomer} element={<QuestionnaireCustomerPage />} />
            <Route path={AppRoute.Main} element={<Navigate to={AppRoute.Intro} />} />
            <Route path={AppRoute.AccountCoach} element={<Navigate to={AppRoute.Intro} />} />
            <Route path={AppRoute.AccountCustomer} element={<Navigate to={AppRoute.Intro} />} />
            <Route path={AppRoute.Trainings} element={<Navigate to={AppRoute.Intro} />} />
            <Route path={AppRoute.Training} element={<Navigate to={AppRoute.Intro} />} />
            <Route path={AppRoute.Users} element={<Navigate to={AppRoute.Intro} />} />
            <Route path={AppRoute.UserPage} element={<Navigate to={AppRoute.Intro} />} />
            <Route path={AppRoute.Friends} element={<Navigate to={AppRoute.Intro} />} />
            <Route path={AppRoute.CreateTraining} element={<Navigate to={AppRoute.Intro} />} />
            <Route path={AppRoute.Orders} element={<Navigate to={AppRoute.Intro} />} />
            <Route path={AppRoute.Purchases} element={<Navigate to={AppRoute.Intro} />} />
            <Route path={AppRoute.Logout} element={<Logout />} />
            <Route path="*" element={<NotFoundPage />} />
          </>
        )}
      </Routes>
    </>
  );
}
