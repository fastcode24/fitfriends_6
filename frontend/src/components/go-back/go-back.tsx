import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../const";

interface GoBackProps {
  url?: AppRoute;
}

export function GoBack({ url }: GoBackProps): JSX.Element {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (url) {
      navigate(url);
    } else {
      navigate(-1);
    }
  };

  return (
    <button className="btn-flat btn-flat--underlined reviews-side-bar__back" type="button" onClick={handleBackClick}>
      <svg width="14" height="10" aria-hidden="true">
        <use xlinkHref="#arrow-left"></use>
      </svg><span>Назад</span>
    </button>
  );
}
