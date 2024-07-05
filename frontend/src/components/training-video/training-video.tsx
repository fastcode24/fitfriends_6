import { Dispatch, SetStateAction, useRef, useState } from "react";
import { FullTraining, UserRole } from "../../types";
import { useAppDispatch } from "../../hooks";
import { setActiveTraining } from "../../store/action";
import { fetchTrainingAction, spendBalanceAction } from "../../store/api-actions";

type TrainingVideoProps = {
  id: string;
  role: UserRole;
  training: FullTraining;
  activeTraining: string | null,
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
};

export function TrainingVideo({ id, role, training, activeTraining, isPlaying, setIsPlaying }: TrainingVideoProps): JSX.Element {
  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [startError, setStartError] = useState<string | null>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleStartClick = () => {
    if (id) {
      dispatch(setActiveTraining(id));
      dispatch(spendBalanceAction(id));
      dispatch(fetchTrainingAction({ id, role }));
    } else {
      setStartError('Не удалось начать тренировку');
    }
  };

  const handleEndClick = () => {
    setIsPlaying(false);
    dispatch(setActiveTraining(null));
  }

  return (
    <div className="training-video">
      <h2 className="training-video__title">Видео</h2>
      <div className="training-video__video">
        {!isPlaying && (
          <div className="training-video__thumbnail">
            <picture>
              <source type="image/webp" srcSet={`${training.background}, ${training.background} 2x`} />
              <img src={training.background} srcSet={`${training.background} 2x`} width="922" height="566" alt="Обложка видео" />
            </picture>
          </div>
        )}
        <video ref={videoRef} width="922" height="566" controls style={{ display: isPlaying ? 'block' : 'none' }}>
          <source src={training.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {!isPlaying && (
          <button
            className={`training-video__play-button btn-reset ${activeTraining !== training.id ? 'is-disabled' : ''}`}
            disabled={activeTraining !== training.id}
            onClick={handlePlayClick}
          >
            <svg width="18" height="30" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        )}
      </div>
      <div className="training-video__buttons-wrapper">
        <button
          className="btn training-video__button training-video__button--start"
          type="button"
          onClick={activeTraining === training.id ? handleEndClick : handleStartClick}
          disabled={training.count < 1 && activeTraining !== training.id}
        >
          {activeTraining === training.id ? 'Закончить' : 'Приступить'}
        </button>
        {startError && <span className="start_error">{startError}</span>}
      </div>
    </div>
  );
}
