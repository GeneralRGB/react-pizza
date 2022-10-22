import React from "react";
import { Link } from "react-router-dom";

import emptyCartImg from "../assets/img/empty-cart.png";

export default function CartEmpty() {
  return (
    <div className="cart cart--empty">
      <h2>
        Корзина пуста <span>😕</span>
      </h2>
      <p>
        Вероятней всего, вы ещё не добавили пиццу в корзину.
        <br />
        Для того, чтобы заказать пиццу, перейдите на главную страницу.
      </p>
      <img src={emptyCartImg} alt="Empty cart" />
      <Link className="button button--black" to="/">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
}
