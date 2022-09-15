import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Drawer from "./components/Drawer";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

// import { Route } from "react-router-dom";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [serchValue, setSerchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get(
        "https://631ffc669f82827dcf2271b0.mockapi.io/cart"
      );
      const FavoritesResponse = await axios.get(
        "https://631ffc669f82827dcf2271b0.mockapi.io/favorite"
      );
      const itemsResponse = await axios.get(
        "https://631ffc669f82827dcf2271b0.mockapi.io/items"
      );
      setCartItems(cartResponse.data);
      setFavorites(FavoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://631ffc669f82827dcf2271b0.mockapi.io/cart/${obj}`);
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        axios.post("https://631ffc669f82827dcf2271b0.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch {}
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://631ffc669f82827dcf2271b0.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favOvj) => favOvj.id === obj.id)) {
        axios.delete(
          `https://631ffc669f82827dcf2271b0.mockapi.io/favorite/${obj.id}`
        );
        // setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://631ffc669f82827dcf2271b0.mockapi.io/favorite",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  };

  const onChangeSearchInput = (event) => {
    setSerchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              cartItems={cartItems}
              serchValue={serchValue}
              setSerchValue={setSerchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
