import { Dispatch, SetStateAction } from "react";
import { Filter, TrainingTime } from "../../types";
import { DEFAULT_ITEMS_LIMIT } from "../../const";

interface TrainingFilterTimeProps {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  setVisibleItems: Dispatch<SetStateAction<number>>;
};

export function TrainingFilterTime({filter, setFilter, setVisibleItems}: TrainingFilterTimeProps): JSX.Element {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, duration: TrainingTime) => {
    setFilter((prevFilter) => {
      const trainingTime = prevFilter.trainingTime ?? [];
      if (event.target.checked) {
        return { ...prevFilter, trainingTime: [...trainingTime, duration] };
      } else {
        return { ...prevFilter, trainingTime: trainingTime.filter(item => item !== duration) };
      }
    });

    setVisibleItems(DEFAULT_ITEMS_LIMIT);
  };

  return(
    <div className="my-training-form__block my-training-form__block--duration">
      <h4 className="my-training-form__block-title">Длительность</h4>
      <ul className="my-training-form__check-list">
        {Object.values(TrainingTime).map((duration) => (
          <li key={duration} className="my-training-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input
                  type="checkbox"
                  value={duration}
                  name="trainingTime"
                  checked={filter.trainingTime?.includes(duration as TrainingTime) || false}
                  onChange={(e) => handleCheckboxChange(e, duration as TrainingTime)}
                />
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg></span>
                <span className="custom-toggle__label">{duration}</span>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
