import { Dispatch, SetStateAction, useState } from "react";
import { Filter, FilterRange, FullUser, HandleRange, SortTrainings, UserRole } from "../../types";
import { TrainingFilterCalories, TrainingFilterPrice, TrainingFilterRating, TrainingFilterSort, TrainingFilterTime, TrainingFilterTypes } from "..";
import { DEFAULT_ITEMS_LIMIT } from "../../const";

interface TrainingFilterProps {
  minPrice: number;
  maxPrice: number;
  minCalories: number;
  maxCalories: number;
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  sort: SortTrainings;
  setSort: Dispatch<SetStateAction<SortTrainings>>;
  user: FullUser
  setVisibleItems: Dispatch<SetStateAction<number>>;
};

export function TrainingFilter({ minPrice, maxPrice, minCalories, maxCalories, filter, setFilter, sort, setSort, user, setVisibleItems }: TrainingFilterProps): JSX.Element {
  const ratingRange: FilterRange = {
    STEP: 1,
    MIN: 0,
    MAX: 5
  };

  const priceRange: FilterRange = {
    STEP: 100,
    Min: minPrice,
    Max: maxPrice
  };

  const caloriesRange: FilterRange = {
    STEP: 100,
    Min: minCalories,
    Max: maxCalories
  };

  const [onInitPrice, setOnInitPrice] = useState(false);
  const [onInitCalories, setOnInitCalories] = useState(false);
  const [priceValues, setPriceValues] = useState([minPrice, maxPrice]);
  const [caloriesValues, setCaloriesValues] = useState([minCalories, maxCalories]);
  const [ratingValues, setRatingValues] = useState([ratingRange.MIN, ratingRange.MAX]);

  const handleRangeChange: HandleRange = (rangeName, setFilter, filter, setValues) => (newValues) => {
    if (rangeName === 'price') {
      setOnInitPrice(true);
    } else if (rangeName === 'calories') {
      setOnInitCalories(true);
    }

    setValues(newValues);
    setFilter({
      ...filter,
      [rangeName + 'From']: newValues[0],
      [rangeName + 'To']: newValues[1],
    });
    setVisibleItems(DEFAULT_ITEMS_LIMIT);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let numericValue = Number(value.replace(/^0+/, '')) || 0;

    if (name === 'priceFrom' || name === 'priceTo') {
      setOnInitPrice(true);
    } else if (name === 'calories' || name === 'caloriesTo') {
      setOnInitCalories(true);
    }

    if (name === 'priceFrom' || name === 'priceTo') {
      numericValue = Math.min(Math.max(numericValue, priceRange.Min), priceRange.Max);
    } else if (name === 'caloriesFrom' || name === 'caloriesTo') {
      numericValue = Math.min(Math.max(numericValue, caloriesRange.Min), caloriesRange.Max);
    } else if (name === 'ratingFrom' || name === 'ratingTo') {
      numericValue = Math.min(Math.max(numericValue, ratingRange.MIN), ratingRange.MAX);
    }

    setFilter((prevFilter) => {
      const newFilter = { ...prevFilter, [name]: numericValue };

      if (name === 'priceFrom' && numericValue > (newFilter.priceTo ?? priceRange.Max)) {
        newFilter.priceTo = numericValue;
      } else if (name === 'priceTo' && numericValue < (newFilter.priceFrom ?? priceRange.Min)) {
        newFilter.priceFrom = numericValue;
      } else if (name === 'caloriesFrom' && numericValue > (newFilter.caloriesTo ?? caloriesRange.Max)) {
        newFilter.caloriesTo = numericValue;
      } else if (name === 'caloriesTo' && numericValue < (newFilter.caloriesFrom ?? caloriesRange.Min)) {
        newFilter.caloriesFrom = numericValue;
      } else if (name === 'ratingFrom' && numericValue > (newFilter.ratingTo ?? ratingRange.MAX)) {
        newFilter.ratingTo = numericValue;
      } else if (name === 'ratingTo' && numericValue < (newFilter.ratingFrom ?? ratingRange.MIN)) {
        newFilter.ratingFrom = numericValue;
      }

      setPriceValues([newFilter.priceFrom ?? 0, newFilter.priceTo ?? priceRange.Max]);
      setCaloriesValues([newFilter.caloriesFrom ?? caloriesRange.Min, newFilter.caloriesTo ?? caloriesRange.Max]);
      setRatingValues([newFilter.ratingFrom ?? 0, newFilter.ratingTo ?? ratingRange.MAX]);

      return newFilter;
    });

    e.target.value = numericValue.toString();
    setVisibleItems(DEFAULT_ITEMS_LIMIT);
  };

  return(
    <form className="my-training-form__form">
      <TrainingFilterPrice
        priceRange={priceRange}
        filter={filter}
        setFilter={setFilter}
        priceValues={priceValues}
        setPriceValues={setPriceValues}
        onInitPrice={onInitPrice}
        handleInputChange={handleInputChange}
        handleRangeChange={handleRangeChange}
      />
      <TrainingFilterCalories
        caloriesRange={caloriesRange}
        filter={filter}
        setFilter={setFilter}
        caloriesValues={caloriesValues}
        setCaloriesValues={setCaloriesValues}
        onInitCalories={onInitCalories}
        handleInputChange={handleInputChange}
        handleRangeChange={handleRangeChange}
      />
      <TrainingFilterRating
        ratingRange={ratingRange}
        filter={filter}
        setFilter={setFilter}
        ratingValues={ratingValues}
        setRatingValues={setRatingValues}
        handleRangeChange={handleRangeChange}
      />
      {user.role === UserRole.Coach &&
        <TrainingFilterTime filter={filter} setFilter={setFilter} setVisibleItems={setVisibleItems} />
      }
      {user.role === UserRole.Customer &&
        <>
          <TrainingFilterTypes filter={filter} setFilter={setFilter} setVisibleItems={setVisibleItems} />
          <TrainingFilterSort sort={sort} setSort={setSort} filter={filter} setFilter={setFilter} />
        </>
      }
    </form>
  );
}
