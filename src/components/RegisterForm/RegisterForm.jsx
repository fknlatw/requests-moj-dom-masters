import { useState } from "react";
import s from "./registerform.module.css";
export const RegisterForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/auth/register.php",{
        method: "POST",
        body: JSON.stringify({email: user.email, password: user.password})
      });
      const data =  await response.json();
      console.log(data);
    } catch (error) {
      
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  return (
    <div className={s.registerFormContainer}>
      <form className={`glass ${s.registerForm}`} onSubmit={handleSubmit}>
        <label htmlFor="email">Почта</label>
        <input name="email" onChange={handleChange} type="text" />

        <label htmlFor="password">Пароль</label>
        <input name="password" onChange={handleChange} type="text" />

        <button type="submit">Регистрация</button>
      </form>
    </div>
  )
}
