import { Dispatch, SetStateAction } from "react";
import { Filter, TrainingType } from "../../types";
import { DEFAULT_ITEMS_LIMIT } from "../../const";

interface TrainingFilterTypesProps {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  setVisibleItems: Dispatch<SetStateAction<number>>;
};

export function TrainingFilterTypes({filter, setFilter, setVisibleItems}: TrainingFilterTypesProps): JSX.Element {
  const handleTrainingTypeChange = (type: TrainingType) => {
    setFilter((prevFilter) => {
      const trainingType = prevFilter.trainingType || [];
      const isChecked = trainingType.includes(type);
      let updatedTrainingType: TrainingType[];
      if (isChecked) {
        updatedTrainingType = trainingType.filter(t => t !== type);
      } else {
        updatedTrainingType = [...trainingType, type];
      }
      return {
        ...prevFilter,
        trainingType: updatedTrainingType,
      };
    });

    setVisibleItems(DEFAULT_ITEMS_LIMIT);
  };

  return(
    <div className="gym-catalog-form__block gym-catalog-form__block--type">
      <h4 className="gym-catalog-form__block-title">Тип</h4>
      <ul className="gym-catalog-form__check-list">
        {Object.values(TrainingType).map((type) => (
          <li key={type} className="gym-catalog-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input
                  type="checkbox"
                  name="trainingType"
                  value={type}
                  onChange={() => handleTrainingTypeChange(type)}
                  checked={filter.trainingType?.includes(type) || false}
                />
                  <span className="custom-toggle__icon">
                    <svg width="9" height="6" aria-hidden="true">
                      <use xlinkHref="#arrow-check"></use>
                    </svg>
                  </span>
                  <span className="custom-toggle__label">{type}</span>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
