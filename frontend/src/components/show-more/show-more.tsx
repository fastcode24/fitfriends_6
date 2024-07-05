import { DEFAULT_ITEMS_LIMIT } from "../../const";

interface ShowMoreProps {
  setVisibleItems: (value: React.SetStateAction<number>) => void;
  className?: string;
}

export function ShowMore({ setVisibleItems, className }: ShowMoreProps): JSX.Element {
  const handleShowMore = () => {
    setVisibleItems((prev) => prev + DEFAULT_ITEMS_LIMIT);
  };

  const showMoreClassName = className ? `show-more ${className}` : "show-more my-trainings__show-more";

  return (
    <div className={showMoreClassName}>
      <button
        className="btn show-more__button show-more__button--more"
        type="button"
        onClick={handleShowMore}
      >
        Показать еще
      </button>
    </div>
  );
}
