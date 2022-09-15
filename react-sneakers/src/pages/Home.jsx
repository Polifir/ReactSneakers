import Card from "../components/Card";

function Home({ items,
    serchValue,
    setSerchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    cartItems}){
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
          {items
            .filter((item) =>
              item.name.toLowerCase().includes(serchValue.toLowerCase())
            )
            .map((item, index) => (
              <Card
                key={index}
                onPlus={(obj) => onAddToCart(obj)}
                onFavorite={(obj) => onAddToFavorite(obj)}
                added={cartItems.some((obj)=>(Number(obj.id) === Number(item.id)))}
                {...item}/>
            ))}
        </div>
      </div>
    )
}

export default Home;