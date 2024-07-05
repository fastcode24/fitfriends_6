import { Link } from "react-router-dom";
import { Training } from "../../types";
import { AppRoute } from "../../const";

interface RelatedCardProps {
  training: Training;
}

export function RelatedCard({ training }: RelatedCardProps): JSX.Element {
  return (
    <li className="special-for-you__item">
      <div className="thumbnail-preview">
        <div className="thumbnail-preview__image">
          <picture>
            <source type="image/webp" srcSet={`${training.background}, ${training.background} 2x`} />
            <img src={training.background} srcSet={`${training.background} 2x`} width="452" height="191" alt="" />
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">{training.trainingType}</h3>
          <div className="thumbnail-preview__button-wrapper">
            <Link to={`${AppRoute.TrainingUrl}/${training.id}`} className="btn btn--small thumbnail-preview__button">Подробнее</Link>
          </div>
        </div>
      </div>
    </li>
  );
}
