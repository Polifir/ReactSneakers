import React, { useState } from "react";
import styles from "./Card.module.scss";
function Card({ name, price, url, onFavorite, onPlus }) {
  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    onPlus({ name, price, url });
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onFavorite}>
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

          <img
            className={styles.plus}
            onClick={onClickPlus}
            src={isAdded ? "/img/btn-cheked.svg" : "/img/btn-plus.svg"}
            alt="plus"
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
