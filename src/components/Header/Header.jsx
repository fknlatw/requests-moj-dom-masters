import s from "./header.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Button } from "../UI/Button/Button.jsx";
import { FaCalculator, FaFilter, FaPlusCircle } from "react-icons/fa";

export const Header = ({ setIsOpen, isOpen }) => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { logout, user } = useContext(AuthContext);
  return (
    <header className={`${scroll && "glass"} ${s.header}`}>
      <div className={s.headerContainer}>
        {user ? (
          <Button onClick={logout}>
            <FiLogOut />
          </Button>
        ) : (
          <Link to="/login">
            <Button>
              <FiLogIn />
            </Button>
          </Link>
        )}
        <Button
          onClick={() => setIsOpen({ ...isOpen, filters: !isOpen.filters })}
        >
          <FaFilter />
        </Button>

        {user && (
          <>
            <Button
              onClick={() =>
                setIsOpen({ ...isOpen, calculator: !isOpen.calculator })
              }
            >
              <FaCalculator />
            </Button>
            <Button
              onClick={() =>
                setIsOpen({ ...isOpen, addRequest: !isOpen.addRequest })
              }
            >
              <FaPlusCircle />
            </Button>
          </>
        )}
      </div>
    </header>
  );
};
