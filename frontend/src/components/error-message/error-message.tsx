import {useAppSelector} from '../../hooks';
import './error-message.css';
import { getError } from '../../store/selectors';

export function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(getError);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

}
