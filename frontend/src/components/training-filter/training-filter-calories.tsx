import { Dispatch, SetStateAction } from "react";
import { Range, getTrackBackground } from 'react-range';
import { Filter, FilterRange } from "../../types";
import './styles.css';

interface TrainingFilterCaloriesProps {
  caloriesRange: FilterRange;
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  caloriesValues: number[];
  setCaloriesValues: Dispatch<SetStateAction<number[]>>;
  onInitCalories: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRangeChange: (key: string, setFilter: Dispatch<SetStateAction<Filter>>, filter: Filter, setValues: Dispatch<SetStateAction<number[]>>) => (values: number[]) => void;
};

export function TrainingFilterCalories({caloriesRange, filter, setFilter, caloriesValues, setCaloriesValues, onInitCalories, handleInputChange, handleRangeChange}: TrainingFilterCaloriesProps): JSX.Element {

  return(
    <div className="my-training-form__block my-training-form__block--calories">
      <h4 className="my-training-form__block-title">Калории</h4>
      <div className="filter-calories">
        <div className="filter-calories__input-text filter-calories__input-text--min">
          <input
            type="number"
            name="caloriesFrom"
            placeholder={caloriesRange.Min.toString()}
            value={filter.caloriesFrom}
            min={caloriesRange.Min}
            max={caloriesRange.Max}
            onChange={handleInputChange}
          />
          <label htmlFor="text-min-cal">от</label>
        </div>
        <div className="filter-calories__input-text filter-calories__input-text--max">
          <input
            type="number"
            name="caloriesTo"
            placeholder={caloriesRange.Max.toString()}
            value={filter.caloriesTo}
            min={caloriesRange.Min}
            max={caloriesRange.Max}
            onChange={handleInputChange}
          />
          <label htmlFor="text-max-cal">до</label>
        </div>
      </div>
      <div className="filter-range">
        <div className="filter-range__scale">
          <div className="filter-range__scale-container">
            <Range
              step={caloriesRange.STEP}
              min={caloriesRange.Min}
              max={caloriesRange.Max > caloriesRange.Min ? caloriesRange.Max : caloriesRange.Min + caloriesRange.STEP}
              values={onInitCalories ? caloriesValues : [caloriesRange.Min, caloriesRange.Max] }
              onChange={handleRangeChange('calories', setFilter, filter, setCaloriesValues)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="filter-range__track"
                  style={{
                    ...props.style,
                    background: getTrackBackground({
                      values: caloriesValues,
                      colors: ['#ccc', '#333', '#ccc'],
                      min: caloriesRange.Min,
                      max: caloriesRange.Max
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
      </div>
    </div>
  );
}
