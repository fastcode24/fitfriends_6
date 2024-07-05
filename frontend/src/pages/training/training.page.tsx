import { Helmet } from "react-helmet-async";
import { GoBack, Header, ReviewList, TrainingInfoCoach, TrainingInfoCustomer, TrainingVideo } from "../../components";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";
import { getActiveTraining, getAuthUser, getReview, getTraining } from "../../store/selectors";
import { fetchReviewsAction, fetchTrainingAction } from "../../store/api-actions";
import { AppRoute, DEFAULT_ITEMS_LIMIT } from "../../const";
import { SortDirection, UserRole } from "../../types";
import './styles.css';

export function TrainingPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { hash } = useLocation();
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((getAuthUser));
  const training = useAppSelector((getTraining));
  const reviews = useAppSelector((getReview));
  const activeTraining = useAppSelector((getActiveTraining));
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPopupBuyVisible, setPopupBuyVisible] = useState(false);
  const [isPopupReviewVisible, setPopupReviewVisible] = useState(false);

  useEffect(() => {
    if (id && role) {
      dispatch(fetchTrainingAction({ id, role }));
      dispatch(fetchReviewsAction({ trainingId: id, limit: DEFAULT_ITEMS_LIMIT, sort: SortDirection.Down }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (hash) {
      console.log('hash', hash);
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          (element as HTMLElement).focus();
        }, 100);
      }
    }
  }, [hash]);

  const handlePopupBuyClick = () => {
    setPopupBuyVisible(true);
  };

  const handlePopupReviewClick = () => {
    setPopupReviewVisible(true);
  };

  const handleClosePopup = () => {
    setPopupBuyVisible(false);
    setPopupReviewVisible(false);
    if (id) {
      dispatch(fetchTrainingAction({ id, role }));
      dispatch(fetchReviewsAction({ trainingId: id, limit: DEFAULT_ITEMS_LIMIT, sort: SortDirection.Down }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!id || !training || !training.id) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Карточка тренировки {training.title} — FitFriends</title>
      </Helmet>
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки {training.title}</h1>
              <aside className="reviews-side-bar" id={AppRoute.ReviewsHash} tabIndex={-1}>
                <GoBack />
                <ReviewList
                  role={role}
                  training={training}
                  reviews={reviews}
                  handlePopupReviewClick={handlePopupReviewClick}
                  handleClosePopup={handleClosePopup}
                  isPopupReviewVisible={isPopupReviewVisible}
                />
              </aside>
              <div className={`training-card ${role === UserRole.Coach ? 'training-card--edit' : ''}`}>
              {role === UserRole.Coach ?
                <TrainingInfoCoach
                  training={training}
                  isEditMode={isEditMode}
                  setIsEditMode={setIsEditMode}
                />
              :
                <TrainingInfoCustomer
                  training={training}
                  isPopupBuyVisible={isPopupBuyVisible}
                  handlePopupBuyClick={handlePopupBuyClick}
                  handleClosePopup={handleClosePopup}
                />
              }
                <TrainingVideo
                  id={id}
                  role={role}
                  training={training}
                  activeTraining={activeTraining}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
