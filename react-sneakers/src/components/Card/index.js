import React, { useState } from "react";
import styles from "./Card.module.scss";
function Card({
  id,
  name,
  price,
  url,
  onFavorite,
  onPlus,
  favorited = false,
  added = false,
}) {
  const [isAdded, setIsAdded] = useState(added);
  const [isFavorite, setIsFavorite] = useState(favorited);
  const obj = { id, parentId: id, name, url, price };
  const onClickPlus = () => {
    onPlus(obj);
    setIsAdded(!isAdded);
  };

  const onClickFav = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          onClick={onClickFav}
          src={isFavorite ? "/img/favorite.svg" : "/img/unfavorite.svg"}
          alt="Unliked"
        />
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
