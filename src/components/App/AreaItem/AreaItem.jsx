import s from "./areaitem.module.css";
import { Button } from "../../UI/Button/Button.jsx";
import { FaXmark } from "react-icons/fa6";
export const AreaItem = ({ tile, handleDelete }) => {
  return (
    <li className={s.areaItem}>
      <span>
        {tile.width} * {tile.length} - {tile.quantity}шт, {tile.totalArea}м²
      </span>

      <Button onClick={() => handleDelete(tile.id)} className={s.deleteButton}>
        <FaXmark />
      </Button>
    </li>
  );
};
