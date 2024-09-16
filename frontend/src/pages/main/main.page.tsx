import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getFeaturedTrainings, getPopularTrainings, getRelatedTrainings, getUser, getUsers } from "../../store/selectors";
import { FullUser, Gender, SortType, Training, UserRole } from "../../types";
import { useEffect } from "react";
import { fetchTrainingsAction, fetchUsersAction } from "../../store/api-actions";
import { Header, FeaturedTrainingsList, PopularTrainingsList, RelatedTrainingsList, ReadyUsersList } from "../../components";
import { AppTitle } from "../../const";

export function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const authUserData = useAppSelector(getUser);
  const relatedData = useAppSelector((getRelatedTrainings));
  const featuredData = useAppSelector((getFeaturedTrainings));
  const popularData = useAppSelector((getPopularTrainings));
  const usersData = useAppSelector((getUsers));
  const relatedTrainings: Training[] = relatedData?.trainings || [];
  const featuredTrainings: Training[] = featuredData?.trainings || [];
  const popularTrainings: Training[] = popularData?.trainings || [];
  const readyUsers: FullUser[] = usersData?.users || [];
  const RELATED_ITEMS = 9;
  const FEATURED_ITEMS = 3;
  const POPULAR_ITEMS = 8;
  const USERS_ITEMS = 8

  useEffect(() => {
    console.log('featuredTrainings');
    console.log('featuredTrainings', featuredTrainings);
  }, []);

  useEffect(() => {
    const genderExclude = authUserData && authUserData.gender === Gender.Woman ? Gender.Man : Gender.Woman;
    if (authUserData && authUserData.id && authUserData.trainingTime) {
      dispatch(fetchTrainingsAction({
        storeName: 'related',
        limit: RELATED_ITEMS,
        genderExclude: genderExclude,
        trainingType: authUserData.trainingType,
        trainingTime: [authUserData.trainingTime],
        level: authUserData.level
      }));
      dispatch(fetchTrainingsAction({storeName: 'featured', limit: FEATURED_ITEMS, isFeatured: true}));
      dispatch(fetchTrainingsAction({storeName: 'popular', limit: POPULAR_ITEMS, sortType: SortType.Rating}));
      dispatch(fetchUsersAction({role: UserRole.Customer, limit: USERS_ITEMS, isReady: true}));
    }
  }, [dispatch, authUserData, authUserData?.id]);

  return (
    <div className="wrapper">
      <Helmet>
        <title>{AppTitle.Main}</title>
      </Helmet>
      <Header />
      <main>
        <h1 className="visually-hidden">{AppTitle.Main}</h1>
        {relatedTrainings && relatedTrainings.length > 0 && (
          <RelatedTrainingsList relatedTrainings={relatedTrainings} />
        )}
        {featuredTrainings && featuredTrainings.length > 0 && (
          <FeaturedTrainingsList featuredTrainings={featuredTrainings} />
        )}
        {popularTrainings && popularTrainings.length > 0 && (
          <PopularTrainingsList popularTrainings={popularTrainings} />
        )}
        {readyUsers && readyUsers.length > 0 && (
          <ReadyUsersList readyUsers={readyUsers} />
        )}
      </main>
    </div>
  );
}
