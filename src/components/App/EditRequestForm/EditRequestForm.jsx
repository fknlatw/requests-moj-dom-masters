import s from "./editrequestform.module.css"
import { useContext } from "react";
import { FirebaseContext } from "../../../context/FirebaseContext.jsx";
import { FaXmark } from "react-icons/fa6";
import { Button } from "../../UI/Button/Button.jsx";
import { Input } from "../../UI/Input/Input.jsx";

export const EditRequestForm = () => {
  const {
    handleChange, editingRequest, handleFileChange,
    handleEdit, photoPreview, cancelEditing, loadingStates
  } = useContext(FirebaseContext);
  return (
    <form className={`${s.editRequestForm} glass`}>
      <Button className={s.cancelButton} onClick={cancelEditing} type="button" ><FaXmark /></Button>
      <label htmlFor="applicantFullName">ФИО заявителя</label>
      <Input
        name="applicantFullName"
        onChange={handleChange}
        value={editingRequest.applicantFullName}
        type="text"
      />

      <label htmlFor="applicantAddress">Адрес заявителя</label>
      <Input
        name="applicantAddress"
        onChange={handleChange}
        value={editingRequest.applicantAddress}
        type="text"
      />

      <label htmlFor="applicantPhone">Телефон заявителя</label>
      <Input
        name="applicantPhone"
        onChange={handleChange}
        value={editingRequest.applicantPhone}
        type="text"
      />

      <label htmlFor="appealText">Текст обращения</label>
      <Input
        name="appealText"
        onChange={handleChange}
        value={editingRequest.appealText}
        type="text"
      />

      <label htmlFor="completedWorks">Выполненые работы</label>
      <textarea
        name="completedWorks"
        onChange={handleChange}
        value={editingRequest.completedWorks}
      ></textarea>

      <label htmlFor="usedMaterial">Использованный материал</label>
      <textarea
        name="usedMaterial"
        onChange={handleChange}
        value={editingRequest.usedMaterial}
      ></textarea>

      <p>Текущее фото</p>
      <img className={s.currentPhoto} src={`${editingRequest.photo.link}`} alt="Текущее фото" />

      <label htmlFor="photo">Новое фото</label>
      <Input name="photo" onChange={handleFileChange} type="file" />

      {photoPreview && (
        <>
          <p>Предпросмотр фото</p>
          <img src={photoPreview} alt="Предпросмотр фото" />
        </>
      )}

      <label htmlFor="creationDate">Дата создания</label>
      <Input
        type="date"
        name="creationDate"
        onChange={handleChange}
        value={editingRequest.creationDate}
      />

      <label htmlFor="completionDate">Дата завершения</label>
      <Input
        type="date"
        name="completionDate"
        onChange={handleChange}
        value={editingRequest.completionDate}
      />

      <label htmlFor="performer">Исполнитель</label>
      <Input
        type="text"
        name="performer"
        onChange={handleChange}
        value={editingRequest.performer}
      />

      <Button
        loading={loadingStates.editRequest}
        type="submit"
        className={s.editRequestButton}
        onClick={handleEdit}
      >
        Изменить
      </Button>
    </form>
  );
};
