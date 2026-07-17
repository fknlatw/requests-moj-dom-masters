import { useState, useMemo } from "react";
import { Input } from "../../UI/Input/Input.jsx";
import { Button } from "../../UI/Button/Button.jsx";
import s from "./areacalculator.module.css";
import { AreaItem } from "../AreaItem/AreaItem.jsx";

export const AreaCalculator = () => {
  const [data, setData] = useState({ width: "1", length: "1", quantity: "1" });
  const [tiles, setTiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleAdd = () => {
    const { width, length, quantity } = data;
    const w = Number(width);
    const l = Number(length);
    const qty = Number(quantity);

    if(w<=0|l<=0|qty<=0){
      return;
    }
    const tileArea = (w * l) / 10_000;
    const totalTireArea = tileArea * qty;

    setTiles([
      ...tiles,
      {
        id: crypto.randomUUID(),
        width: w,
        length: l,
        quantity: qty,
        totalArea: Number(totalTireArea.toFixed(2)),
      },
    ]);
    setData({ width: "1", length: "1", quantity: "1" });
  };

  const total = useMemo(() => {
    return tiles.reduce((sum, tile) => sum + tile.totalArea, 0);
  }, [tiles]);

  const handleReset = () => {
    setTiles([]);
  };

  const handleDelete = (id) => {
    setTiles(tiles.filter(tile=>tile.id!== id ));
  }

  return (
    <>
      <h2 className={`title`}>Подсчет квадратуры плитки</h2>
      <div className={`glass ${s.calculatorContainer}`}>
        <p>Размер плитки:</p>
        <label htmlFor="width">Ширина(см)</label>
        <Input
          onChange={handleChange}
          name="width"
          value={data.width}
          min="1"
          type="number"
        />
        <label htmlFor="length">Длина(см)</label>
        <Input
          onChange={handleChange}
          name="length"
          value={data.length}
          min="1"
          type="number"
        />
        <label htmlFor="quantity">Количество(шт)</label>
        <Input
          onChange={handleChange}
          name="quantity"
          value={data.quantity}
          min="1"
          type="number"
        />

        <Button onClick={handleAdd} type="button">
          Добавить
        </Button>
        <Button onClick={handleReset} type="button">
          Сбросить
        </Button>

        <ul className={s.tilesList}>
          {tiles.map((tile) => {
            return <AreaItem handleDelete={handleDelete} key={tile.id} tile={tile} />;
          })}
        </ul>

        <p>Общая квадратура:</p>
        <span className={s.totalNumber}>{total} м²</span>
      </div>
    </>
  );
};
