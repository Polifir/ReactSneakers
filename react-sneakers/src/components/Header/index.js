import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

function Header({ onClickCart }) {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="headerLeft d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="logo" />
          <div>
            <h3 className="text-uppercase">REACT SNEAKERS</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <div>
        <ul className="d-flex">
          <li onClick={onClickCart} className="mr-30 cu-p">
            <img width={18} height={18} src="/img/cart.svg" alt="cart" />
            <span>{totalPrice} руб.</span>
          </li>
          {/* <li>
            <Link to="/favorites">
              <img
                className="cu-p"
                width={18}
                height={18}
                src="/img/heart.svg"
                alt="fav"
              />
            </Link>
          </li> */}
          <li>
            <Link to="/orders">
              <img width={18} height={18} src="/img/user.svg" alt="user" />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
