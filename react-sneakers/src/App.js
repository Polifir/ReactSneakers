import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [serchValue, setSerchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    fetch("https://631ffc669f82827dcf2271b0.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((json) => setItems(json));
  }, []);

  const onAddToCart = (obj) => {
    setCartItems((prev) => [...prev, obj]);
  };

  const onChangeSearchInput = (event) => {
    setSerchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1 className="">
            {serchValue ? `Поиск по запросу: "${serchValue}"` : "Все кроссовки"}
          </h1>
          <div className="search-block d-flex">
            <img src="/img/searchicon.svg" alt="serch icon" />
            {serchValue && (
              <img
                onClick={() => setSerchValue("")}
                className="clear removeBtn cu-p"
                src="/img/btn-remove.svg"
                alt="Remove"
              />
            )}
            <input
              onChange={onChangeSearchInput}
              value={serchValue}
              placeholder="Поиск..."
            />
          </div>
        </div>
        <div className="d-flex flex-wrap mb-30 justify-between">
          {items
            .filter((item) =>
              item.name.toLowerCase().includes(serchValue.toLowerCase())
            )
            .map((item, index) => (
              <Card
                key={index}
                name={item.name}
                url={item.url}
                price={item.price}
                onPlus={(obj) => onAddToCart(obj)}
                onFavorite={() => console.log("Нажали избранное")}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
