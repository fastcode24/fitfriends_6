import { Dispatch, SetStateAction, useEffect } from "react";
import { Filter, SortTrainings } from "../../types";

interface TrainingFilterSortProps {
  sort: SortTrainings;
  setSort: Dispatch<SetStateAction<SortTrainings>>;
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
};

export function TrainingFilterSort({sort, setSort, filter, setFilter}: TrainingFilterSortProps): JSX.Element {

  const handleSortChange = (sortValue: SortTrainings): void => {
    if (sortValue === sort) {
      setSort(SortTrainings.Default);
      if (sortValue === SortTrainings.Free) {
        setFilter({
          ...filter,
          priceFrom: undefined,
          priceTo: undefined,
        });
      }
    } else {
      setSort(sortValue);
      if (sort === SortTrainings.Free && (sortValue === SortTrainings.Cheap || sortValue === SortTrainings.Expensive)) {
        setFilter({
          ...filter,
          priceFrom: undefined,
          priceTo: undefined,
        });
      }
    }
  };

  useEffect(() => {
    if (sort === SortTrainings.Free) {
      setFilter({
        ...filter,
        priceFrom: 0,
        priceTo: 0,
      });
    }
  }, [sort]);

  return(
    <div className="gym-catalog-form__block gym-catalog-form__block--sort">
      <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
      <div className="btn-radio-sort gym-catalog-form__radio">
        <label>
          <input
            type="radio"
            name="sort"
            value={SortTrainings.Cheap}
            checked={sort === SortTrainings.Cheap}
            onClick={() => handleSortChange(SortTrainings.Cheap)}
          />
          <span className="btn-radio-sort__label">{SortTrainings.Cheap}</span>
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value={SortTrainings.Expensive}
            checked={sort === SortTrainings.Expensive}
            onClick={() => handleSortChange(SortTrainings.Expensive)}
          />
          <span className="btn-radio-sort__label">{SortTrainings.Expensive}</span>
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value={SortTrainings.Free}
            checked={sort === SortTrainings.Free}
            onClick={() => handleSortChange(SortTrainings.Free)}
          />
          <span className="btn-radio-sort__label">{SortTrainings.Free}</span>
        </label>
      </div>
    </div>
  );
}
