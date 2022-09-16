import React from 'react';
import axios from 'axios';

import Card from '../components/Card';
import AppContext from '../context';

export function Orders() {
  // const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("https://631ffc669f82827dcf2271b0.mockapi.io/orders");
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе заказов');
        console.error(error);
      }
    })();
  }, []);
    return(
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1 className="">
            Мои заказы 
          </h1>
        </div>
        <div className="d-flex flex-wrap mb-30 justify-between">
        {
            orders.map((item, index) => (
                <Card
                  key={index}
                  loading= {isLoading}
                  {...item}/>
              ))
        }
            
        </div>
      </div>
    )
}