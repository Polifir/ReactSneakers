import React from "react";
import Card from "../components/Card";

function Home({ items,
    serchValue,
    setSerchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    isLoading}){
      const renderItems = ()=> {
        const filtredItems = items.filter((item) =>
        item.name.toLowerCase().includes(serchValue.toLowerCase())
      );
        return( isLoading? [...Array(12)]  : filtredItems)
         
          .map((item, index) => (
            <Card
              key={index}
              onPlus={(obj) => onAddToCart(obj)}
              // onFavorite={(obj) => onAddToFavorite(obj)}
              loading= {isLoading}
              {...item}/>
          ))
      }
    return(
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
          {renderItems()}
        </div>
      </div>
    )
}

export default Home;