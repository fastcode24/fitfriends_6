import { useEffect, useState } from "react";
import { Training } from "../../types";
import { AppRoute, FEATURED_DISCOUNT } from "../../const";
import { Link } from "react-router-dom";
import './styles.css';

interface FeaturedTrainingsListProps {
  featuredTrainings: Training[];
}

export function FeaturedTrainingsList({ featuredTrainings }: FeaturedTrainingsListProps): JSX.Element {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const handleDotClick = (index: number) => {
    setActiveSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % featuredTrainings.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredTrainings.length]);

  const training = featuredTrainings[activeSlide];

  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          <ul className="special-offers__list">
            <li className="special-offers__item is-active">
              <aside className="promo-slider">
                <div className="promo-slider__overlay"></div>
                <div className="promo-slider__image">
                  <img src={training.background} srcSet={`${training.background} 2x`} width="1040" height="469" alt="promo-photo" />
                </div>
                <div className="promo-slider__header">
                  <Link to={`${AppRoute.TrainingUrl}/${training.id}`}>
                    <h3 className="promo-slider__title">{training.trainingType}</h3>
                  </Link>
                  <div className="promo-slider__logo">
                    <svg width="74" height="74" aria-hidden="true">
                      <use xlinkHref="#logotype"></use>
                    </svg>
                  </div>
                </div>
                <Link to={`${AppRoute.TrainingUrl}/${training.id}`}><span className="promo-slider__text">Горячие предложения на тренировки на {training.trainingType}</span></Link>
                <div className="promo-slider__bottom-container">
                  <div className="promo-slider__slider-dots">
                    <button onClick={() => handleDotClick(0)} className={`promo-slider__slider-dot ${activeSlide === 0 ? 'promo-slider__slider-dot--active' : ''}`} aria-label="первый слайд"></button>
                    <button onClick={() => handleDotClick(1)} className={`promo-slider__slider-dot ${activeSlide === 1 ? 'promo-slider__slider-dot--active' : ''}`} aria-label="второй слайд"></button>
                    <button onClick={() => handleDotClick(2)} className={`promo-slider__slider-dot ${activeSlide === 2 ? 'promo-slider__slider-dot--active' : ''}`} aria-label="третий слайд"></button>
                  </div>
                  <div className="promo-slider__price-container">
                    <p className="promo-slider__price">{training.price} ₽</p>
                    <p className="promo-slider__sup">за занятие</p>
                    <p className="promo-slider__old-price">{training.isFeatured ? training.price / FEATURED_DISCOUNT : training.price} ₽</p>
                  </div>
                </div>
              </aside>
            </li>
          </ul>
          <div className="thumbnail-spec-gym">
            <div className="thumbnail-spec-gym__image">
              <picture>
                <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x" />
                <img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
              </picture>
            </div>
            <div className="thumbnail-spec-gym__header" style={{ textAlign: 'center' }} >
              <h3 className="thumbnail-spec-gym__title">Скоро здесь появится что - то полезное</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
