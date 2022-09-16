import React, { useContext, useState } from "react";
import axios from "axios";

import AppContext from "../../context";
import { Info } from "../Info";
import { useCart } from "../../hooks/useCart";

const delay = (time) => new Promise((res) => setTimeout(res, time));

function Drawer({ onClose, onRemove, items = [] }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const onClickOrder = async () => {
    setIsLoading(true);
    const { data } = await axios.post(
      "https://631ffc669f82827dcf2271b0.mockapi.io/orders",
      { items: cartItems }
    );
    setOrderId(data.id);
    setIsOrderComplete(true);
    setCartItems([]);

    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      await axios.delete(
        "https://631ffc669f82827dcf2271b0.mockapi.io/cart/" + item.id
      );
      await delay(1000);
    }

    setIsLoading(false);
  };
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="Remove"
          />
        </h2>

        {items.length > 0 ? (
          <>
            <div className="items">
              {items.map((obj, index) => (
                <div key={obj.id} className="cartItem d-flex mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.url})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.name}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого: </span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>{Math.round(totalPrice * 0.05)} руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            image={
              isOrderComplete ? "/img/complete-order.png" : "/img/emp-cart.jpg"
            }
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
