import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import s from "../styles/requestpage.module.css";
import { IoMdHome } from "react-icons/io";
import { Button } from "../components/UI/Button/Button.jsx";
import { ImageDownloader } from "../components/App/ImageDownloader/ImageDownloader.jsx";
import { MessageContext } from "../context/MessageContext.jsx";
import { MessageContainer } from "../components/MessageContainer/MessageContainer.jsx";
import { ImSpinner9 } from "react-icons/im";

export const RequestPage = () => {
  const { id } = useParams();
  const { message } = useContext(MessageContext);
  const [currentRequest, setCurrentRequest] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const response = await fetch(
          `https://mojdomrequests.linkpc.net/getRequest.php?id=${id}`
        );
        const data = await response.json();
        setCurrentRequest(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestData();
  }, []);

  const handleHomeClick = () => {
    navigate("/");
  };

  return currentRequest ? (<>
    <section className={`${s.requestInfoSection} glass`}>
      <figure className={s.photoInfo}>
        <figcaption>
          <strong>Фото:</strong>
        </figcaption>
        <img
          className={s.requestPhoto}
          src={currentRequest.photo.link}
          alt={`Фото к заявке ${currentRequest.id}`}
        />
        <ImageDownloader 
          className={s.downloadButton}
          imageUrl={currentRequest.photo.link} 
          fileName={`${currentRequest.id}.jpg`} 
        />
      </figure>
      <dl className={s.requestInfo}>
        <dt>
          <strong>ФИО заявителя: </strong>
        </dt>
        <dd>{currentRequest.applicantFullName}</dd>

        <dt>
          <strong>Адрес заявителя: </strong>
        </dt>
        <dd>{currentRequest.applicantAddress}</dd>
        <dt>
          <strong>Телефон заявителя: </strong>
        </dt>
        <dd>{currentRequest.applicantPhone}</dd>

        <dt>
          <strong>Текст обращения: </strong>
        </dt>
        <dd>{currentRequest.appealText}</dd>

        <dt>
          <strong>Выполненые работы: </strong>
        </dt>
        <dd>{currentRequest.completedWorks}</dd>

        <dt>
          <strong>Использованный материал: </strong>
        </dt>
        <dd>{currentRequest.usedMaterial}</dd>

        <dt>
          <strong>Дата создания: </strong>
        </dt>
        <dd>{currentRequest.creationDate}</dd>

        <dt>
          <strong>Дата завершения: </strong>
        </dt>
        <dd>{currentRequest.completionDate}</dd>

        <dt>
          <strong>Исполнитель: </strong>
        </dt>
        <dd>{currentRequest.performer}</dd>
      </dl>
      <Button onClick={handleHomeClick} className={s.homeButton}>
        <IoMdHome />
      </Button>
      
    </section>
    {message.text && <MessageContainer />}
    </>
  ) : (
    <div className={s.spinnerWrapper}><ImSpinner9/></div>
  );
};
