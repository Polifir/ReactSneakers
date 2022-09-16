import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Drawer from "./components/Drawer";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { Orders } from "./pages/Orders";

import AppContext from "./context";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [serchValue, setSerchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

      setIsLoading(false);
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
    setCartItems((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    );
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favOvj) => Number(favOvj.id) === Number(obj.id))) {
        axios.delete(
          `https://631ffc669f82827dcf2271b0.mockapi.io/favorite/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) === Number(obj.id))
        );
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

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}
    >
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
                isLoading={isLoading}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
