import React from "react";
import styles from "./Card.module.scss";
function Card({ name, price, url }) {
  const onClickBtn = () => {
    alert(name);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src="/img/heart-unliked.svg" alt="Unliked" />
      </div>
      <img width={133} height={112} src={url} alt="Sneakers" />
      <p>{name}</p>
      <div>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price} руб.</b>
          </div>
          <button onClick={onClickBtn} className="button">
            <img width={11} height={11} src="/img/plus.svg" alt="plus" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
