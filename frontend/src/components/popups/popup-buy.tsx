import { useEffect, useRef, useState } from "react";
import { centerElement } from "../../utils";
import './styles.css';
import { NewOrderBody, OrderType, PaymentType, Training } from "../../types";
import { useAppDispatch } from "../../hooks";
import { createOrderAction } from "../../store/api-actions";

interface PopupBuyProps {
  training: Training,
  onClose: () => void;
}

export function PopupBuy({ training, onClose }: PopupBuyProps): JSX.Element {
  const dispatch = useAppDispatch();
  const popupRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [order, setOrder] = useState({
    orderType: OrderType.Subscription,
    quantity: 1,
    trainingId: training.id,
    paymentType: PaymentType.Visa
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setOrder(prevOrderData => {
      if (prevOrderData === null) {
        return prevOrderData;
      }

      if (name === "quantity" && +value < 1) {
        setInputError("Минимальное количество 1");
      } else {
        setInputError(null);
      }

      if (Object.values(PaymentType).includes(value as PaymentType)) {
        return { ...prevOrderData, paymentType: value as PaymentType };
      }

      return { ...prevOrderData, [name]: +value };
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      'Backspace', 'ArrowLeft', 'ArrowRight', 'Tab',
      'Delete', 'Enter'
    ];

    if (!allowedKeys.includes(e.key) && (e.key < '0' || e.key > '9')) {
      e.preventDefault();
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;

    setOrder(prevOrderData => {
      if (prevOrderData === null) {
        return prevOrderData;
      }

      if (name === "plus") {
        setInputError(null);
        const prevQuantity = prevOrderData.quantity;
        return { ...prevOrderData, quantity: prevQuantity + 1 };
      }

      if (name === "minus" && prevOrderData.quantity > 1) {
        setInputError(null);
        const prevQuantity = prevOrderData.quantity;
        return { ...prevOrderData, quantity: prevQuantity - 1 };
      }

      return prevOrderData;
    });
  };

  useEffect(() => {
    const handleCenterPopup = () => centerElement(popupRef.current);
    handleCenterPopup();
    window.addEventListener('resize', handleCenterPopup);

    return () => {
      window.removeEventListener('resize', handleCenterPopup);
    };
  }, []);

  const handleSubmit = async () => {
    if (order.trainingId) {
      try {
        await dispatch(createOrderAction(order as NewOrderBody)).unwrap();

        setResult('Успешная покупка!');

        setTimeout(() => {
          setResult(null);
          onClose();
        }, 1200);
      } catch (error) {
        setResult('Ошибка при покупке');

        setTimeout(() => {
          setResult(null);
        }, 1200);
      }
    }
  }

  return (
    <div className="popup-form popup-form--buy" ref={popupRef}>
      <section className="popup">
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">Купить тренировку</h2>
            <button
              className="btn-icon btn-icon--outlined btn-icon--big"
              type="button"
              aria-label="close"
              onClick={onClose}
            >
              <svg width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
          <div className="popup__content popup__content--purchases">
            <div className="popup__product">
              <div className="popup__product-image">
                <picture>
                  <source type="image/jpg" srcSet={`${training.background} ${training.background} 2x`} />
                  <img className="popup__product-image__img" src={training.background} srcSet={`${training.background} ${training.background} 2x`} width="98" height="80" alt="" />
                </picture>
              </div>
              <div className="popup__product-info">
                <h3 className="popup__product-title">{training.title}</h3>
                <p className="popup__product-price">{training.price} ₽</p>
              </div>
              <div className="popup__product-quantity">
                <p className="popup__quantity">Количество</p>
                <div className="input-quantity">
                  <button onClick={handleButtonClick} name="minus" className="btn-icon btn-icon--quantity" type="button" aria-label="minus">
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-minus"></use>
                    </svg>
                  </button>
                  <div className="input-quantity__input">
                    <label>
                      <input onChange={handleInputChange} onKeyDown={handleKeyDown} name="quantity" type="text" value={order.quantity} min={1} step={1} size={2} />
                    </label>
                  </div>
                  <button onClick={handleButtonClick} name="plus" className="btn-icon btn-icon--quantity" type="button" aria-label="plus">
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-plus"></use>
                    </svg>
                  </button>
                </div>
                <p className="input_error">{inputError}</p>
              </div>
            </div>
            <section className="payment-method">
              <h4 className="payment-method__title">Выберите способ оплаты</h4>
              <ul className="payment-method__list">
                {Object.values(PaymentType).map((value, index) => (
                  <li key={`payment_type_${index}`} className="payment-method__item">
                    <div className="btn-radio-image">
                      <label>
                        <input
                          onChange={handleInputChange}
                          type="radio"
                          name={value}
                          aria-label={value}
                          value={value}
                          checked={order.paymentType === value}
                        />
                        <span className="btn-radio-image__image">
                          <svg width="58" height="20" aria-hidden="true">
                            <use xlinkHref={`#${value}-logo`}></use>
                          </svg></span>
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <div className="popup__total">
              <p className="popup__total-text">Итого</p>
              <svg className="popup__total-dash" width="310" height="2" aria-hidden="true">
                <use xlinkHref="#dash-line"></use>
              </svg>
              <p className="popup__total-price">{order.quantity * training.price}&nbsp;₽</p>
            </div>
            <div className="popup__button">
              <button onClick={handleSubmit} className="btn" type="button" disabled={!!inputError}>Купить</button>
              <p className="popup__message">{result}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
