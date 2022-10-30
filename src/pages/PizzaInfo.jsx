import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { apiURL } from "./Home";

export default function PizzaInfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pizza, setPizza] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(apiURL + "/" + id);
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы!");
        navigate("/");
      }
    };
    fetchData();
  }, [id, navigate]);

  if (!pizza) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" className="pizza-info__image" />
      <h2>{pizza.title}</h2>
      <span>{pizza.price} ₽</span>
    </div>
  );
}
