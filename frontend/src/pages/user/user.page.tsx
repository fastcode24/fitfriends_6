import { useEffect } from "react";
import { CoachInfo, CustomerInfo } from "@components";
import { useAppDispatch, useAppSelector } from "@hooks";
import { getAuthUser, getCatalogTrainings, getUser } from "@store/selectors";
import { fetchTrainingsAction, fetchUserAction } from "@store/api-actions";
import { useParams } from "react-router-dom";
import { UserData, UserRole } from "@types";

export function UserPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const authUser: UserData = useAppSelector(getAuthUser);
  const trainingsData = useAppSelector((getCatalogTrainings));
  const trainings = trainingsData?.trainings || [];

  useEffect(() => {
    if (id) {
      dispatch(fetchUserAction(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && user && user.role === UserRole.Coach) {
      dispatch(fetchTrainingsAction({ storeName: 'catalog', coachId: id }));
    }
  }, [dispatch, id, user]);

  if (!user || !authUser || (user.role === UserRole.Coach && !trainingsData)) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <>
      {user.role === UserRole.Coach ? <CoachInfo user={user} trainings={trainings} /> : <CustomerInfo user={user} />}
    </>
  );
}
