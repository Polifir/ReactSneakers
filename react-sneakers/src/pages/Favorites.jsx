import Card from "../components/Card";

function Favorites({ items, onAddToFavorite}){
    return(
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1 className="">
            Избранное 
          </h1>
        </div>
        <div className="d-flex flex-wrap mb-30 justify-between">
        {items
            .map((item, index) => (
              <Card
              favorited={true}
                key={index}
                onFavorite={(obj) => onAddToFavorite(obj)}
                {...item}
              />
            ))}
        </div>
      </div>
    )
}

export default Favorites;