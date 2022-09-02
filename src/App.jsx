// Styles
import "./scss/app.scss";

// Components
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            {[...new Array(9)].map(() => (
              <PizzaBlock price={495} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
