import Card from "./components/Card/Card.js";
import Header from "./components/Header/Header.js";
import Drawer from "./components/Drawer/Drawer.js";

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1 className="">Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/searchicon.svg" alt="serch icon" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex justify-between">
          <Card />
        </div>
      </div>
    </div>
  );
}

export default App;
