import { MainTitle } from "../components/UI/MainTitle/MainTitle.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { FirebaseContext } from "../context/FirebaseContext.jsx";
import { MessageContext } from "../context/MessageContext.jsx";
import { RequestItem } from "../components/App/RequestItem/RequestItem.jsx";
import { AddRequestForm } from "../components/App/AddRequestForm/AddRequestForm.jsx";
import { MessageContainer } from "../components/MessageContainer/MessageContainer.jsx";
import { EditRequestForm } from "../components/App/EditRequestForm/EditRequestForm.jsx";
import { ImSpinner9 } from "react-icons/im";
import s from "../styles/mainpage.module.css";
import { Filters } from "../components/App/Filters/Filters.jsx";
import { FiltersContext } from "../context/FiltersContext.jsx";

export const MainPage = () => {
  const { user } = useContext(AuthContext);
  const { isEditing, requests, loadingStates } = useContext(FirebaseContext);
  const { isFiltered, filteredRequests } = useContext(FiltersContext);
  const { message } = useContext(MessageContext);
  return (
    <>
      <MainTitle>
        Система управления заявками
      </MainTitle>

      {user && !isEditing && (
        <section
          
        >
          <h2 className={`title`}>Добавление заявки</h2>

          <AddRequestForm />
        </section>
      )}

      {isEditing && (
        <section>
          <h2 className={`title`}>Изменение заявки</h2>

          <EditRequestForm />
        </section>
      )}

      {message.text && <MessageContainer />}

      <Filters />

      <section>
        <h2 className={`title`}>Список заявок</h2>

        {!loadingStates.getRequests && requests ? (
          <ul className={s.requestsList}>
            {isFiltered
              ? filteredRequests.map((request) => (
                  <RequestItem key={request.id} request={request} />
                ))
              : requests.map((request) => (
                  <RequestItem key={request.id} request={request} />
                ))}
          </ul>
        ) : (
          <div className={s.spinnerWrapper}>
            <ImSpinner9 />
          </div>
        )}
      </section>
    </>
  );
};
