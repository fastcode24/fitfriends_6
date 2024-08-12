import { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks';
import { AccountCustomerPage, IntroPage, LoginPage, MainPage, MyPurchasesPage, TrainingsPage, NotFoundPage, QuestionnaireCustomerPage, RegisterPage, TrainingPage, QuestionnaireCoachPage, AccountCoachPage, CreateTrainingPage, UsersPage, MyOrdersPage, UserPage } from '@pages';
import { Logout } from '@components';
import { getAuthorizationStatus, getAuthUser, getError } from '@store/selectors';
import { checkAuthAction } from '@store/api-actions';
import { AppRoute, AuthorizationStatus } from '@/const';
import { UserRole } from '@types';

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

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Routes>
        {authorizationStatus === AuthorizationStatus.Auth ? (
          authUser.role === UserRole.Coach ? (
            <>
              <Route path="/" element={<Navigate to={AppRoute.Main} />} />
              <Route path={AppRoute.Login} element={<Navigate to={AppRoute.AccountCoach} />} />
              <Route path={AppRoute.Register} element={<Navigate to={AppRoute.AccountCoach} />} />
              <Route path={AppRoute.QuestionnaireCustomer} element={<Navigate to={AppRoute.AccountCoach} />} />
              <Route path={AppRoute.QuestionnaireCoach} element={<QuestionnaireCoachPage />} />
              <Route path={AppRoute.Main} element={<Navigate to={AppRoute.AccountCoach} />} />
              <Route path={AppRoute.AccountCoach} element={<AccountCoachPage />} />
              <Route path={AppRoute.AccountCustomer} element={<Navigate to={AppRoute.AccountCoach} />} />
              <Route path={AppRoute.Trainings} element={<TrainingsPage />} />
              <Route path={AppRoute.Training} element={<TrainingPage />} />
              <Route path={AppRoute.Users} element={<Navigate to={AppRoute.AccountCoach} />} />
              <Route path={AppRoute.UserPage} element={<UserPage />} />
              <Route path={AppRoute.CreateTraining} element={<CreateTrainingPage />} />
              <Route path={AppRoute.Orders} element={<MyOrdersPage />} />
              <Route path={AppRoute.Purchases} element={<Navigate to={AppRoute.AccountCoach} />} />
              <Route path={AppRoute.Logout} element={<Logout />} />
              <Route path="*" element={<NotFoundPage />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to={AppRoute.Main} />} />
              <Route path={AppRoute.Login} element={<Navigate to={AppRoute.Main} replace />} />
              <Route path={AppRoute.Register} element={<Navigate to={AppRoute.Main} replace />} />
              <Route path={AppRoute.QuestionnaireCustomer} element={<QuestionnaireCustomerPage />} />
              <Route path={AppRoute.QuestionnaireCoach} element={<Navigate to={AppRoute.Main} replace />} />
              <Route path={AppRoute.Main} element={<MainPage />} />
              <Route path={AppRoute.AccountCoach} element={<Navigate to={AppRoute.Main} replace />} />
              <Route path={AppRoute.AccountCustomer} element={<AccountCustomerPage />} />
              <Route path={AppRoute.Trainings} element={<TrainingsPage />} />
              <Route path={AppRoute.Training} element={<TrainingPage />} />
              <Route path={AppRoute.Users} element={<UsersPage />} />
              <Route path={AppRoute.UserPage} element={<UserPage />} />
              <Route path={AppRoute.CreateTraining} element={<Navigate to={AppRoute.Main} replace />} />
              <Route path={AppRoute.Orders} element={<Navigate to={AppRoute.Main} replace />} />
              <Route path={AppRoute.Purchases} element={<MyPurchasesPage />} />
              <Route path={AppRoute.Logout} element={<Logout />} />
              <Route path="*" element={<NotFoundPage />} />
            </>
          )
        ) : (
          <>
            <Route path="/" element={<IntroPage />} />
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route path={AppRoute.Register} element={<RegisterPage />} />
            <Route path={AppRoute.QuestionnaireCustomer} element={<QuestionnaireCustomerPage />} />
            <Route path={AppRoute.QuestionnaireCoach} element={<Navigate to={AppRoute.Intro} replace />} />
            <Route path={AppRoute.Main} element={<Navigate to={AppRoute.Intro} replace />} />
            <Route path={AppRoute.AccountCoach} element={<Navigate to={AppRoute.Intro} replace />} />
            <Route path={AppRoute.AccountCustomer} element={<Navigate to={AppRoute.Intro} replace />} />
            <Route path={AppRoute.Trainings} element={<Navigate to={AppRoute.Intro} replace />} />
            <Route path={AppRoute.Training} element={<Navigate to={AppRoute.Intro} replace />} />
            <Route path={AppRoute.Users} element={<Navigate to={AppRoute.Intro} replace />} />
            <Route path={AppRoute.UserPage} element={<Navigate to={AppRoute.Intro} replace />} />
            <Route path={AppRoute.CreateTraining} element={<Navigate to={AppRoute.Intro} replace />} />
            <Route path={AppRoute.Orders} element={<Navigate to={AppRoute.Intro} replace />} />
            <Route path={AppRoute.Purchases} element={<Navigate to={AppRoute.Intro} replace />} />
            <Route path={AppRoute.Logout} element={<Logout />} />
            <Route path="*" element={<NotFoundPage />} />
          </>
        )}
      </Routes>
    </>
  );
}
