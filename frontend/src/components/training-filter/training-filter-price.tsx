import { Dispatch, SetStateAction } from "react";
import { Range, getTrackBackground } from 'react-range';
import { Filter, FilterRange } from "../../types";
import './styles.css';

interface TrainingFilterPriceProps {
  priceRange: FilterRange;
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  priceValues: number[];
  setPriceValues: Dispatch<SetStateAction<number[]>>;
  onInitPrice: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRangeChange: (key: string, setFilter: Dispatch<SetStateAction<Filter>>, filter: Filter, setValues: Dispatch<SetStateAction<number[]>>) => (values: number[]) => void;
};

export function TrainingFilterPrice({priceRange, filter, setFilter, priceValues, setPriceValues, onInitPrice, handleInputChange, handleRangeChange}: TrainingFilterPriceProps): JSX.Element {

  return(
    <div className="my-training-form__block my-training-form__block--price">
      <h4 className="my-training-form__block-title">Цена, ₽</h4>
      <div className="filter-price">
        <div className="filter-price__input-text filter-price__input-text--min">
          <input
            type="number"
            name="priceFrom"
            placeholder={priceRange.Min.toString()}
            value={filter.priceFrom}
            min={priceRange.Min}
            max={priceRange.Max}
            onChange={handleInputChange}
          />
          <label htmlFor="text-min">от</label>
        </div>
        <div className="filter-price__input-text filter-price__input-text--max">
          <input
            type="number"
            name="priceTo"
            placeholder={priceRange.Max.toString()}
            value={filter.priceTo}
            min={priceRange.Min}
            max={priceRange.Max}
            onChange={handleInputChange}
          />
          <label htmlFor="text-max">до</label>
        </div>
      </div>
      <div className="filter-range">
        <div className="filter-range__scale">
          <div className="filter-range__scale-container">
            <Range
              step={priceRange.STEP}
              min={priceRange.Min}
              max={priceRange.Max > priceRange.Min ? priceRange.Max : priceRange.Min + priceRange.STEP}
              values={onInitPrice ? priceValues : [priceRange.Min, priceRange.Max] }
              onChange={handleRangeChange('price', setFilter, filter, setPriceValues)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="filter-range__track"
                  style={{
                    ...props.style,
                    background: getTrackBackground({
                      values: priceValues,
                      colors: ['#ccc', '#333', '#ccc'],
                      min: priceRange.Min,
                      max: priceRange.Max
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
