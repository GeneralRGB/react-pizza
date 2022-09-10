import React from "react";

// Modules
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

export default function Home() {
  // Hooks
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetch("https://6307af893a2114bac76922d9.mockapi.io/photos/react-pizza")
      .then((response) => response.json())
      .then((responseData) => {
        setTimeout(() => {
          setPizzas(responseData);
          setIsLoading(false);
        }, 500);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </>
  );
}
