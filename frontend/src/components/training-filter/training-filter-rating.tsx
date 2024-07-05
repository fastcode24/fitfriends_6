import { Dispatch, SetStateAction } from "react";
import { Range, getTrackBackground } from 'react-range';
import { Filter, FilterRange } from "../../types";
import './styles.css';

interface TrainingFilterRatingProps {
  ratingRange: FilterRange;
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  ratingValues: number[];
  setRatingValues: Dispatch<SetStateAction<number[]>>;
  handleRangeChange: (key: string, setFilter: Dispatch<SetStateAction<Filter>>, filter: Filter, setValues: Dispatch<SetStateAction<number[]>>) => (values: number[]) => void;
};

export function TrainingFilterRating({ratingRange, filter, setFilter, ratingValues, setRatingValues, handleRangeChange}: TrainingFilterRatingProps): JSX.Element {

  return(
    <div className="my-training-form__block my-training-form__block--raiting">
      <h4 className="my-training-form__block-title">Рейтинг</h4>
      <div className="filter-raiting">
        <div className="filter-raiting__scale">
          <div className="filter-range__scale-container">
            <Range
              step={ratingRange.STEP}
              min={ratingRange.MIN}
              max={ratingRange.MAX}
              values={ratingValues}
              onChange={handleRangeChange('rating', setFilter, filter, setRatingValues)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="filter-range__track"
                  style={{
                    ...props.style,
                    background: getTrackBackground({
                      values: ratingValues,
                      colors: ['#ccc', '#333', '#ccc'],
                      min: ratingRange.MIN,
                      max: ratingRange.MAX
                    }),
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="filter-range__thumb"
                />
              )}
            />
          </div>
        </div>
        <div className="filter-raiting__control">
          <span className="visually-hidden">Минимальное значение</span>
          <span>{ratingValues[0]}</span>
          <span className="visually-hidden">Максимальное значение</span>
          <span>{ratingValues[1]}</span>
        </div>
      </div>
    </div>
  );
}
