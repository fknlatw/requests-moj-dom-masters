import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import s from "./loginform.module.css";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Button } from "../UI/Button/Button.jsx";
import { MainTitle } from "../UI/MainTitle/MainTitle.jsx";
import { MessageContainer } from "../MessageContainer/MessageContainer.jsx";
import { MessageContext } from "../../context/MessageContext.jsx";
import { Input } from "../UI/Input/Input.jsx";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login, loading } = useContext(AuthContext);
  const { message, setMessage } = useContext(MessageContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login(userData.email, userData.password);
    

    if (data.type && data.type === "error") {
      setMessage({
        text: "Неверные данные",
        type: "error"
      });
      return;
    }
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className={s.loginFormContainer}>
      <MainTitle className={s.title}>Вход в систему</MainTitle>
      <form className={`glass ${s.loginForm}`} onSubmit={handleSubmit}>
        <label htmlFor="email">Почта</label>
        <Input onChange={handleChange} name="email" type="email" />

        <label htmlFor="password">Пароль</label>
        <Input onChange={handleChange} name="password" type="password" />

        <Button loading={loading} type="submit">
          Войти
        </Button>
      </form>
      {message.text && <MessageContainer />}
    </div>
  );
};
