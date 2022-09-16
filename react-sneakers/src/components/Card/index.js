import React, { useState, useContext } from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";
function Card({
  id,
  parentId,
  name,
  price,
  url,
  onFavorite,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { isItemAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);
  const obj = { id, parentId: id, name, url, price };
  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFav = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={187}
          viewBox="0 0 150 187"
          backgroundColor="#f3f3f3"
          foregroundColor="#dedede"
        >
          <rect x="25" y="463" rx="3" ry="3" width="380" height="6" />
          <rect x="30" y="24" rx="0" ry="0" width="0" height="61" />
          <rect x="108" y="106" rx="0" ry="0" width="7" height="0" />
          <rect x="0" y="0" rx="15" ry="15" width="150" height="90" />
          <rect x="0" y="97" rx="5" ry="5" width="150" height="21" />
          <rect x="3" y="129" rx="5" ry="5" width="101" height="21" />
          <rect x="3" y="157" rx="9" ry="9" width="94" height="30" />
          <rect x="109" y="150" rx="5" ry="5" width="35" height="35" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite}>
              <img
                onClick={onClickFav}
                src={isFavorite ? "/img/favorite.svg" : "/img/unfavorite.svg"}
                alt="Unliked"
              />
            </div>
          )}

          <img width={133} height={112} src={url} alt="Sneakers" />
          <p>{name}</p>
          <div>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{price} руб.</b>
              </div>
              {onPlus && (
                <img
                  className={styles.plus}
                  onClick={onClickPlus}
                  src={
                    isItemAdded(id)
                      ? "/img/btn-cheked.svg"
                      : "/img/btn-plus.svg"
                  }
                  alt="plus"
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
