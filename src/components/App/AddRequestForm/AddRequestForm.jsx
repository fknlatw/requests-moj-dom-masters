import s from "./addrequestform.module.css";
import { useContext } from "react";
import { FirebaseContext } from "../../../context/FirebaseContext.jsx";
import { Button } from "../../UI/Button/Button.jsx";
import { Input } from "../../UI/Input/Input.jsx"; 

export const AddRequestForm = () => {
  const { 
    request, handleChange,
    fileInputRef, handleFileChange, photoPreview,
    handleSubmit, loadingStates
  } = useContext(FirebaseContext);

  
  return (
    <form className={`${s.addRequestForm} glass`}>
      <label htmlFor="applicantFullName">ФИО заявителя</label>
      <Input
        name="applicantFullName"
        onChange={handleChange}
        value={request.applicantFullName}
        type="text"
      />

      <label htmlFor="applicantAddress">Адрес заявителя</label>
      <Input
        name="applicantAddress"
        onChange={handleChange}
        value={request.applicantAddress}
        type="text"
      />

      <label htmlFor="applicantPhone">Телефон заявителя</label>
      <Input
        name="applicantPhone"
        onChange={handleChange}
        value={request.applicantPhone}
        type="text"
      />

      <label htmlFor="appealText">Текст обращения</label>
      <Input
        name="appealText"
        onChange={handleChange}
        value={request.appealText}
        type="text"
      />

      <label htmlFor="completedWorks">Выполненые работы</label>
      <textarea
        name="completedWorks"
        onChange={handleChange}
        value={request.completedWorks}
      ></textarea>

      <label htmlFor="usedMaterial">Использованный материал</label>
      <textarea
        name="usedMaterial"
        onChange={handleChange}
        value={request.usedMaterial}
      ></textarea>

      <label htmlFor="photo">Фото</label>
      <Input
        ref={fileInputRef}
        name="photo"
        onChange={handleFileChange}
        type="file"
      />

      {photoPreview && (
        <>
          <p>Предпросмотр фото</p>
          <img className={s.photoPreview} src={photoPreview} alt="Предпросмотр фото" />
        </>
      )}

      <label htmlFor="creationDate">Дата создания</label>
      <Input
        type="date"
        name="creationDate"
        onChange={handleChange}
        value={request.creationDate}
      />

      <label htmlFor="completionDate">Дата завершения</label>
      <Input
        type="date"
        name="completionDate"
        onChange={handleChange}
        value={request.completionDate}
      />

      <label htmlFor="prformer">Исполнитель</label>
      <Input
        type="text"
        name="performer"
        onChange={handleChange}
        value={request.performer}
      />

      <Button loading={loadingStates.addRequest} type="submit" onClick={handleSubmit}>
        Добавить
      </Button>
    </form>
  );
};
