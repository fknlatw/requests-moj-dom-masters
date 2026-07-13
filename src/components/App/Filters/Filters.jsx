import s from "./filters.module.css";
import { useContext } from "react";
import { FiltersContext } from "../../../context/FiltersContext.jsx";
import { Button } from "../../UI/Button/Button.jsx";



export const Filters = () => {
  const {
    filtersData,
    setSelectedFilters,
    selectedFilters,
    handleSubmit,
    cancelFilters
  } = useContext(FiltersContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters({
      ...selectedFilters,
      [name]: value,
    });
  };

  return (
    <section className={s.filtersSection}>
      <h2 className={`title`}>Фильтры</h2>

      <form className={`${s.filtersTable} glass`} action="">

        <label htmlFor="creationDate">Дата создания</label>

        <select onChange={handleChange} name="creationDate">
          <option value="">Выберите дату создания</option>
          {filtersData.creationDate.map((filter, id) => {
            return (
              <option key={id} value={filter}>
                {filter}
              </option>
            );
          })}
        </select>

        <label htmlFor="completionDate">Дата завершения</label>

        <select onChange={handleChange} name="completionDate">
          <option value="">Выберите дату завершения</option>
          {filtersData.completionDate.map((filter, id) => {
            return (
              <option key={id} value={filter}>
                {filter}
              </option>
            );
          })}
        </select>

        <label htmlFor="performer">Исполнитель</label>

        <select onChange={handleChange} name="performer">
          <option value="">Выберите исполнителя</option>
          {filtersData.performer.map((filter, id) => {
            return (
              <option key={id} value={filter}>
                {filter}
              </option>
            );
          })}
        </select>

        <Button
          onClick={handleSubmit}
          className={s.confirmFiltersButton}
          type="submit"
        >
          Применить
        </Button>
        <Button
          onClick={cancelFilters}
          className={s.confirmFiltersButton}
          type="submit"
        >
          Сбросить
        </Button>
      </form>
      
    </section>
  );
};
