import s from "./header.module.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { FiLogIn, FiLogOut  } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Button } from "../UI/Button/Button.jsx";


export const Header = () => {
  const {logout, user} = useContext(AuthContext);
  return (
    <header className={`${s.header}`}>
      {user? <Button onClick={logout}><FiLogOut/></Button> :<Link to="/login" ><Button><FiLogIn/></Button></Link>}
      
    </header>
  )
}
