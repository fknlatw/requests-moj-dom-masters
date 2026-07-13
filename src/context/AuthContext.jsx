import { useState, useCallback, createContext, useContext } from "react";
import { MessageContext } from "./MessageContext.jsx";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user_data")) || null;
  });
  const [loading, setLoading] = useState(false);

  const { setMessage } = useContext(MessageContext);

  const saveUser = (data) => {
    const userData = {
      ...user,
      ...data,
      expiresAt: Date.now() + Number(data.expiresIn) * 1000,
    };
    localStorage.setItem("user_data", JSON.stringify(userData));
    setUser(userData);
  };

  const login = useCallback(async (email, password) => {
    if (email === "" || password === "") {
      setMessage({
        type: "error",
        text: "Заполните все данные",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://mojdomrequests.linkpc.net/auth/login.php", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      saveUser(data);
      return data;
    } catch (error) {
      
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (email, password) => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch("http://localhost:8000/auth/login.php", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.json();
      console.log(data);
      if (!response.ok) throw new Error(data.error || "Ошибка входа");
      saveUser(data);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user_data");
    setUser(null);
  };

  const getToken = useCallback(async () => {
    if (!user) return null;

    if (user.expiresAt - Date.now() > 60_000) {
      return user.idToken;
    }

    try {
      const res = await fetch(`https://mojdomrequests.linkpc.net/auth/refresh.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: user.refreshToken }),
      });
      const data = await res.json();

      saveUser(data);
      return data.idToken;
    } catch (error) {
      return null;
    }
  }, [user, logout]);

  const value = {
    login,
    user,
    register,
    loading,
    logout,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
