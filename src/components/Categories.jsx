function Categories() {
  const categories = [
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        <li className="active">Все</li>
        {categories.map((category) => (
          <li>{category}</li>
        ))}
      </ul>
    </div>
  );
}
export default Categories;
