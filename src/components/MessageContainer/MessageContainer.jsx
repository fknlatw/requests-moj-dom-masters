import s from "./messagecontainer.module.css";
import { useContext } from "react";
import { MessageContext } from "../../context/MessageContext.jsx";

export const MessageContainer = () => {
  const { message } = useContext(MessageContext);
  return (
    <section className={`${s.messageContainer} glass`}>
      <p className={message.type}>{message.text}</p>
    </section>
  )
}
