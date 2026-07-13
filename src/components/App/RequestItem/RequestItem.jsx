import s from "./requestitem.module.css";
import { Link } from "react-router-dom";
import { Button } from "../../UI/Button/Button.jsx";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaFolderOpen } from "react-icons/fa";
import { useContext } from "react";
import { FirebaseContext } from "../../../context/FirebaseContext.jsx";
import { AuthContext } from "../../../context/AuthContext.jsx";

export const RequestItem = ({ request }) => {
  const { 
    isEditing,
    handleDelete,
    toggleEditing,
    loadingStates
  } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  return (
    <li className={`${s.requestItem} glass`} >
      {request.photo && (
        <figure>
          <figcaption>
            <strong>Фото:</strong>
          </figcaption>
          <img
            className={`${s.requestItemPhoto}`}
            src={request.photo.link}
            alt={`Фото к заявке ${request.id}`}
          />
        </figure>
      )}
      <dl className={s.requestItemDescription}>
        <dt>
          <strong>ФИО заявителя: </strong>
        </dt>
        <dd>{request.applicantFullName}</dd>

        <dt>
          <strong>Адрес заявителя: </strong>
        </dt>
        <dd>{request.applicantAddress}</dd>
        <dt>
          <strong>Телефон заявителя: </strong>
        </dt>
        <dd>{request.applicantPhone}</dd>

        <dt>
          <strong>Текст обращения: </strong>
        </dt>
        <dd>{request.appealText}</dd>

        <dt>
          <strong>Выполненые работы: </strong>
        </dt>
        <dd>{request.completedWorks}</dd>
      </dl>

      <div className={s.requestItemActions}>
        <Link to={`request/${request.id}`}>
          <Button editing={isEditing}>
            <FaFolderOpen />
          </Button>
        </Link>
        {
          user &&
          <><Button
            editing={isEditing}
            type="button"
            loading={loadingStates.deleteRequest}
            onClick={() => handleDelete(request.id, request.photo.id)}
            className={s.deleteButton}
          >
            <MdDelete />
          </Button>
          <Button
            editing={isEditing}
            type="button"
            onClick={() => toggleEditing(request.id)}
            className={s.editButton}
          >
            <MdEdit />
          </Button></>
        }
      </div>
    </li>
  );
};
